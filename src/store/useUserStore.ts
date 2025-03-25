import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
    firstName: string;
    lastName: string;
    isChild: boolean;
    isLoggedIn: boolean;
    userLogin: (firstName: string, lastName: string, isChild: boolean) => void;
    clearUser: () => void;
}

const useUserStore = create<UserStore>() (
    persist (
      (set, get) => ({
        firstName: "",
        lastName: "",
        isChild: false,
        isLoggedIn: false,
        userLogin: (firstName, lastName, isChild) => set(() => ({ firstName, lastName, isChild, isLoggedIn: true})),
        clearUser: () => set(() => ({ firstName: "", lastName: "", isChild: false, isLoggedIn: false})),
        getUser: () => get(),
      }),
      {
        name: "user-info",
      }
    ))
export default useUserStore;
