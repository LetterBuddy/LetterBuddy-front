import { useState } from "react";
import Label from "../../ui/label/Label";
import Modal from "../../ui/modal/Modal";
import InputForm from "../../ui/inputForm/InputForm";
import classes from "./SubmissionsTable.module.css";
import SubmissionsList from "./SubmissionsList";
import great from "../../../assets/Great.png";
import { useEffect } from "react";
import axiosAPI from "../../../axiosAPI";
import useChildStore from "../../../store/useChildStore";

// TODO: Add useSubmissionsStore to manage submissions
export type HandwritingSubmission = {
  id: string;
  date: Date;
  exercise: string;
  type: "Letters" | "Words" | "Category";
  score: number;
};

// TODO: Remove this sample data and fetch from the server
const sampleData: HandwritingSubmission[] = [
  {
    id: "1",
    date: new Date("2023-05-01"),
    exercise: "Hello",
    type: "Letters",
    score: 85,
  },
  {
    id: "2",
    date: new Date("2023-05-02"),
    exercise: "World",
    type: "Words",
    score: 92,
  },
  {
    id: "3",
    date: new Date("2023-05-03"),
    exercise: "Learning",
    type: "Words",
    score: 78,
  },
  {
    id: "4",
    date: new Date("2023-05-04"),
    exercise: "Practice",
    type: "Letters",
    score: 95,
  },
  {
    id: "5",
    date: new Date("2023-05-05"),
    exercise: "Handwriting",
    type: "Category",
    score: 55,
  },
];

const SubmissionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof HandwritingSubmission | null;
    direction: "asc" | "desc";
  }>({ key: "date", direction: "desc" });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const childId = useChildStore.getState().selectedChildId;
        console.log("childId:", childId);
        const response = await axiosAPI.get(`/exercises/${childId}/submissions`);
        console.log(response.data);
      } catch (error: any) {
        console.error("Failed to fetch submissions", error.response?.data || error.message);
      }
    }
    fetchSubmissions();
  }, []);


  const filteredData = sampleData.filter((submission) =>
    submission.exercise.toLowerCase().includes(searchTerm.toLowerCase())
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

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<
    string | null
  >(null);

  const handleOpenModal = (id: string) => {
    setSelectedSubmissionId(id);
    console.log("submissionId:", id);
  };
  const handleCloseModal = () => {
    setSelectedSubmissionId(null);
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
      {selectedSubmissionId && (
        <Modal onClose={handleCloseModal}>
          {/* TODO: Get the image from the server (cloudinary) */}
          <img src={great} alt="Submission" />
        </Modal>
      )}
    </div>
  );
};

export default SubmissionsTable;
