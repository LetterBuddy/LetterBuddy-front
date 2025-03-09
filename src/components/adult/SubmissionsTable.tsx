import { useState } from "react";
import Label from "../ui/label/Label";
import InputForm from "../ui/inputForm/InputForm";
import classes from "./SubmissionsTable.module.css";
import SubmissionsList from "./SubmissionsList";

type HandwritingSubmission = {
  id: string;
  date: Date;
  word: string;
  score: number;
};

const sampleData: HandwritingSubmission[] = [
  { id: "1", date: new Date("2023-05-01"), word: "Hello", score: 85 },
  { id: "2", date: new Date("2023-05-02"), word: "World", score: 92 },
  { id: "3", date: new Date("2023-05-03"), word: "Learning", score: 78 },
  { id: "4", date: new Date("2023-05-04"), word: "Practice", score: 95 },
  { id: "5", date: new Date("2023-05-05"), word: "Handwriting", score: 55 },
];

const SubmissionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof HandwritingSubmission | null;
    direction: "asc" | "desc";
  }>({ key: "date", direction: "desc" });

  const filteredData = sampleData.filter((submission) =>
    submission.word.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search by word..."
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
