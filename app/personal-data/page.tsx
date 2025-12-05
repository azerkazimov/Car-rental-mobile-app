import PersonalData from "@/components/screens/settings/personal-data/personal-data";
import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function PersonalDataPage() {
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
        <PersonalData />
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
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: layoutTheme.colors.background.black,
      height: "20%",
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

