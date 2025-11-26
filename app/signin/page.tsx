import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Image } from "expo-image";
import {
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";


import { Link } from "expo-router";
import SigninForm from "@/components/screens/auth-form/signin/signin-form";

export default function Signin() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { width } = useWindowDimensions();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ ...styles.logo, width: width - 50, height: width - 50 }}
          />
          <View
            style={{
              ...styles.circle,
              width: width + 90,
              height: width + 90,
            }}
          />
        </View>
        <View style={styles.bottomContent}>
            <SigninForm />
        </View>
        <Text style={styles.footer}>
          {`Don't have an account?`} 
          <Link href="/signup/page" style={styles.footerLink}>
            Sign up
          </Link>
        </Text>
      </View>
      <StatusBar barStyle={"light-content"} />
    </>
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        theme === "dark"
          ? layoutTheme.colors.background.dark
          : layoutTheme.colors.background.light,
    },
    logo: {
      resizeMode: "contain",
      zIndex: 10,
    },
    topContent: {
      position: "relative",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: layoutTheme.colors.background.dark,
    },
    circle: {
      position: "absolute",
      bottom: -100,
      zIndex: 0,
      borderRadius: 200,
      backgroundColor: layoutTheme.colors.background.dark,
    },
    bottomContent: {
      flex: 1,
      marginTop: -50,
      alignItems: "center",
    },
    footer: {
        textAlign: "center",
        marginBottom: 56,
        fontFamily: layoutTheme.fonts.poppins.semiBold,
        color: layoutTheme.colors.text.gray,
    },
    footerLink: {
        color: layoutTheme.colors.text.link,
    },
  });
