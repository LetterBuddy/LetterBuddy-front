import React from "react";
import classes from "./Modal.module.css"; // or wherever your CSS is

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  backdropClickCloses?: boolean;
}

const Modal = ({ children, onClose, backdropClickCloses = true }: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backdropClickCloses && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes.backdrop} onClick={handleBackdropClick}>
      <div className={classes.modal}>
        <button className={classes.closeButton} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
