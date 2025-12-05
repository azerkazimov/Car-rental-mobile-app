/**
 * Notification Testing Utilities
 * 
 * Use these functions to test notifications during development.
 * Import and call them from any component or screen.
 */

import {
    scheduleNotification,
    sendBookingConfirmationNotification,
    sendBookingReminderNotification,
    sendLocalNotification,
} from '@/services/push-service';
import {
    cancelAllNotifications,
    clearAllDeliveredNotifications,
    getScheduledNotifications,
    setBadgeCount,
} from './listeners';

/**
 * Test: Send immediate notification
 */
export async function testImmediateNotification() {
  try {
    console.log('📤 Sending test notification...');
    
    const notificationId = await sendLocalNotification({
      title: '🧪 Test Notification',
      body: 'This is a test notification sent immediately!',
      data: { 
        type: 'test',
        timestamp: new Date().toISOString(),
      },
    });
    
    console.log('✅ Test notification sent:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('❌ Error sending test notification:', error);
    throw error;
  }
}

/**
 * Test: Schedule notification for 5 seconds from now
 */
export async function testScheduledNotification() {
  try {
    console.log('⏱️ Scheduling test notification for 5 seconds...');
    
    const notificationId = await scheduleNotification({
      title: '⏰ Scheduled Test',
      body: 'This notification was scheduled 5 seconds ago!',
      data: { 
        type: 'test',
        scheduled: true,
      },
      seconds: 5,
    });
    
    console.log('✅ Test notification scheduled:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('❌ Error scheduling test notification:', error);
    throw error;
  }
}

/**
 * Test: Send mock booking confirmation
 */
export async function testBookingConfirmation() {
  try {
    console.log('🚗 Sending test booking confirmation...');
    
    const mockBooking = {
      carBrand: 'BMW',
      carModel: 'X5',
      rentalDays: 3,
      totalPrice: 720.00,
      bookingId: 'test-booking-' + Date.now(),
    };
    
    const notificationId = await sendBookingConfirmationNotification(mockBooking);
    
    console.log('✅ Booking confirmation sent:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('❌ Error sending booking confirmation:', error);
    throw error;
  }
}

/**
 * Test: Send mock reminder notification
 */
export async function testReminderNotification() {
  try {
    console.log('⏰ Scheduling test reminder...');
    
    const notificationId = await sendBookingReminderNotification({
      carBrand: 'Tesla',
      carModel: 'Model 3',
      hoursUntilPickup: 24,
    });
    
    console.log('✅ Reminder scheduled:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('❌ Error scheduling reminder:', error);
    throw error;
  }
}

/**
 * Test: Send multiple notifications
 */
export async function testMultipleNotifications() {
  try {
    console.log('📤 Sending multiple test notifications...');
    
    const notifications = await Promise.all([
      sendLocalNotification({
        title: 'First Notification',
        body: 'This is the first test notification',
        data: { order: 1 },
      }),
      sendLocalNotification({
        title: 'Second Notification',
        body: 'This is the second test notification',
        data: { order: 2 },
      }),
      sendLocalNotification({
        title: 'Third Notification',
        body: 'This is the third test notification',
        data: { order: 3 },
      }),
    ]);
    
    console.log('✅ Multiple notifications sent:', notifications);
    return notifications;
  } catch (error) {
    console.error('❌ Error sending multiple notifications:', error);
    throw error;
  }
}

/**
 * Test: Get all scheduled notifications
 */
export async function testGetScheduledNotifications() {
  try {
    console.log('📋 Getting scheduled notifications...');
    
    const scheduled = await getScheduledNotifications();
    
    console.log('✅ Scheduled notifications:', scheduled);
    console.log(`   Total: ${scheduled.length}`);
    
    return scheduled;
  } catch (error) {
    console.error('❌ Error getting scheduled notifications:', error);
    throw error;
  }
}

/**
 * Test: Set notification badge
 */
export async function testSetBadge(count: number = 5) {
  try {
    console.log(`🔢 Setting badge count to ${count}...`);
    
    await setBadgeCount(count);
    
    console.log('✅ Badge count set');
  } catch (error) {
    console.error('❌ Error setting badge:', error);
    throw error;
  }
}

/**
 * Test: Clear badge
 */
export async function testClearBadge() {
  try {
    console.log('🔢 Clearing badge count...');
    
    await setBadgeCount(0);
    
    console.log('✅ Badge cleared');
  } catch (error) {
    console.error('❌ Error clearing badge:', error);
    throw error;
  }
}

/**
 * Test: Cancel all notifications
 */
export async function testCancelAllNotifications() {
  try {
    console.log('🗑️ Cancelling all scheduled notifications...');
    
    await cancelAllNotifications();
    
    console.log('✅ All notifications cancelled');
  } catch (error) {
    console.error('❌ Error cancelling notifications:', error);
    throw error;
  }
}

/**
 * Test: Clear all delivered notifications
 */
export async function testClearAllNotifications() {
  try {
    console.log('🧹 Clearing all delivered notifications...');
    
    await clearAllDeliveredNotifications();
    
    console.log('✅ All delivered notifications cleared');
  } catch (error) {
    console.error('❌ Error clearing notifications:', error);
    throw error;
  }
}

/**
 * Run a full test suite
 */
export async function runNotificationTestSuite() {
  console.log('\n🧪 Starting Notification Test Suite\n');
  console.log('===================================\n');
  
  try {
    // Test 1: Immediate notification
    console.log('Test 1: Immediate Notification');
    await testImmediateNotification();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test 2: Scheduled notification
    console.log('\nTest 2: Scheduled Notification (5 seconds)');
    await testScheduledNotification();
    console.log('   (Wait 5 seconds to see the notification)');
    await new Promise(resolve => setTimeout(resolve, 7000));
    
    // Test 3: Booking confirmation
    console.log('\nTest 3: Booking Confirmation');
    await testBookingConfirmation();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test 4: Badge
    console.log('\nTest 4: Badge Count');
    await testSetBadge(3);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test 5: Get scheduled
    console.log('\nTest 5: Get Scheduled Notifications');
    await testGetScheduledNotifications();
    
    console.log('\n===================================');
    console.log('✅ All tests completed!\n');
    
    return true;
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    return false;
  }
}

/**
 * Quick test - just send one notification
 */
export async function quickTest() {
  return await testBookingConfirmation();
}

// Export a test command object for easy access
export const NotificationTests = {
  immediate: testImmediateNotification,
  scheduled: testScheduledNotification,
  booking: testBookingConfirmation,
  reminder: testReminderNotification,
  multiple: testMultipleNotifications,
  getScheduled: testGetScheduledNotifications,
  setBadge: testSetBadge,
  clearBadge: testClearBadge,
  cancelAll: testCancelAllNotifications,
  clearAll: testClearAllNotifications,
  runSuite: runNotificationTestSuite,
  quick: quickTest,
};
