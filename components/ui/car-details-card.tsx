import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function CarDetailCard() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.container}>
      <View style={styles.cardTitle}>
        <Text style={styles.textSilver}>AUDI</Text>
        <Text style={styles.text}>Q7</Text>
      </View>
      <Image
        source={require("../../assets/images/audi-q7.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.cardPrice}>
        <Text style={styles.text}>17$</Text>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor:
        theme === "dark"
          ? layoutTheme.colors.background.darkSecondary
          : layoutTheme.colors.background.silver,
      borderRadius: 10,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      width: "100%",
    },
    image: {
      width: "80%",
      height: 200,
    },
    cardTitle: {
      position: "absolute",
      top: 30,
      left: 30,
      gap: 10
    },
    cardPrice: {
      position: "absolute",
      top: 40,
      right: 30,
      
    },
    text: {
        fontFamily: layoutTheme.fonts.poppins.bold,
        fontSize: 14
    },
    textSilver: {
        fontFamily: layoutTheme.fonts.poppins.bold,
        color: layoutTheme.colors.secondary[200],
        fontSize: 14
    }
  });
};
