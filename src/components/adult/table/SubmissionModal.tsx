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
}

const SubmissionModal = ({
  isOpen,
  onClose,
  isLoading,
  imageUrl,
  feedback,
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
          {feedback && <Label>Our Feedback</Label>}
          <label data-testid="submission-feedback">{feedback}</label>
        </div>
      )}
    </Modal>
  );
};

export default SubmissionModal;
