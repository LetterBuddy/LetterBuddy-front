import { useState, useRef } from "react";
import classes from "./Submission.module.css";
import Label from "../ui/label/Label";
import Button from "../ui/button/Button";
import { IconWritingSign, IconCloudUpload } from "@tabler/icons-react";

const buttonsStyle = { width: "9rem", height: "3rem", fontSize: "1rem" };

const Submission = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const openCamera = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className={classes.submission}>
      <div>
        <IconWritingSign stroke={2} size={40} />
        <Label>Elephant</Label>
      </div>
      <div>
        <IconCloudUpload stroke={2} size={40} />
        <p>Upload handwriting image</p>
        <section>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment" // For mobile camera only
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button style={buttonsStyle} onClick={openCamera}>
          Capture Photo 
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button style={buttonsStyle} onClick={openFilePicker}>
            Upload from Gallery
          </Button>
        </section>
      </div>

      {/* Image Preview */}
      <div>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Uploaded preview"
            style={{
              width: "200px",
              marginTop: "10px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        ) : (
          <p>Loading Score...</p>
        )}
      </div>
    </section>
  );
};

export default Submission;
