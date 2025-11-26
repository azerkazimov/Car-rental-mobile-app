- Refresh Control
- Flatlist -> ListHeaderComponent -> ListEmptyComponent -> ListFooterComponent -> onRefresh
- React native reanimation
- index.tsx => logic to show 3 pages, set [index, setIndex] if index === 0 show first screen after second ...
- AsyncStorage has onboarded
- tabs -> screenOption -> sceneStyle -> background: "red"
- expo-blur
- npx expo run: ios -d


---

# 1️⃣ RefreshControl + FlatList (Header, Empty, Footer, onRefresh)

RefreshControl используется для обновления данных свайпом вниз.  
Чаще всего применяется вместе с FlatList, где можно дополнительно выводить собственный Header, Footer и Empty-заглушку.

```tsx
const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await loadData();
  setRefreshing(false);
};

<FlatList
  data={items}
  renderItem={renderItem}
  refreshing={refreshing}
  onRefresh={onRefresh}
  ListHeaderComponent={<Text style={{ fontSize: 24 }}>Products</Text>}
  ListEmptyComponent={<Text>No items found</Text>}
  ListFooterComponent={
    isLoadingMore && <ActivityIndicator style={{ marginVertical: 20 }} />
  }
/>
```

Header — заголовок или баннер сверху.  
Empty — сообщение при отсутствии данных.  
Footer — лоадер или подвал при пагинации.

---

# 2️⃣ React Native Reanimated

Reanimated создаёт плавные анимации, которые работают на UI-потоке и не зависят от JavaScript.  
Используется для свайпов, переходов, bottom-sheet, анимации карточек.

Пример появления блока:

```tsx
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const opacity = useSharedValue(0);

useEffect(() => {
  opacity.value = withTiming(1, { duration: 500 });
}, []);

const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
}));

<Animated.View
  style={[{ width: 120, height: 120, backgroundColor: "tomato" }, animatedStyle]}
/>
```

---

# 3️⃣ Логика переключения Onboarding (index.tsx с 3 экранами)

Onboarding обычно состоит из нескольких шагов.  
Управление строится через состояние `index`, которое определяет, какой экран показать.

```tsx
const [index, setIndex] = useState(0);

return (
  <>
    {index === 0 && <Welcome onNext={() => setIndex(1)} />}
    {index === 1 && <Features onNext={() => setIndex(2)} />}
    {index === 2 && <Final onDone={finishOnboarding} />}
  </>
);
```

Каждый экран вызывает `onNext`, передвигая пользователя вперёд.

---

# 4️⃣ AsyncStorage: сохранение статуса onboarding

После завершения onboarding приложение сохраняет отметку, чтобы больше не показывать эти экраны.

```tsx
await AsyncStorage.setItem("onboarded", "true");
```

Проверка при старте:

```tsx
useEffect(() => {
  async function checkOnboarding() {
    const done = await AsyncStorage.getItem("onboarded");
    if (done === "true") {
      navigation.replace("Home");
    }
  }
  checkOnboarding();
}, []);
```

---

# 5️⃣ Tabs → screenOptions → sceneStyle → background

При работе с Expo Router можно задать общий фон для всех экранов внутри вкладок:

```tsx
<Tabs
  screenOptions={{
    sceneStyle: {
      backgroundColor: "red",
    },
  }}
>
  <Tabs.Screen name="index" />
  <Tabs.Screen name="settings" />
</Tabs>
```

Этим удобно задавать глобальный стиль: цвет, градиент, фоновые элементы.

---

# 6️⃣ expo-blur (эффекты размытия)

BlurView создаёт эффект «стекла», как на iOS.  
Используется для хедеров, таббара, карточек и модальных окон.

```tsx
import { BlurView } from "expo-blur";

<BlurView
  intensity={40}
  tint="dark"
  style={{
    height: 80,
    width: "100%",
    position: "absolute",
    bottom: 0,
  }}
>
  <Text style={{ color: "white" }}>Blur Footer</Text>
</BlurView>
```

---

# 7️⃣ npx expo run:ios -d

Команда запускает нативную сборку на реальном устройстве iPhone:

```
npx expo run:ios -d
```

Используется для реального тестирования, нативных модулей, производительности и подготовки к TestFlight.

---

# 📘 Использование React Hook Form + Zod в React Native (Expo)

## 📦 1. Установка нужных пакетов

В Expo (React Native) требуется установить:

```bash
npm install react-hook-form zod @hookform/resolvers
```

или

```bash
yarn add react-hook-form zod @hookform/resolvers
```

`@hookform/resolvers` — позволяет соединить Zod и React Hook Form.

---

# 🧩 2. Создание Zod-схемы

Zod используется для описания формы и валидации данных.

Пример схемы:

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Введите корректный email"),
  password: z
    .string()
    .min(6, "Пароль должен быть минимум 6 символов"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
```

---

# 🔧 3. Настройка React Hook Form + Zod Resolver

```ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "./schema";

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<LoginSchemaType>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});
```

---

# 📝 4. Полный компонент с TextInput и контроллером

> В React Native нельзя прямо привязывать TextInput к RHF как в web, поэтому используется `Controller`.

Пример компонента (Expo):

```tsx
import React from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log("Отправка:", data);
  };

  return (
    <View style={styles.container}>
      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
          </>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={value}
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <Button title="Войти" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  error: { color: "red", marginTop: 4 },
});
```

---

# 🎛 5. Как отключить валидацию при вводе (опционально)

По умолчанию R HF валидирует при `onChange`. Можно изменить режим:

```ts
useForm({
  resolver: zodResolver(loginSchema),
  mode: "onSubmit",
});
```

Варианты:

- `onBlur`
    
- `onChange`
    
- `onSubmit`
    
- `onTouched`
    

---

# 🧪 6. Как работать с Reset и Watch

```ts
const { reset, watch } = useForm(...);

const emailValue = watch("email");

// Сброс формы:
reset();
```

---

# 📚 7. Добавление типизации инпутов

Zod + TypeScript = строго типизированные данные.

```ts
type FormData = z.infer<typeof loginSchema>;
```

Теперь `onSubmit` гарантированно получает валидные данные.

---

# 📱 8. Интеграция с UI-библиотеками (Native Base, Paper, Tamagui)

React Hook Form хорошо работает с любыми UI-компонентами:

```tsx
<Controller
  control={control}
  name="email"
  render={({ field }) => (
    <Input {...field} placeholder="Email" />
  )}
/>
```

---
