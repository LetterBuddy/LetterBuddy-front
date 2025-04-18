import { format } from "date-fns";
import Button from "../../ui/button/Button";
import classes from "./SubmissionsTable.module.css";
import { HandwritingSubmission } from "./SubmissionsTable";

type SubmissionsListProps = {
  sortedData: HandwritingSubmission[];
  handleSort: (key: keyof HandwritingSubmission) => void;
  handleViewDetails: (id: string) => void;
  sortConfig: {
    key: keyof HandwritingSubmission | null;
    direction: "asc" | "desc";
  };
};

const getScoreBadgeClass = (score: number) => {
  if (score >= 80) return classes.scoreBadgeHigh;
  if (score >= 60) return classes.scoreBadgeMedium;
  return classes.scoreBadgeLow;
};

const SortableHeader = ({
  label,
  sortKey,
  handleSort,
  sortConfig,
}: {
  label: string;
  sortKey: keyof HandwritingSubmission;
  handleSort: (key: keyof HandwritingSubmission) => void;
  sortConfig: {
    key: keyof HandwritingSubmission | null;
    direction: "asc" | "desc";
  };
}) => (
  <button onClick={() => handleSort(sortKey)} className={classes.sortButton}>
    {label}
    <span className={classes.sortIcon}>
      {sortConfig.key === sortKey
        ? sortConfig.direction === "asc"
          ? "\u2191"
          : "\u2193"
        : "\u2195"}
    </span>
  </button>
);

const SubmissionsList = ({
  sortedData,
  handleSort,
  handleViewDetails,
  sortConfig,
}: SubmissionsListProps) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Type</th>
          <th>
            <SortableHeader
              label="Date"
              sortKey="date"
              handleSort={handleSort}
              sortConfig={sortConfig}
            />
          </th>
          <th>
            <SortableHeader
              label="Exercise"
              sortKey="exercise"
              handleSort={handleSort}
              sortConfig={sortConfig}
            />
          </th>
          <th>
            <SortableHeader
              label="Score"
              sortKey="score"
              handleSort={handleSort}
              sortConfig={sortConfig}
            />
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.length === 0 ? (
          <tr>
            <td colSpan={10} className={classes.emptyState}>
              No submissions found.
            </td>
          </tr>
        ) : (
          sortedData.map((submission, index) => (
            <tr
              key={submission.id}
              className={index % 2 === 0 ? classes.rowEven : ''}
            >
              <td>{submission.type}</td>
              <td>{format(submission.date, "MMM dd, yyyy")}</td>
              <td>{submission.exercise}</td>
              <td>
                <span
                  className={`${classes.badge} ${getScoreBadgeClass(
                    submission.score
                  )}`}
                >
                  {submission.score}%
                </span>
              </td>
              <td style={{padding: "0"}}>
                <Button
                  style={{
                    width: "4rem",
                    height: "2rem",
                    fontSize: "0.9rem",
                    margin: "0.5rem",
                  }}
                  onClick={() => handleViewDetails(submission.id)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default SubmissionsList;
