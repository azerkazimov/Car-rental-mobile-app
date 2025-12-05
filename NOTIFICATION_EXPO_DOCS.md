
# 1. Что такое Expo Notifications

Expo Notifications — это система Expo для работы с push-уведомлениями (Android + iOS).  
Даёт возможности:

- Запрашивать разрешения у пользователя
    
- Получать Push Token устройства
    
- Отправлять пуши через Expo Push API
    
- Обрабатывать уведомления в приложении
    
- Использовать Local Notifications (локальные уведомления)
    

Работает:

- в Expo-managed (Classic)
    
- в Bare + EAS Build
    

---

# 2. Установка

### Expo SDK 50+ (EAS build)

```bash
expo install expo-notifications
```

iOS требует:

```bash
npx expo prebuild
```

Android — авто.

---

# 3. Настройка на iOS

Открыть **app.json / app.config.js**:

```json
{
  "expo": {
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.myapp.example",
      "infoPlist": {
        "UIBackgroundModes": ["fetch", "remote-notification"],
        "NSUserTrackingUsageDescription": "We use notifications to keep you updated."
      }
    }
  }
}
```

⚠️ Для iOS нужен **Apple Push Notification (APNs)** ключ или сертификат → автоматически делается через **EAS**:

```bash
eas credentials
```

---

# 4. Настройка на Android

В `app.json`:

```json
{
  "expo": {
    "android": {
      "useNextNotificationsApi": true,
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

Нужен **Firebase проект** — иначе пуши не будут работать.

---

# 5. Запрос разрешений + Получение Push Token

Создаём модуль `useNotifications.js`:

```js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permission for notifications not granted.');
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo token:", token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}
```

---

# 6. Вызов в приложении

```js
useEffect(() => {
  registerForPushNotificationsAsync().then(token => setToken(token));
}, []);
```

---

# 7. Отправка Push-уведомления через Expo API

Expo предоставляет простой endpoint:

```
POST https://exp.host/--/api/v2/push/send
```

Пример отправки (Postman / server-side):

```json
{
  "to": "ExponentPushToken[xxxxxxxxxxxxx]",
  "sound": "default",
  "title": "Hello!",
  "body": "This is a test push notification",
  "data": { "custom": "value" }
}
```

---

# 8. Отправка из Node.js (сервер)

Установить:

```bash
npm install expo-server-sdk
```

Код:

```js
const { Expo } = require('expo-server-sdk');
const expo = new Expo();

async function sendPush(token, title, body) {
  if (!Expo.isExpoPushToken(token)) return;

  let messages = [{
    to: token,
    sound: 'default',
    title,
    body,
    data: { message: body }
  }];

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  for (let chunk of chunks) {
    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    tickets.push(...ticketChunk);
  }

  console.log("Tickets:", tickets);
}
```

---

# 9. Обработка уведомлений в приложении

Expo разделяет:

- Уведомление получено, когда приложение на экране (**foreground listener**)
    
- Уведомление нажато пользователем (**response listener**)
    

### Подписка

```js
useEffect(() => {
  const subscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("Получено:", notification);
    }
  );

  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Нажато:", response);
    });

  return () => {
    subscription.remove();
    responseSubscription.remove();
  };
}, []);
```

---

# 10. Локальные уведомления

Запланировать уведомление:

```js
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Local Notification",
    body: "This is local!",
  },
  trigger: { seconds: 3 },
});
```

---

# 11. Push Background Notifications (iOS + Android)

Открыть фоновый обработчик:

```js
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldShowAlert: true,
    shouldSetBadge: false,
  })
});
```

---

# 12. Deep Linking с пушами

Отправьте пуш:

```json
{
  "to": "...",
  "title": "New product!",
  "body": "Tap to open",
  "data": { "screen": "Product", "id": 15 }
}
```

Обработка:

```js
Notifications.addNotificationResponseReceivedListener(response => {
  const data = response.notification.request.content.data;

  if (data.screen) {
    navigation.navigate(data.screen, { id: data.id });
  }
});
```

---

# 13. Expo Push Token vs Device Token

| Тип                 | Для                 | Где используется             |
| ------------------- | ------------------- | ---------------------------- |
| **Expo Push Token** | Expo → сервер пушей | `sendPushNotificationsAsync` |
| **APNs (iOS)**      | Apple push сервер   | Только если не Expo          |
| **FCM (Android)**   | Firebase            | Только bare / custom push    |

Expo использует APNs + FCM под капотом.

---

# 14. Типичные ошибки и решения

### ❌ _Push Token = null_

Причина:

- Симулятор (iOS/Android) → пушей нет
    

### ❌ _Пуши не приходят_

Причины:

- Нет Firebase config на Android
    
- Нет APNs на iOS
    
- Вы используете `expo start` → пуши не работают без `expo build / EAS build`
    

### ❌ iOS не показывает пуши

Причина:

- Разрешения не даны
    
- Нету Background Mode → `remote-notification`
    

---

# 15. Рекомендуемая структура проекта

```
src/
  notifications/
    register.ts
    listeners.ts
  services/
    pushService.js (сервер)
```

---

# 16. Минимальный рабочий пример

```js
import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./src/notifications/register";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    const sub = Notifications.addNotificationReceivedListener(n => {
      console.log("Foreground:", n);
    });

    return () => sub.remove();
  }, []);

  return (
    <View>
      <Text>Token: {expoPushToken}</Text>
      <Button
        title="Send local"
        onPress={() =>
          Notifications.scheduleNotificationAsync({
            content: { title: "Hello", body: "local" },
            trigger: { seconds: 2 },
          })
        }
      />
    </View>
  );
}
```
