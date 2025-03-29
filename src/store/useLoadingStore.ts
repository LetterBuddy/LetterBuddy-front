import { create } from "zustand";

type LoadingState = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useLoadingStore;
