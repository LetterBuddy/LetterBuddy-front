import axiosAPI from "../../axiosAPI";
import useExerciseStore from "../../store/useExerciseStore";

export const getLetterFeedback = (letter_errors: number[],  requestedText: string) => {
  const errorMap: Record<string, number> = {};

  for (let i = 0; i < requestedText.length; i++) {
    const letter = requestedText[i];
    const error = letter_errors[i];
    if(error <= 0.25) continue; 
    if (!errorMap[letter] || errorMap[letter] < error) {
      errorMap[letter] = error
    }
  }

  // Sort letters by descending error score and take top 3
  const lettersToImprove = Object.entries(errorMap)
    .sort(([, aError], [, bError]) => bError - aError)
    .slice(0, 3)
    .map(([letter]) => letter);

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
