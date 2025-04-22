import { useState } from "react";
import Label from "../../ui/label/Label";
import Modal from "../../ui/modal/Modal";
import InputForm from "../../ui/inputForm/InputForm";
import classes from "./SubmissionsTable.module.css";
import SubmissionsList from "./SubmissionsList";
import { useEffect } from "react";
import axiosAPI from "../../../axiosAPI";
import useChildStore from "../../../store/useChildStore";

export type HandwritingSubmission = {
  id: string;
  submission_date: Date;
  requested_text: string;
  //category: string; # TODO: Add this field to the server
  level: "letters" | "words" | "category";
  score: number;
};

// TODO: Remove this sample data and fetch from the server
// const sampleData: HandwritingSubmission[] = [
//   {
//     id: "1",
//     submission_date: new Date("2023-05-01"),
//     requested_text: "Hello",
//     level: "letters",
//     score: 85,
//   },
//   {
//     id: "2",
//     submission_date: new Date("2023-05-02"),
//     requested_text: "World",
//     level: "words",
//     score: 92,
//   },
//   {
//     id: "3",
//     submission_date: new Date("2023-05-03"),
//     requested_text: "Learning",
//     level: "words",
//     score: 78,
//   },
//   {
//     id: "4",
//     submission_date: new Date("2023-05-04"),
//     requested_text: "Practice",
//     level: "letters",
//     score: 95,
//   },
//   {
//     id: "5",
//     submission_date: new Date("2023-05-05"),
//     requested_text: "Handwriting",
//     level: "category",
//     score: 55,
//   },
// ];

const SubmissionsTable = () => {
  const [submissions, setSubmissions] = useState<HandwritingSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [submissionImageUrl, setSubmissionImageUrl] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof HandwritingSubmission | null;
    direction: "asc" | "desc";
  }>({ key: "submission_date", direction: "desc" });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const childId = useChildStore.getState().selectedChildId;
        console.log("childId:", childId);
        const response = await axiosAPI.get(`/exercises/${childId}/submissions/`);
        console.log(response.data);
        // convert score to percentage
        response.data.forEach((submission: HandwritingSubmission) => {
          submission.score = Math.ceil(submission.score * 100);
        });
        setSubmissions(response.data);
      } catch (error: any) {
        console.error("Failed to fetch submissions", error.response?.data || error.message);
      }
    }
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
      const response = await axiosAPI.get(`/exercises/${id}/`);
      console.log(response.data);
      setSubmissionImageUrl(response.data.submitted_image);
    } catch (error: any) {
      console.error("Failed to fetch submission", error.response?.data || error.message);
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      />
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {/* TODO: Get the image from the server (cloudinary) */}
          <img src={submissionImageUrl} alt="Submission" />
        </Modal>
      )}
    </div>
  );
};

export default SubmissionsTable;
