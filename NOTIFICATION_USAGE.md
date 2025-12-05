# Notification System - Usage Guide

## Quick Start

The notification system is already integrated and will automatically send notifications when bookings are confirmed. No additional setup is required!

## How It Works

### Automatic Notifications

When a user confirms a car booking:

1. User selects a car and goes through the payment flow
2. User clicks "Confirm Payment" on the payment confirmation screen
3. System creates a booking record
4. **Push notification is automatically sent** with booking details
5. User receives notification immediately

### Notification Content

The booking confirmation notification includes:
- **Title:** 🎉 Booking Confirmed!
- **Body:** Your [Brand] [Model] is booked for [X] days. Total: $[Amount]
- **Data:** Booking ID, car details, rental days, total price

Example:
```
Title: 🎉 Booking Confirmed!
Body: Your BMW X5 is booked for 3 days. Total: $720.00
```

## Testing Notifications

### Method 1: Through the App Flow (Recommended)

1. Run the app on a **physical device** (notifications don't work on simulators)
2. Allow notification permissions when prompted
3. Complete a car booking:
   - Browse cars on home screen
   - Select a car and click "Book Now"
   - Fill in payment details
   - Go to confirmation screen
   - Click "Confirm Payment"
4. You should receive a notification immediately!

### Method 2: Using Test Utilities

For development and testing, you can send test notifications from any screen.

#### Add to any component:

```typescript
import { NotificationTests } from '@/notifications/test-notifications';

// In your component
const MyScreen = () => {
  const handleTestNotification = async () => {
    // Send a quick test booking notification
    await NotificationTests.quick();
  };

  return (
    <Button onPress={handleTestNotification}>
      Test Notification
    </Button>
  );
};
```

#### Available Test Functions:

```typescript
// Send immediate notification
await NotificationTests.immediate();

// Send notification after 5 seconds
await NotificationTests.scheduled();

// Send mock booking confirmation
await NotificationTests.booking();

// Send multiple notifications
await NotificationTests.multiple();

// Set notification badge to 5
await NotificationTests.setBadge(5);

// Clear notification badge
await NotificationTests.clearBadge();

// Get all scheduled notifications
const scheduled = await NotificationTests.getScheduled();
console.log('Scheduled:', scheduled);

// Cancel all scheduled notifications
await NotificationTests.cancelAll();

// Clear all delivered notifications from tray
await NotificationTests.clearAll();

// Run complete test suite
await NotificationTests.runSuite();
```

### Method 3: From Console/Debugger

If you're using Expo Go or a development build, you can test from the console:

```javascript
// In Chrome DevTools or React Native Debugger
import('@/notifications/test-notifications').then(({ quickTest }) => {
  quickTest();
});
```

## Notification Interaction

### When User Taps a Notification

1. If app is closed → App opens
2. If app is in background → App comes to foreground
3. User is automatically navigated to the home screen
4. Booking data is available in the booking store

### Customizing Navigation

To customize where notifications navigate, edit `notifications/listeners.ts`:

```typescript
responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
  const data = response.notification.request.content.data;
  
  if (data?.type === 'booking_confirmed') {
    // Navigate to your desired screen
    router.push('/your-screen');
  }
});
```

## Working with Bookings

### Access Booking History

```typescript
import { useBookingStore } from '@/store/booking-store';

const MyComponent = () => {
  const { bookingHistory, currentBooking } = useBookingStore();

  return (
    <>
      <Text>Total Bookings: {bookingHistory.length}</Text>
      
      {currentBooking && (
        <Text>Current: {currentBooking.car.brand} {currentBooking.car.model}</Text>
      )}
      
      {bookingHistory.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </>
  );
};
```

### Manually Trigger Booking

```typescript
import { useBookingStore } from '@/store/booking-store';

const MyComponent = () => {
  const { confirmBooking } = useBookingStore();

  const handleBooking = async () => {
    const booking = await confirmBooking();
    
    if (booking) {
      console.log('Booking successful:', booking.id);
      // Notification is sent automatically
    } else {
      console.log('Booking failed');
    }
  };

  return <Button onPress={handleBooking}>Book Now</Button>;
};
```

## Sending Custom Notifications

### Send Your Own Notification

```typescript
import { sendLocalNotification } from '@/services/push-service';

const sendCustomNotification = async () => {
  await sendLocalNotification({
    title: 'Custom Title',
    body: 'Custom message here',
    data: {
      type: 'custom',
      customField: 'value',
    },
  });
};
```

### Schedule for Later

```typescript
import { scheduleNotification } from '@/services/push-service';

const scheduleReminder = async () => {
  // Send notification in 1 hour (3600 seconds)
  await scheduleNotification({
    title: 'Reminder',
    body: 'Don\'t forget!',
    data: { type: 'reminder' },
    seconds: 3600,
  });
};
```

## Handling Notification History

### Save Notification

```typescript
import { saveNotificationToHistory } from '@/services/push-service';

await saveNotificationToHistory({
  title: 'Title',
  body: 'Body',
  data: { /* custom data */ },
});
```

### Get History

```typescript
import { getNotificationHistory } from '@/services/push-service';

const history = await getNotificationHistory();
console.log('Notification history:', history);
```

### Clear History

```typescript
import { clearNotificationHistory } from '@/services/push-service';

await clearNotificationHistory();
```

## Notification Permissions

### Check Permission Status

```typescript
import * as Notifications from 'expo-notifications';

const checkPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  console.log('Permission status:', status);
  // Returns: 'granted', 'denied', or 'undetermined'
};
```

### Request Permissions

```typescript
import { registerForPushNotifications } from '@/notifications/register';

const requestPermissions = async () => {
  const token = await registerForPushNotifications();
  
  if (token) {
    console.log('Permissions granted, token:', token);
  } else {
    console.log('Permissions denied');
  }
};
```

## Badge Management

### Set Badge Count (iOS)

```typescript
import { setBadgeCount } from '@/notifications/listeners';

// Set badge to 5
await setBadgeCount(5);

// Clear badge
await setBadgeCount(0);
```

### Get Badge Count

```typescript
import { getBadgeCount } from '@/notifications/listeners';

const count = await getBadgeCount();
console.log('Current badge count:', count);
```

## Common Use Cases

### 1. Add Test Button to Settings Screen

```typescript
// In app/(tabs)/settings.tsx
import { NotificationTests } from '@/notifications/test-notifications';
import { Alert } from 'react-native';

const SettingsScreen = () => {
  const handleTestNotification = async () => {
    await NotificationTests.quick();
    Alert.alert('Success', 'Test notification sent!');
  };

  return (
    <View>
      {/* Your existing settings */}
      
      <Button onPress={handleTestNotification}>
        Test Push Notification
      </Button>
    </View>
  );
};
```

### 2. Show Notification History

```typescript
import { useState, useEffect } from 'react';
import { getNotificationHistory } from '@/services/push-service';

const NotificationHistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const notifications = await getNotificationHistory();
    setHistory(notifications);
  };

  return (
    <FlatList
      data={history}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
          <Text>{item.body}</Text>
          <Text>{new Date(item.receivedAt).toLocaleString()}</Text>
        </View>
      )}
    />
  );
};
```

### 3. Silent Notification (No Alert)

```typescript
import * as Notifications from 'expo-notifications';

// Temporarily change handler
const originalHandler = Notifications.getNotificationHandler();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,  // Don't show alert
    shouldPlaySound: false,   // Don't play sound
    shouldSetBadge: true,     // Still update badge
  }),
});

// Send notification
await sendLocalNotification({ ... });

// Restore original handler
Notifications.setNotificationHandler(originalHandler);
```

## Troubleshooting

### Notifications Not Appearing

**Problem:** Notifications don't show up

**Solutions:**
1. ✅ Make sure you're testing on a **physical device** (not simulator)
2. ✅ Check that permissions are granted
3. ✅ Verify the app is not in Do Not Disturb mode
4. ✅ Check notification settings in device Settings app
5. ✅ Look for the push token in console logs

### Notifications Not Navigating

**Problem:** Tapping notification doesn't navigate

**Solutions:**
1. ✅ Ensure `setupNotificationListeners()` is called in layout
2. ✅ Check `notifications/listeners.ts` for navigation logic
3. ✅ Verify the notification includes proper data

### Testing on iOS Simulator

**Problem:** Can't test on iOS simulator

**Solution:**
- Push notifications require a physical device
- Use a real iPhone/iPad for testing
- Alternatively, test with Android emulator which has better simulator support

### Permission Denied

**Problem:** User denied permissions

**Solutions:**
1. Go to device Settings > App > Notifications
2. Enable notifications for your app
3. Restart the app

## Advanced Features

### Custom Notification Sounds

To add custom sounds, place sound files in your project and reference them:

```typescript
await sendLocalNotification({
  title: 'Custom Sound',
  body: 'With special sound',
  sound: 'notification.wav',  // Place in assets/sounds/
  data: {},
});
```

### Action Buttons (iOS/Android)

```typescript
// Define category with actions
await Notifications.setNotificationCategoryAsync('booking', [
  {
    identifier: 'view',
    buttonTitle: 'View Details',
    options: { opensAppToForeground: true },
  },
  {
    identifier: 'cancel',
    buttonTitle: 'Cancel',
    options: { isDestructive: true },
  },
]);

// Send notification with category
await sendLocalNotification({
  title: 'Booking Confirmed',
  body: 'Your car is ready',
  categoryIdentifier: 'booking',
  data: {},
});
```

### Rich Notifications with Images

```typescript
await sendLocalNotification({
  title: 'Your BMW X5',
  body: 'Booking confirmed',
  data: {},
  attachments: [
    {
      url: 'https://example.com/car-image.jpg',
    },
  ],
});
```

## Best Practices

1. **Always Test on Physical Devices**
   - Simulators have limited notification support
   - Real devices provide accurate testing

2. **Handle Permission Denials Gracefully**
   - Don't force users to enable notifications
   - Provide alternative ways to view booking confirmations

3. **Keep Notification Content Concise**
   - Short titles (under 40 characters)
   - Clear, actionable body text
   - Avoid sensitive information

4. **Use Appropriate Notification Channels (Android)**
   - Separate channels for different types
   - Let users customize per-channel settings

5. **Clear Badges Appropriately**
   - Clear when user opens the app
   - Clear when relevant screen is viewed

6. **Test All Notification States**
   - App in foreground
   - App in background
   - App completely closed
   - Different device configurations

## Resources

- [Expo Notifications Documentation](https://docs.expo.dev/push-notifications/overview/)
- [React Native Notifications Guide](https://reactnative.dev/docs/pushnotificationios)
- [APNs (iOS) Documentation](https://developer.apple.com/documentation/usernotifications)
- [FCM (Android) Documentation](https://firebase.google.com/docs/cloud-messaging)

## Support

For issues:
1. Check the console logs
2. Review `NOTIFICATION_SYSTEM.md` for architecture details
3. Use test utilities to debug: `NotificationTests.runSuite()`
4. Verify all dependencies are installed

---

**Version:** 1.0.0  
**Last Updated:** December 2025
