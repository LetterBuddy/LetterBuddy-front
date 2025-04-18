import { useState, useRef, useEffect } from "react";
import {
  IconWritingSign,
  IconCloudUpload,
  IconVolume,
  IconPlayerSkipForwardFilled,
} from "@tabler/icons-react";
import classes from "./Submission.module.css";
import Label from "../ui/label/Label";
import Button from "../ui/button/Button";
import axiosAPI from "../../axiosAPI";
import useExerciseStore from "../../store/useExerciseStore";
const buttonsStyle = { width: "9rem", height: "3rem", fontSize: "1rem" };

const Submission = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const hasFetched = useRef(false);

  const { requested_text, level, category, setExercise } = useExerciseStore();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // if speechSynthesis is not supported, the volume button will not be rendered
  // TODO there are two options to enum for the level(start with capital letter or not) - discuss
  const readExercise = () => {
    if (!("speechSynthesis" in window)) return;
    let guidingText = "";
    if (level == "letters")
      // TODO maybe state if the letter is uppercase or lowercase
      guidingText =
        "Please write the letter " +
        requested_text[0] +
        requested_text.length +
        " times.";
    else if (level == "words") guidingText = requested_text;
    else if (level == "category")
      guidingText = "Please write a word from the category: " + category;
    const utterance = new SpeechSynthesisUtterance(guidingText);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };
  // will be used again after the exercise is submitted
  // TODO add some loading state here - if not - will need to clear exercise store after logout
  const fetchExercise = async () => {
    try {
      const response = await axiosAPI.post("/exercises/");
      setExercise(
        response.data.id,
        response.data.requested_text,
        response.data.level,
        response.data.category
      );
    } catch (error: any) {
      console.error("Failed to fetch exercise", error);
    }
  };
  useEffect(() => {
    if (!hasFetched.current && requested_text === "") {
      hasFetched.current = true;
      fetchExercise();
    }
  }, []);

  const skipExercise = async () => {
    const exerciseId = useExerciseStore.getState().id;
    try {
      await axiosAPI.delete(`/exercises/${exerciseId}/delete/`);
      fetchExercise();
    } catch (error: any) {
      console.error("Failed to skip exercise", error);
    }
  };

  const handleFileChange = (event: any) => {
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
        <Label style={{ fontSize: "2.2rem" }}>{requested_text}</Label>
        {"speechSynthesis" in window && (
          <IconVolume
            className={classes.volumeIcon}
            size={35}
            onClick={() => readExercise()}
          />
        )}
        <IconPlayerSkipForwardFilled
          className={classes.skipIcon}
          size={30}
          onClick={skipExercise}
        />
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
