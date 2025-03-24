import { create } from "zustand";
import { combine } from "zustand/middleware";

const useAuthStore = create(
  combine(
    {
      isSignUp: false,
      isChild: false,
    },
    (set) => ({
      setIsSignUp: (isSignUp: boolean) => set({ isSignUp }),
      setIsChild: (isChild: boolean) => set({ isChild }),
    })
  )
);


export default useAuthStore;
