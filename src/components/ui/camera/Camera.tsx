import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Button from '../button/Button';
import Modal from '../modal/Modal';

interface CameraProps {
  onCapture: (imageFile: File) => void;
  onClose: () => void;
}

const buttonsStyle = { width: "9rem", height: "3rem", fontSize: "1rem", margin: "2rem 2rem 0rem 2rem" };

const Camera: React.FC<CameraProps> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convert base64 to blob
      const byteString = atob(imageSrc.split(',')[1]);
      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      onCapture(file);
      onClose();
    }
  }, [onCapture, onClose]);

  return (
    <Modal onClose={onClose}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        onUserMedia={() => setIsCameraReady(true)}
      />
      {isCameraReady && (
        <div>
          <Button style={buttonsStyle} onClick={capture}>Take Photo</Button>
          <Button style={buttonsStyle} onClick={onClose}>Cancel</Button>
        </div>
      )}
    </Modal>
  );
};

export default Camera;
