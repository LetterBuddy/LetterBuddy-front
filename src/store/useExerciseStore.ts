import { create } from "zustand";

type ExerciseStore = {
  id: number;
  requested_text: string;
  level: string;
  category: string;
  setExercise: (id: number, requested_text: string, level: string, category: string) => void;
  clearExercise: () => void;
};

const useExerciseStore = create<ExerciseStore>((set) => ({
    id: -1,
    requested_text: "",
    level: "",
    category: "",
    setExercise: (id, requested_text, level, category) => set({ id, requested_text, level, category }),
    clearExercise: () => set({ id: -1, requested_text: "", level: "", category: ""})
}));

export default useExerciseStore;