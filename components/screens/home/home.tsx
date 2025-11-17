import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>w
    </SafeAreaView>
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "dark" ? layoutTheme.colors.background.dark : layoutTheme.colors.background.primary,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme === "dark" ? layoutTheme.colors.text.inverse : layoutTheme.colors.text.primary,
      fontFamily: layoutTheme.fonts.poppins.bold,
    },
  });
