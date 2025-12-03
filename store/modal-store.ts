import { create } from "zustand";

interface ModalStore {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
}));