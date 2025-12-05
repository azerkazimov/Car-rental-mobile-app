import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

/**
 * Local Notification Service for Car Rental Booking
 * This service handles sending local push notifications when a booking is confirmed
 */

/**
 * Send a local push notification immediately
 * @param {Object} params - Notification parameters
 * @param {string} params.title - Notification title
 * @param {string} params.body - Notification body
 * @param {Object} params.data - Additional data to pass with notification
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendLocalNotification({ title, body, data = {} }) {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        vibrate: [0, 250, 250, 250],
        badge: 1,
      },
      trigger: null, // null means send immediately
    });

    console.log('Local notification sent:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error sending local notification:', error);
    throw error;
  }
}

/**
 * Schedule a notification for later
 * @param {Object} params - Notification parameters
 * @param {string} params.title - Notification title
 * @param {string} params.body - Notification body
 * @param {Object} params.data - Additional data
 * @param {number} params.seconds - Seconds from now to trigger
 * @returns {Promise<string>} - Notification identifier
 */
export async function scheduleNotification({ title, body, data = {}, seconds = 60 }) {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        vibrate: [0, 250, 250, 250],
        badge: 1,
      },
      trigger: {
        seconds,
      },
    });

    console.log('Notification scheduled:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
}

/**
 * Send booking confirmation notification
 * @param {Object} bookingDetails - Booking information
 * @param {string} bookingDetails.carBrand - Car brand name
 * @param {string} bookingDetails.carModel - Car model name
 * @param {number} bookingDetails.rentalDays - Number of rental days
 * @param {number} bookingDetails.totalPrice - Total booking price
 * @param {string} bookingDetails.bookingId - Unique booking ID
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendBookingConfirmationNotification(bookingDetails) {
  const { carBrand, carModel, rentalDays, totalPrice, bookingId } = bookingDetails;

  const title = '🎉 Booking Confirmed!';
  const body = `Your ${carBrand} ${carModel} is booked for ${rentalDays} ${
    rentalDays === 1 ? 'day' : 'days'
  }. Total: $${totalPrice.toFixed(2)}`;

  const data = {
    type: 'booking_confirmed',
    bookingId,
    carBrand,
    carModel,
    rentalDays,
    totalPrice,
    timestamp: new Date().toISOString(),
  };

  return await sendLocalNotification({ title, body, data });
}

/**
 * Send booking reminder notification
 * @param {Object} params - Reminder parameters
 * @param {string} params.carBrand - Car brand name
 * @param {string} params.carModel - Car model name
 * @param {number} params.hoursUntilPickup - Hours until pickup time
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendBookingReminderNotification({ carBrand, carModel, hoursUntilPickup }) {
  const title = '🚗 Pickup Reminder';
  const body = `Your ${carBrand} ${carModel} pickup is in ${hoursUntilPickup} hours. Don't forget to bring your driving license!`;

  const data = {
    type: 'booking_reminder',
    carBrand,
    carModel,
    hoursUntilPickup,
  };

  // Schedule for the appropriate time before pickup
  const seconds = Math.max(0, (hoursUntilPickup - 2) * 3600); // 2 hours before pickup

  return await scheduleNotification({ title, body, data, seconds });
}

/**
 * Save notification history to AsyncStorage
 * @param {Object} notification - Notification data to save
 */
export async function saveNotificationToHistory(notification) {
  try {
    const historyKey = 'notification_history';
    const existingHistory = await AsyncStorage.getItem(historyKey);
    const history = existingHistory ? JSON.parse(existingHistory) : [];

    history.unshift({
      ...notification,
      receivedAt: new Date().toISOString(),
    });

    // Keep only last 50 notifications
    const trimmedHistory = history.slice(0, 50);

    await AsyncStorage.setItem(historyKey, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving notification to history:', error);
  }
}

/**
 * Get notification history
 * @returns {Promise<Array>} - Array of notifications
 */
export async function getNotificationHistory() {
  try {
    const historyKey = 'notification_history';
    const history = await AsyncStorage.getItem(historyKey);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting notification history:', error);
    return [];
  }
}

/**
 * Clear notification history
 */
export async function clearNotificationHistory() {
  try {
    await AsyncStorage.removeItem('notification_history');
  } catch (error) {
    console.error('Error clearing notification history:', error);
  }
}

/**
 * Server-side push notification sender (for backend integration)
 * This would typically be called from your backend server
 * For now, it's a placeholder showing how to structure the data
 * 
 * In production, you would:
 * 1. Send push token to your backend when user registers
 * 2. Your backend would call Expo's push notification service
 * 3. Use expo-server-sdk on your Node.js backend
 * 
 * Example backend code:
 * 
 * const { Expo } = require('expo-server-sdk');
 * const expo = new Expo();
 * 
 * async function sendPushNotification(pushToken, title, body, data) {
 *   const message = {
 *     to: pushToken,
 *     sound: 'default',
 *     title: title,
 *     body: body,
 *     data: data,
 *     priority: 'high',
 *     channelId: 'booking-updates',
 *   };
 *   
 *   const ticket = await expo.sendPushNotificationsAsync([message]);
 *   return ticket;
 * }
 */
export function getServerNotificationPayload(bookingDetails) {
  const { carBrand, carModel, rentalDays, totalPrice, bookingId, pushToken } = bookingDetails;

  return {
    to: pushToken,
    sound: 'default',
    title: '🎉 Booking Confirmed!',
    body: `Your ${carBrand} ${carModel} is booked for ${rentalDays} ${
      rentalDays === 1 ? 'day' : 'days'
    }. Total: $${totalPrice.toFixed(2)}`,
    data: {
      type: 'booking_confirmed',
      bookingId,
      carBrand,
      carModel,
      rentalDays,
      totalPrice,
      timestamp: new Date().toISOString(),
    },
    priority: 'high',
    channelId: 'booking-updates',
  };
}
