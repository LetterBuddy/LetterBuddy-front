import { create } from "zustand";
import { combine } from "zustand/middleware";

const useAuthStore = create(
  combine(
    {
      isSignUp: false,
      isChild: false,
      isAuthenticated: false,
    },
    (set) => ({
      setIsSignUp: (isSignUp: boolean) => set({ isSignUp }),
      setIsChild: (isChild: boolean) => set({ isChild }),
      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    })
  )
);

export default useAuthStore;
