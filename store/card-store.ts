import { create } from "zustand";

interface CardStore {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  saveCardInfo: boolean;
  setCardNumber: (cardNumber: string) => void;
  setCardHolder: (cardHolder: string) => void;
  setExpiry: (expiry: string) => void;
  setCvv: (cvv: string) => void;
  setSaveCardInfo: (saveCardInfo: boolean) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  cardNumber: "",
  cardHolder: "",
  expiry: "",
  cvv: "",
  saveCardInfo: false,
  setCardNumber: (cardNumber: string) => set({ cardNumber }),
  setCardHolder: (cardHolder: string) => set({ cardHolder }),
  setExpiry: (expiry: string) => set({ expiry }),
  setCvv: (cvv: string) => set({ cvv }),
  setSaveCardInfo: (saveCardInfo: boolean) => set({ saveCardInfo }),
}));