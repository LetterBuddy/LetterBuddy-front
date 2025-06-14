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
}

const SubmissionModal = ({
  isOpen,
  onClose,
  isLoading,
  imageUrl,
  feedback,
  letters,
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
              <Label>Our Feedback</Label>
              <label data-testid="submission-feedback">{feedback}</label>
              <Label>Score Per Letter</Label>
              <div className={classes.lettersContainer}>
                {letters.map(({ letter, score }) => (
                  <div key={letter}>
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
