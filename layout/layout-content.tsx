import { useTheme } from "@/hooks/use-theme";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar, Text } from "react-native";


SplashScreen.preventAutoHideAsync();

export default function LayoutContent() {
  const { colorScheme } = useTheme();
  const [loaded, error] = useFonts({
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "Poppins-Black": require("../assets/fonts/poppins/Poppins-Black.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../assets/fonts/poppins/Poppins-Light.ttf"),
    "Poppins-Thin": require("../assets/fonts/poppins/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (error) {
    return <Text>Error loading fonts</Text>;
  }
  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup/page" options={{ headerShown: false }} />
        <Stack.Screen name="signin/page" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="[brand]/page" options={{ headerShown: false }} />
        <Stack.Screen name="car/[model]/page" options={{ headerShown: false }} />
        <Stack.Screen name="payment/page" options={{ headerShown: false }} />
        <Stack.Screen name="driving-licence/page" options={{ headerShown: false }} />
        <Stack.Screen name="personal-data/page" options={{ headerShown: false }} />
        <Stack.Screen name="payment/confirm/page" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
