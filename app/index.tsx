import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function Index() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const router = useRouter();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/signin/page");
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
