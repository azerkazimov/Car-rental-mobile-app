# Quick Start - Push Notifications

## 🚀 It's Already Working!

Your car rental app now automatically sends push notifications when bookings are confirmed. No additional setup needed!

## ⚡ Test It Now

### Option 1: Complete a Real Booking (Recommended)
1. Run on a physical device: `npm start`
2. Allow notification permissions
3. Select a car → Book Now → Complete payment → Confirm
4. 🎉 You'll receive a notification immediately!

### Option 2: Quick Test Button

Add to any screen (e.g., Settings):

```typescript
import { NotificationTests } from '@/notifications/test-notifications';
import { Button } from '@/components/ui/button';

<Button onPress={() => NotificationTests.quick()}>
  Test Notification
</Button>
```

## 📱 What You'll See

```
━━━━━━━━━━━━━━━━━━━━━━
🎉 Booking Confirmed!

Your BMW X5 is booked for 
3 days. Total: $720.00
━━━━━━━━━━━━━━━━━━━━━━
```

## 🎯 When Notifications Are Sent

Notifications are automatically sent when:
- ✅ User confirms payment on payment confirmation screen
- ✅ Booking is successfully created
- ✅ Push permissions are granted

## 📖 Need More Info?

- **Usage Examples:** `NOTIFICATION_USAGE.md`
- **Technical Details:** `NOTIFICATION_SYSTEM.md`
- **Complete Overview:** `IMPLEMENTATION_SUMMARY.md`

## 🧪 All Test Functions

```typescript
import { NotificationTests } from '@/notifications/test-notifications';

// Quick tests
NotificationTests.quick()        // Send test booking notification
NotificationTests.immediate()    // Immediate notification
NotificationTests.scheduled()    // Scheduled (5 seconds)
NotificationTests.booking()      // Mock booking
NotificationTests.multiple()     // 3 notifications at once

// Management
NotificationTests.setBadge(5)    // Set badge to 5
NotificationTests.clearBadge()   // Clear badge
NotificationTests.cancelAll()    // Cancel scheduled
NotificationTests.clearAll()     // Clear delivered

// Full suite
NotificationTests.runSuite()     // Run all tests
```

## ⚠️ Important

- **Physical Device Required** - Notifications don't work on simulators
- **Permissions Needed** - Allow notifications when prompted
- **Check Console** - Look for "Push notification token" in logs

## ✅ That's It!

Your notification system is ready to go. Complete a booking or use the test utilities to try it out!

---
**Need help?** Check the documentation files or console logs.
