# Car Rental Notification System

## Overview

This document describes the complete push notification system implemented for the car rental application. The system sends push notifications to users when their car booking is confirmed.

## Architecture

The notification system consists of four main components:

### 1. **Notification Registration** (`notifications/register.ts`)
Handles the registration and configuration of push notifications.

**Key Functions:**
- `configureNotificationHandler()` - Sets up how notifications are displayed when the app is in the foreground
- `registerForPushNotifications()` - Requests permissions and retrieves the push token
- `getPushToken()` - Retrieves the stored push token
- `removePushToken()` - Removes the stored push token

**Features:**
- Automatic permission request for iOS and Android
- Android notification channels setup
  - `booking-updates` - High priority channel for booking confirmations
  - `default` - Standard notifications
- Push token storage in AsyncStorage
- Proper error handling and logging

### 2. **Notification Listeners** (`notifications/listeners.ts`)
Manages notification event listeners and user interactions.

**Key Functions:**
- `setupNotificationListeners()` - Initializes all notification listeners
- `removeNotificationListeners()` - Cleanup function to remove listeners
- `cancelNotification(id)` - Cancel a specific scheduled notification
- `cancelAllNotifications()` - Cancel all scheduled notifications
- `setBadgeCount(count)` - Set notification badge count (iOS)

**Event Handlers:**
- `notificationReceived` - Triggered when a notification is received while app is open
- `notificationResponse` - Triggered when user taps on a notification

**Navigation:**
- Automatically navigates to relevant screens when notifications are tapped
- Supports custom navigation based on notification data

### 3. **Push Service** (`services/push-service.js`)
Provides functions to send local and scheduled notifications.

**Key Functions:**

#### Local Notifications
- `sendLocalNotification({ title, body, data })` - Send immediate notification
- `scheduleNotification({ title, body, data, seconds })` - Schedule notification for later
- `sendBookingConfirmationNotification(bookingDetails)` - Send booking confirmation (main function)
- `sendBookingReminderNotification({ carBrand, carModel, hoursUntilPickup })` - Send pickup reminder

#### Notification History
- `saveNotificationToHistory(notification)` - Save notification to local history
- `getNotificationHistory()` - Retrieve all saved notifications
- `clearNotificationHistory()` - Clear notification history

#### Server Integration (Future)
- `getServerNotificationPayload(bookingDetails)` - Generates payload for server-side notifications
- Ready for integration with `expo-server-sdk` on your backend

### 4. **Booking Store Integration** (`store/booking-store.ts`)
The booking store has been enhanced with notification support.

**New Features:**
- `confirmBooking()` - Confirms booking and triggers notification
- `bookingHistory` - Stores all confirmed bookings
- `currentBooking` - Tracks the active booking
- `clearCurrentBooking()` - Resets the current booking state

**Booking Object Structure:**
```typescript
interface Booking {
  id: string;                    // Unique booking ID (UUID)
  car: CarModel;                 // Car details
  rentalDays: number;            // Number of days
  totalPrice: number;            // Subtotal
  serviceFee: number;            // 5% service fee
  finalTotal: number;            // Total amount
  bookingDate: string;           // ISO date string
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
}
```

## Implementation Flow

### 1. App Initialization
When the app starts (`layout/layout-content.tsx`):

```typescript
useEffect(() => {
  // Configure notification behavior
  configureNotificationHandler();
  
  // Setup event listeners
  setupNotificationListeners();
  
  // Register for push notifications
  registerForPushNotifications().then((token) => {
    if (token) {
      console.log('Push token:', token);
      // In production: Send token to your backend
    }
  });
  
  // Cleanup on unmount
  return () => {
    removeNotificationListeners();
  };
}, []);
```

### 2. Booking Confirmation Flow
When user confirms payment (`app/payment/confirm/page.tsx`):

```typescript
const handleConfirmPayment = async () => {
  // 1. Confirm booking in store
  const booking = await confirmBooking();
  
  // 2. Store automatically sends notification
  //    via sendBookingConfirmationNotification()
  
  // 3. Show success alert
  Alert.alert('Booking Confirmed!', 'Check your notifications');
  
  // 4. Navigate to home
  router.push('/(tabs)/');
};
```

### 3. Notification Delivery

The notification is sent immediately with the following details:
- **Title:** "🎉 Booking Confirmed!"
- **Body:** "Your [Brand] [Model] is booked for [X] days. Total: $[Amount]"
- **Data:** Includes booking ID, car details, rental days, total price, timestamp

### 4. User Interaction

When user taps the notification:
1. App opens (if closed) or comes to foreground
2. `notificationResponse` listener is triggered
3. User is automatically navigated to the home screen
4. Booking data is available in the store

## Configuration

### Android

The system creates two notification channels:

