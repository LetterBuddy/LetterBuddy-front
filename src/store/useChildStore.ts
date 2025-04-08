import { create } from "zustand";

export interface Child {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    exercise_level: string;
}
    
interface ChildStore {
    children: Child[];
    setChildren: (children: Child[]) => void;
    addChild: (child: Child) => void;
    removeChild: (childId: number) => void;
    removeAllChildren: () => void;
}

const useChildStore = create<ChildStore>((set) => ({
    children: [],
    setChildren: (children) => set({ children }),
    addChild: (child) => set((state) => ({ children: [...state.children, child] })),
    removeChild: (childId) => set((state) => ({ children: state.children.filter(child => child.id !== childId) })),
    removeAllChildren: () => set({ children: []}),
}));

export default useChildStore;
