import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function Index() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const router = useRouter();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
        if (isAuthenticated === "true") {
          router.replace("/(tabs)");
        } else {
          router.replace("/signin/page");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        Alert.alert(
          "Error",
          "An error occurred during authentication. Please try again."
        );
      }
    };

    const timer = setTimeout(() => {
      checkAuthentication();
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.launchScreen}>
      <Image
        source={require("@/assets/images/logo-light.png")}
        style={{ ...styles.logo, width: width - 50, height: width - 50 }}
      />
      <Text style={styles.launchScreenText}>RCARENTAL</Text>
    </View>
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    launchScreen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: layoutTheme.colors.background.primary,
    },
    logo: {
      resizeMode: "contain",
    },
    launchScreenText: {
      fontSize: 40,
      fontFamily: layoutTheme.fonts.poppins.bold,
      color: layoutTheme.colors.text.inverse,
    },
  });
