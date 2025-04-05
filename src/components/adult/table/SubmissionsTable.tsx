import { useState } from "react";
import Label from "../../ui/label/Label";
import InputForm from "../../ui/inputForm/InputForm";
import classes from "./SubmissionsTable.module.css";
import SubmissionsList from "./SubmissionsList";

export type HandwritingSubmission = {
  id: string;
  date: Date;
  exercise: string;
  type: "Letters" | "Words" | "Category";
  score: number;
};

const sampleData: HandwritingSubmission[] = [
  { id: "1", date: new Date("2023-05-01"), exercise: "Hello", type: "Letters", score: 85 },
  { id: "2", date: new Date("2023-05-02"), exercise: "World", type: "Words", score: 92 },
  { id: "3", date: new Date("2023-05-03"), exercise: "Learning", type: "Words", score: 78 },
  { id: "4", date: new Date("2023-05-04"), exercise: "Practice", type: "Letters", score: 95 },
  { id: "5", date: new Date("2023-05-05"), exercise: "Handwriting", type: "Category", score: 55 },
];

const SubmissionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof HandwritingSubmission | null;
    direction: "asc" | "desc";
  }>({ key: "date", direction: "desc" });

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

  const handleViewDetails = (id: string) => {
    console.log(`Navigate to submission ${id}`);
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
        handleViewDetails={handleViewDetails}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default SubmissionsTable;
