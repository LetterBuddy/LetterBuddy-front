import axiosAPI from "../../axiosAPI";
import useExerciseStore from "../../store/useExerciseStore";

export const getLetterFeedback = (letter_scores: number[], submittedText: string, requestedText: string) => {
  const differentLetters: string[] = [];
  
  // compare each letter between submitted and requested text
  for (let i = 0; i < Math.min(submittedText.length, requestedText.length); i++) {
    if (submittedText[i] !== requestedText[i] || letter_scores[i] < 0.7) {
      if (!differentLetters.includes(requestedText[i])) {
        differentLetters.push(requestedText[i]);
      }
    }
  }
  
  // take max 3 different letters
  const lettersToImprove = differentLetters.slice(0, 3);
  
  if (lettersToImprove.length === 0) return "";
  
  const letterList = lettersToImprove
    .map(letter => `'${letter}'`)
    .join(", ");
  
  return `Try working on letters: ${letterList}`;
};

export const readExercise = (level: string, requested_text: string, category: string | null) => {
  if (!("speechSynthesis" in window)) return;
  let guidingText = "";
  if (level === "letters") {
    guidingText = "Please write the letter " + requested_text[0] + requested_text.length + " times.";
  } else if (level === "words") {
    guidingText = requested_text;
  } else if (level === "category") {
    guidingText = "Please write a word from the category: " + category;
  }
  const utterance = new SpeechSynthesisUtterance(guidingText);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};

export const fetchExercise = async (setIsLoading: (loading: boolean) => void, setExercise: any) => {
  setIsLoading(true);
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

export const skipExercise = async (setIsLoading: (loading: boolean) => void) => {
  setIsLoading(true);
  const exerciseId = useExerciseStore.getState().id;
  if (exerciseId === -1) return;
  useExerciseStore.getState().clearExercise();
  try {
    await axiosAPI.delete(`/exercises/${exerciseId}/`);
    await fetchExercise(setIsLoading, useExerciseStore.getState().setExercise);
  } catch (error: any) {
    console.error("Failed to skip exercise", error);
  }
};

export const isMobileDevice = () => {
  return /Android|webOS|iPhone/i.test(navigator.userAgent);
};
