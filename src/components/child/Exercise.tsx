import { useState, useRef, useEffect } from "react";
import Camera from "../ui/camera/Camera";
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
import { getLetterFeedback, readExercise, fetchExercise, skipExercise, isMobileDevice } from './ExerciseUtils';
const buttonsStyle = { width: "9rem", height: "3rem", fontSize: "1rem" };

const Submission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const hasFetched = useRef(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [score, setScore] = useState(0);
  const [letterFeedback, setLetterFeedback] = useState("");

  const { requested_text, level, category, setExercise } = useExerciseStore();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!hasFetched.current && level === "") {
      hasFetched.current = true;
      fetchExercise(setIsLoading, setExercise);
    }
  }, []);

  const handleReadExercise = () => {
    readExercise(level, requested_text, category);
  };

  const handleSkipExercise = () => {
    skipExercise(setIsLoading);
  };


  const submitExercise = async (file?: File) => {
    const exerciseId = useExerciseStore.getState().id;
    if (exerciseId === -1) return;
    try {
      setIsSubmissionLoading(true);
      const formData = new FormData();
      const fileInput = fileInputRef.current;
      if (!file && fileInput && fileInput.files) {
        file = fileInput.files[0];
      }
      if (!file) {
        console.error("No file selected");
        return;
      }
      formData.append("submitted_image", file);
      // in order to send a file - need to use FormData and type multipart/form-data
      const response = await axiosAPI.put(`/exercises/${exerciseId}/submit/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setUploadedImage(response.data.submitted_image);
      setScore(response.data.score);
      
      // Generate letter feedback if score is below 0.75
      if (response.data.score < 0.75) {
        const feedback = getLetterFeedback(response.data.letter_scores, response.data.requested_text);
        setLetterFeedback(feedback);
      } else {
        setLetterFeedback("");
      }
      
      useExerciseStore.getState().clearExercise();
      fetchExercise(setIsLoading, setExercise);
      
    } catch (error: any) {
      console.error("Failed to submit exercise", error);
    } finally {
      setIsSubmissionLoading(false);
    }
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      submitExercise(file);
    }
  };



  const openCamera = () => {
    if (isMobileDevice()) {
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      }
    } else {
      setShowCamera(true);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      {showCamera && (
        <Camera
          onCapture={(file) => {
            submitExercise(file);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}

      <section className={classes.submission}>
        <div>
          <IconWritingSign stroke={2} size={40} className={classes.writingIcon} />
          {(level == "words" || level == "letters") &&
            <Label style={{ fontSize: "2.2rem", marginTop: "1.5rem" }}>{requested_text}</Label>}
          {level == "category" &&
          <section className={classes.categorySection}>
            <label>Please write a word from category</label>
            <Label style={{ fontSize: "2rem"}}>{category}</Label>
          </section>}
          {isLoading && (
            <ClipLoader loading={isLoading} className={classes.clipLoader} />
          )}
          {"speechSynthesis" in window && (
            <IconVolume
              className={classes.volumeIcon}
              size={35}
              onClick={handleReadExercise}
            />
          )}
          <IconPlayerSkipForwardFilled
            className={classes.skipIcon}
            size={30}
            onClick={handleSkipExercise}
            role="button"
            aria-label="skip-button"
          />
        </div>
        <div>
          <IconCloudUpload stroke={2} size={40} />
          <p>Upload handwriting image</p>
          <section>
            {isMobileDevice() && <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment" // For mobile camera only
              onChange={handleFileChange}
              style={{ display: "none" }}
            />}
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
                <section className={classes.feedbackContainer}>
                  <label>
                    {score >= 0.75 ? "Amazing job! Your handwriting is fantastic!⭐ " :
                     score >= 0.4 ? "Good effort! Keep practicing to get even better!👍" :
                     "Keep practicing, you'll get there! 💪"}
                  </label>
                  {letterFeedback && <label>{letterFeedback}</label>}
                </section>
            ) : (
              <label>Grab a sheet of plain paper and start writing :)</label>
            )}
        </div>
      </section>
    </>
  );
};

export default Submission;
