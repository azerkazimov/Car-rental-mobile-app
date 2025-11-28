import DrivingLicence from "@/components/screens/settings/driving-licence/driving-licence";
import PersonalData from "@/components/screens/settings/personal-data/personal-data";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { StatusBar, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <PersonalData />
        <DrivingLicence />
      </SafeAreaView>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
    </>
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
  });
