import DrivingLicence from "@/components/screens/settings/driving-licence/driving-licence";
import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DrivingLicencePage() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={layoutTheme.colors.text.inverse} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Information</Text>
        </View>

        {/* Content */}
        <DrivingLicence />
      </View>
      <StatusBar
        barStyle="light-content"
        backgroundColor={layoutTheme.colors.background.black}
      />
    </>
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: layoutTheme.colors.background.black,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-end",
      paddingHorizontal: 20,
      paddingBottom: 30,
      backgroundColor: layoutTheme.colors.background.black,
      height: "15%"
    },
    backButton: {
      marginRight: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: layoutTheme.fonts.poppins.semiBold,
      color: layoutTheme.colors.text.inverse,
    },
  });