1. **booking-updates** (High Priority)
   - Used for booking confirmations
   - Max importance
   - Vibration pattern
   - Sound enabled
   - Blue light color (#0066FF)

2. **default** (Standard Priority)
   - Used for general notifications
   - High importance
   - Default sound

### iOS

Configuration in `app.json`:
```json
{
  "ios": {
    "infoPlist": {
      "UIBackgroundModes": ["fetch", "remote-notification"],
      "NSUserTrackingUsageDescription": "We use notifications to keep you updated."
    }
  }
}
```

## Testing

### Test Local Notifications

1. Run the app on a physical device (required for push notifications)
2. Grant notification permissions when prompted
3. Complete a booking by:
   - Selecting a car
   - Going through payment flow
   - Confirming payment on the confirmation screen
4. You should receive a notification immediately

### Test Notification Tapping

1. Send a notification (complete a booking)
2. Put the app in the background (home button)
3. Tap the notification
4. App should open and navigate to home screen

### Test Scheduled Notifications (Optional)

You can test scheduled notifications using the service:

```javascript
import { scheduleNotification } from '@/services/push-service';

// Schedule a test notification for 10 seconds from now
scheduleNotification({
  title: 'Test Notification',
  body: 'This is a test',
  data: { test: true },
  seconds: 10,
});
```

## Backend Integration (Future Enhancement)

To implement server-side push notifications:

### 1. Backend Setup (Node.js)

Install the Expo Server SDK:
```bash
npm install expo-server-sdk
```

### 2. Send Notifications from Backend

```javascript
const { Expo } = require('expo-server-sdk');
const expo = new Expo();

async function sendPushNotification(pushToken, bookingDetails) {
  // Check if token is valid
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error('Invalid push token');
    return;
  }

  const message = {
    to: pushToken,
    sound: 'default',
    title: '🎉 Booking Confirmed!',
    body: `Your ${bookingDetails.carBrand} ${bookingDetails.carModel} is booked!`,
    data: {
      type: 'booking_confirmed',
      bookingId: bookingDetails.bookingId,
    },
    priority: 'high',
    channelId: 'booking-updates',
  };

  try {
    const ticket = await expo.sendPushNotificationsAsync([message]);
    console.log('Notification sent:', ticket);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
```

### 3. Store Push Tokens

When users register or log in:
1. App sends push token to backend
2. Backend stores token with user account
3. Backend uses token to send notifications

### 4. Update App Code

Replace local notifications with API calls:

```typescript
// In booking-store.ts
confirmBooking: async () => {
  // ... booking logic ...
  
  // Send booking to backend
  const response = await fetch('YOUR_API/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      booking,
      pushToken: await getPushToken(),
    }),
  });
  
  // Backend will send the push notification
}
```

## Notification Payload Structure

### Booking Confirmation Notification
```json
{
  "title": "🎉 Booking Confirmed!",
  "body": "Your BMW X5 is booked for 3 days. Total: $720.00",
  "data": {
    "type": "booking_confirmed",
    "bookingId": "550e8400-e29b-41d4-a716-446655440000",
    "carBrand": "BMW",
    "carModel": "X5",
    "rentalDays": 3,
    "totalPrice": 720.00,
    "timestamp": "2025-12-05T10:30:00.000Z"
  }
}
```

### Reminder Notification (Future)
```json
{
  "title": "🚗 Pickup Reminder",
  "body": "Your BMW X5 pickup is in 24 hours. Don't forget your license!",
  "data": {
    "type": "booking_reminder",
    "carBrand": "BMW",
    "carModel": "X5",
    "hoursUntilPickup": 24
  }
}
```

## Troubleshooting

### Notifications Not Appearing

1. **Check Permissions:**
   - Ensure notification permissions are granted
   - On iOS: Settings > App > Notifications
   - On Android: Settings > Apps > Your App > Notifications

2. **Physical Device Required:**
   - Push notifications don't work on simulators/emulators
   - Must test on a real device

3. **Check Token:**
   - Verify push token is generated: Check console logs
   - Token should start with `ExponentPushToken[`

4. **Android Channel:**
   - Ensure notification channel is created
   - Check `registerForPushNotifications()` logs

### Notifications Not Navigating

1. Check `notifications/listeners.ts` for navigation logic
2. Ensure `expo-router` is properly configured
3. Verify notification data contains correct screen path

### Badge Count Not Updating (iOS)

1. Ensure badge permission is granted
2. Call `setBadgeCount()` explicitly when needed
3. Clear badge when app is opened

## Future Enhancements

Potential features to add:

1. **Notification Preferences**
   - Allow users to enable/disable certain notification types
   - Quiet hours configuration
   - Sound and vibration preferences

2. **Rich Notifications**
   - Add car images to notifications
   - Action buttons (View Details, Cancel Booking)
   - Reply functionality for customer service

3. **Notification History UI**
   - Screen to view all past notifications
   - Filter by type
   - Mark as read/unread

4. **Additional Notification Types**
   - Booking reminder (24h before pickup)
   - Return reminder
   - Special offers and promotions
   - Rating request after return

5. **Deep Linking**
   - More sophisticated navigation based on notification type
   - Direct navigation to specific booking details
   - Open specific tabs or modals

## Dependencies

- `expo-notifications` - Core notification functionality
- `expo-device` - Device type detection
- `@react-native-async-storage/async-storage` - Token storage
- `react-native-uuid` - Generate unique booking IDs
- `expo-server-sdk` - Server-side push (for backend)

## Security Considerations

1. **Token Security:**
   - Push tokens should be treated as sensitive data
   - Store securely and never expose in logs
   - Refresh tokens periodically

2. **Data in Notifications:**
   - Don't include sensitive information (credit card numbers, passwords)
   - Booking data is safe to include

3. **Backend Authentication:**
   - When implementing server-side notifications, ensure API is authenticated
   - Validate user ownership of bookings before sending notifications

## Support

For issues or questions:
1. Check Expo documentation: https://docs.expo.dev/push-notifications/overview/
2. Check console logs for error messages
3. Verify app.json configuration
4. Ensure all dependencies are installed

---

**Last Updated:** December 2025
**Version:** 1.0.0
