import { CarModel } from "@/types/car-model";
import { create } from "zustand";

interface BookingStore {
  selectedCar: CarModel | null;
  rentalDays: number;
  setSelectedCar: (car: CarModel | null) => void;
  setRentalDays: (days: number) => void;
  getTotalPrice: () => number;
  getServiceFee: () => number;
  getFinalTotal: () => number;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  selectedCar: null,
  rentalDays: 1,
  setSelectedCar: (car) => set({ selectedCar: car }),
  setRentalDays: (days) => set({ rentalDays: days }),
  getTotalPrice: () => {
    const { selectedCar, rentalDays } = get();
    if (!selectedCar) return 0;
    return selectedCar.pricePerDay * rentalDays;
  },
  getServiceFee: () => {
    const totalPrice = get().getTotalPrice();
    return totalPrice * 0.05; // 5% service fee
  },
  getFinalTotal: () => {
    const totalPrice = get().getTotalPrice();
    const serviceFee = get().getServiceFee();
    return totalPrice + serviceFee;
  },
}));

