import Button from "../ui/button/Button";
import InputForm from "../ui/inputForm/InputForm";
import Label from "../ui/label/Label";
import classes from "./AddChildModal.module.css";

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddChildModal = ({ isOpen, onClose }: AddChildModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as Element).classList.contains(classes.backdrop)) {
      onClose();
    }
  };

  return (
    <div className={classes.backdrop} onClick={handleBackdropClick}>
      <div className={classes.modal}>
        <button className={classes.closeButton} onClick={onClose}>
          ✖
        </button>
        <Label >Add a new child user</Label>
        <InputForm type="text" placeholder="First Name" />
        <InputForm type="text" placeholder="Last Name" />
        <InputForm type="text" placeholder="User Name" />
        <InputForm type="text" placeholder="Child's Password" />
        <Button>Add Child</Button>
      </div>
    </div>
  );
};

export default AddChildModal;
