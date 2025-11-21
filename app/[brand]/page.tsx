import BrandLogo from "@/components/screens/home/components/brand-logo";
import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { carModels } from "@/data/car-models";
import CarDetailCard from "@/components/ui/car-details-card";

export default function BrandPage() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { brand } = useLocalSearchParams();

  const models = carModels.filter((item) => item.brandSlug === brand);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Brands</Text>
          <BrandLogo />
        </View>
        <ScrollView
          style={styles.modelsContainer}
          contentContainerStyle={styles.modelsContainerContent}
        >
          {models &&
            models.map((model) => {
              return <CarDetailCard key={model.id} model={model} />;
            })}
        </ScrollView>
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
      paddingHorizontal: 30,
      backgroundColor:
        theme === "dark"
          ? layoutTheme.colors.background.dark
          : layoutTheme.colors.background.light,
    },
    header: {
      position: "relative",
    },
    title: {
      fontSize: 20,
      fontFamily: layoutTheme.fonts.poppins.bold,
    },
    modelsContainer: {
      flex: 1,
      paddingVertical: 50,
    },
    modelsContainerContent: {
      gap: 20,
    },
  });
