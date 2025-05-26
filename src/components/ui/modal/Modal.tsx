import React from "react";
import classes from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  backdropClickCloses?: boolean;
  [key: string]: any;
}

const Modal = ({ children, onClose, backdropClickCloses = true, ...rest }: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backdropClickCloses && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div {...rest} className={classes.backdrop} onClick={handleBackdropClick}>
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
