import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import { ThemeType } from "@/types/theme-types";
import { layoutTheme } from "@/constants/theme";

export default function Layout() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          headerShown: false,
          title: "Notification",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          headerShown: false,
          title: "Location",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor:
        theme === "dark"
          ? layoutTheme.colors.background.dark
          : layoutTheme.colors.background.primary,
    },

    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        theme === "dark"
          ? layoutTheme.colors.background.dark
          : layoutTheme.colors.background.primary,
    },
  });
