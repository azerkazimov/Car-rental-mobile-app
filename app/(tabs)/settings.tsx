import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const router = useRouter();

  const settingsOptions = [
    {
      id: 1,
      title: "Personal Data",
      icon: "person-outline" as const,
      route: "/personal-data/page",
    },
    {
      id: 2,
      title: "Driving Licence",
      icon: "card-outline" as const,
      route: "/driving-licence/page",
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        {/* Settings Options */}
        <View style={styles.optionsContainer}>
          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={() => router.push(option.route as any)}
            >
              <View style={styles.optionLeft}>
                <Ionicons
                  name={option.icon}
                  size={24}
                  color={layoutTheme.colors.text.primary}
                />
                <Text style={styles.optionText}>{option.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={layoutTheme.colors.text.tertiary}
              />
            </TouchableOpacity>
          ))}
        </View>
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
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    title: {
      fontSize: 28,
      fontFamily: layoutTheme.fonts.poppins.bold,
      color: layoutTheme.colors.text.primary,
      marginBottom: 24,
    },
    optionsContainer: {
      gap: 12,
    },
    optionItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: layoutTheme.colors.background.light,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: layoutTheme.colors.border.muted,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    optionLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    optionText: {
      fontSize: 16,
      fontFamily: layoutTheme.fonts.poppins.medium,
      color: layoutTheme.colors.text.primary,
    },
  });
