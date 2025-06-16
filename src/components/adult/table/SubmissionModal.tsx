import Modal from "../../ui/modal/Modal";
import Label from "../../ui/label/Label";
import ClipLoader from "react-spinners/ClipLoader";
import classes from "./SubmissionModal.module.css";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  imageUrl: string;
  feedback: string;
  letters: Array<{ letter: string; score: number }>;
  level: "letters" | "words" | "category";
}

const SubmissionModal = ({
  isOpen,
  onClose,
  isLoading,
  imageUrl,
  feedback,
  letters,
  level
}: SubmissionModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal data-testid="submission-modal" onClose={onClose}>
      {isLoading ? (
        <ClipLoader size={25} />
      ) : (
        <div className={classes.modalContent}>
          <img
            data-testid="submission-image"
            className={classes.img}
            src={imageUrl}
            alt="Submission"
          />
          {feedback &&
            <>
              <Label>LetterBuddy's Feedback</Label>  
              <label data-testid="submission-feedback">{feedback}</label>
              {letters.length > 0 && <Label>Score Per Letter</Label>}
              {(level === "category" && letters.length === 0) && (
                <div>
                  LetterBuddy could not connect the written to a word in the requested category.
                </div>
              )}
              {level === "category" && letters.length > 0 && (
                <div>
                  LetterBuddy connected the written to the word "{letters.map(({ letter }) => letter).join("")}" in the requested category.
                </div>
              )}
              <div className={classes.lettersContainer}>
                {letters.map(({ letter, score }, index) => (
                  <div key={index}>
                    {letter}: {score}
                  </div>
                ))}
              </div>
            </>
          }
        </div>
      )}
    </Modal>
  );
};

export default SubmissionModal;
