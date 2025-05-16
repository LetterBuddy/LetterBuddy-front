import { create } from "zustand";
import { combine } from "zustand/middleware";

// Added to fix cyprus tests
const isBrowser = typeof window !== 'undefined';
const initialIsSignUp =
  isBrowser && new URLSearchParams(window.location.search).get('signup') === 'true';

const useAuthStore = create(
  combine(
    {
      isSignUp: initialIsSignUp,
      isChild: false,
    },
    (set) => ({
      setIsSignUp: (isSignUp: boolean) => set({ isSignUp }),
      setIsChild: (isChild: boolean) => set({ isChild }),
    })
  )
);

export default useAuthStore;
