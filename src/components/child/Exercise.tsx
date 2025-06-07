import { useState, useRef, useEffect } from "react";
import {
  IconWritingSign,
  IconCloudUpload,
  IconVolume,
  IconPlayerSkipForwardFilled,
} from "@tabler/icons-react";
import classes from "./Exercise.module.css";
import Label from "../ui/label/Label";
import Button from "../ui/button/Button";
import axiosAPI from "../../axiosAPI";
import useExerciseStore from "../../store/useExerciseStore";
import ClipLoader from "react-spinners/ClipLoader";
import myPen from '../../assets/myPen.gif';
const buttonsStyle = { width: "9rem", height: "3rem", fontSize: "1rem" };

const Submission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [score, setScore] = useState(0);
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
    setIsLoading(true)
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
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!hasFetched.current && requested_text === "") {
      hasFetched.current = true;
      fetchExercise();
    }
  }, []);

  const skipExercise = async () => {
    setIsLoading(true);
    const exerciseId = useExerciseStore.getState().id;
    if (exerciseId === -1) return;
    useExerciseStore.getState().clearExercise();
    try {
      await axiosAPI.delete(`/exercises/${exerciseId}/`);
      fetchExercise();
    } catch (error: any) {
      console.error("Failed to skip exercise", error);
    }
  };


  const submitExercise = async () => {
    const exerciseId = useExerciseStore.getState().id;
    if (exerciseId === -1) return;
    try {
      setIsSubmissionLoading(true);
      const formData = new FormData();
      const fileInput = fileInputRef.current;
      if (fileInput && fileInput.files) {
        const file = fileInput.files[0];
        formData.append("submitted_image", file);
        // in order to send a file - need to use FormData and type multipart/form-data
        const response = await axiosAPI.put(`/exercises/${exerciseId}/submit/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUploadedImage(response.data.submitted_image);
        setSubmittedText(response.data.submitted_text);
        setScore(response.data.score);
        useExerciseStore.getState().clearExercise();
        fetchExercise();
      }
    } catch (error: any) {
      console.error("Failed to submit exercise", error);
    }
    setIsSubmissionLoading(false);
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      submitExercise();
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
        <IconWritingSign stroke={2} size={40} className={classes.writingIcon} />
        {level == "words" || level == "letters" &&
          <Label style={{ fontSize: "2rem", marginTop: "1.5rem" }}>{requested_text}</Label>}
        {level == "category" &&
          <Label>{"Please write a word from category:" + category}</Label>}
        {isLoading && (
          <ClipLoader loading={isLoading} className={classes.clipLoader} />
        )}
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
          role="button"
          aria-label="skip-button"
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
        {isSubmissionLoading ? <img src={myPen} alt="myPen" style={{ width: '100px', height: '110px' }} /> :
          uploadedImage ? (
            <div>
              <Label>
                {"Submitted text: " + submittedText +
                  "(Score: " + Math.ceil(score * 100) + ")"}
              </Label>

              <img
                src={uploadedImage}
                alt="Uploaded preview"
                style={{
                  width: "200px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }} />
            </div>
          ) : (
            <p>Grab a sheet of plain paper and start writing :)</p>
          )}
      </div>
    </section>
  );
};

export default Submission;
