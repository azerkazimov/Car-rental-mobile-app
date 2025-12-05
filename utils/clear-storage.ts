import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Clears all data from AsyncStorage
 */
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("✅ AsyncStorage cleared successfully");
    return true;
  } catch (error) {
    console.error("❌ Error clearing AsyncStorage:", error);
    return false;
  }
};

/**
 * Clears specific keys from AsyncStorage
 */
export const clearStorageKeys = async (keys: string[]) => {
  try {
    await AsyncStorage.multiRemove(keys);
    console.log(`✅ Cleared keys: ${keys.join(", ")}`);
    return true;
  } catch (error) {
    console.error("❌ Error clearing keys:", error);
    return false;
  }
};

/**
 * Clears all auth-related data
 */
export const clearAuthStorage = async () => {
  return clearStorageKeys(["user", "isAuthenticated", "onboarded"]);
};

/**
 * Clears driving licence data
 */
export const clearDrivingLicenceStorage = async () => {
  return clearStorageKeys(["drivingLicence"]);
};

/**
 * Clears notification-related data
 */
export const clearNotificationStorage = async () => {
  return clearStorageKeys(["pushToken", "notification_history"]);
};

/**
 * Clears booking history
 */
export const clearBookingStorage = async () => {
  // Note: This only clears persisted data, not the Zustand store
  // You may need to call store.clearCurrentBooking() separately
  return clearStorageKeys(["bookingHistory"]);
};
