import { useState, useEffect } from "react";
import Label from "../../ui/label/Label";
import InputForm from "../../ui/inputForm/InputForm";
import classes from "./SubmissionsTable.module.css";
import SubmissionsList from "./SubmissionsList";
import axiosAPI from "../../../axiosAPI";
import useChildStore from "../../../store/useChildStore";
import SubmissionModal from "./SubmissionModal";

export type HandwritingSubmission = {
  id: string;
  submission_date: Date;
  requested_text: string;
  category: string;
  level: "letters" | "words" | "category";
  score: number;
};


const SubmissionsTable = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissions, setSubmissions] = useState<HandwritingSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [submissionImageUrl, setSubmissionImageUrl] = useState("");
  const [submissionFeedback, setSubmissionFeedback] = useState("");
  const [submissionLetters, setSubmissionLetters] = useState<Array<{ letter: string; score: number }>>([]);
  const [level, setLevel] = useState("");

  const childId = useChildStore.getState().selectedChildId;
  const [sortConfig, setSortConfig] = useState<{
    key: keyof HandwritingSubmission | null;
    direction: "asc" | "desc";
  }>({ key: "submission_date", direction: "desc" });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setIsTableLoading(true);
        console.log("childId:", childId);
        const response = await axiosAPI.get(
          `/exercises/${childId}/submissions/`
        );
        console.log(response.data);
        // convert score to percentage
        response.data.forEach((submission: HandwritingSubmission) => {
          submission.score = Math.ceil(submission.score * 100);
          if(submission.level === "category")
            submission.requested_text = submission.category;
        });
        setSubmissions(response.data);
      } catch (error: any) {
        console.error(
          "Failed to fetch submissions",
          error.response?.data || error.message
        );
      } finally {
        setIsTableLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const filteredData = submissions.filter((submission) =>
    submission.requested_text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    return sortConfig.direction === "asc"
      ? aValue < bValue
        ? -1
        : 1
      : aValue > bValue
        ? -1
        : 1;
  });

  const handleSort = (key: keyof HandwritingSubmission) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const fetchSubmission = async (id: string) => {
    try {
      setIsSubmissionLoading(true);
      const response = await axiosAPI.get(`/exercises/${id}/`);
      console.log(response.data);
      setSubmissionImageUrl(response.data.submitted_image);
      setSubmissionFeedback(response.data.feedback);
      setLevel(response.data.level);
      const letterScoresDict: Array<{ letter: string; score: number }> = [];
      const text = response.data.requested_text;
      const scores = response.data.letter_scores;
      for (let i = 0; i < text.length; i++) {
        letterScoresDict.push({ letter: text[i], score: scores[i] * 100 });
      }
      setSubmissionLetters(letterScoresDict);
    } catch (error: any) {
      console.error(
        "Failed to fetch submission",
        error.response?.data || error.message
      );
    } finally {
      setIsSubmissionLoading(false);
    }
  };
  const handleOpenModal = (id: string) => {
    setIsModalOpen(true);
    console.log("submissionId:", id);
    fetchSubmission(id);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmissionImageUrl("");
  };

  return (
    <div>
      <div className={classes.header}>
        <Label>Handwriting Submissions</Label>
        <div className={classes.searchContainer}>
          <InputForm
            type="text"
            placeholder="Search by exercise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <SubmissionsList
        sortedData={sortedData}
        handleSort={handleSort}
        handleViewSubmission={handleOpenModal}
        sortConfig={sortConfig}
        isTableLoading={isTableLoading}
      />
      <SubmissionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isLoading={isSubmissionLoading}
        imageUrl={submissionImageUrl}
        feedback={submissionFeedback}
        letters={submissionLetters}
        level={level as "letters" | "words" | "category"}
      />
    </div>
  );
};

export default SubmissionsTable;
