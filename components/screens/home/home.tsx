import Button from "@/components/ui/button";
import { layoutTheme } from "@/constants/theme";
import { carModels } from "@/data/car-models";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import CarCatalog from "../car-catalog/car.catalog";
import BrandLogo from "./components/brand-logo";

export default function Home() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { width } = useWindowDimensions();

  const handleTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a test notification",
      },
      trigger: null, // null trigger means immediate notification
    });
  };

  return (
    <>
      <View
        style={{
          ...styles.container,
          width: width,
        }}
      >
        <View style={styles.content}>
          <View style={{ ...styles.searchInput, width: width - 50 }}>
            <Ionicons
              name="search"
              size={20}
              color="#888"
              style={{
                position: "absolute",
                left: 10,
                zIndex: 10,
              }}
            />

            <TextInput
              placeholder="Search"
              placeholderTextColor="#888"
              style={{
                paddingLeft: 20,
              }}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.brandLogoContainer}>
            <BrandLogo />
          </View>

          <View style={styles.details}>
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTitle}>Hot deals</Text>
              <Link
                href={`/${carModels[0]?.brandSlug}/page`}
                style={styles.detailsLink}
              >
                View all...
              </Link>
            </View>
            {/* <CarDetailCard /> */}
            <CarCatalog />
          </View>
        </View>
      </View>

      <StatusBar barStyle={"light-content"} />
    </>
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: layoutTheme.fonts.poppins.regular,
      backgroundColor:
        theme === "dark"
          ? layoutTheme.colors.background.dark
          : layoutTheme.colors.background.dark,
    },
    content: {
      position: "relative",
      flex: 1,
      width: "100%",
      justifyContent: "center",
      height: 50,
      alignItems: "center",
    },
    header: {
      width: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    searchInput: {
      position: "relative",
      justifyContent: "center",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      fontSize: 18,
    },
    brandLogoContainer: {
      position: "absolute",
      top: -50,
      left: 0,
    },
    details: {
      backgroundColor: "#fff",
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 30,
      paddingTop: 40,
    },
    detailsHeader: {
      marginBottom: 20,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    detailsTitle: {
      fontFamily: layoutTheme.fonts.poppins.medium,
      fontSize: 20,
    },
    detailsLink: {
      fontFamily: layoutTheme.fonts.poppins.medium,
      fontSize: 20,
      color: layoutTheme.colors.primary[500],
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color:
        theme === "dark"
          ? layoutTheme.colors.text.inverse
          : layoutTheme.colors.text.primary,
      fontFamily: layoutTheme.fonts.poppins.bold,
    },
  });
