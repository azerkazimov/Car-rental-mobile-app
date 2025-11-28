import BrandLogo from "@/components/screens/home/components/brand-logo";
import CarDetailCard from "@/components/ui/car-details-card";
import { layoutTheme } from "@/constants/theme";
import { carModels } from "@/data/car-models";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BrandPage() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { brand } = useLocalSearchParams();
  const [reflesh, setReflesh] = useState(false);
  const router = useRouter();

  const models = brand
    ? carModels.filter((item) => item.brandSlug === brand)
    : carModels;

  const handleReflesh = () => {
    setReflesh(true);

    setTimeout(() => {
      setReflesh(false);
    }, 1000);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Brands</Text>
        </View>

        <FlatList
          data={models}
          renderItem={({ item }) => <CarDetailCard model={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No items found</Text>}
          ListHeaderComponent={
            <View style={styles.header}>
              <BrandLogo selected={brand as string} />
            </View>
          }
          refreshing={reflesh}
          onRefresh={handleReflesh}
          contentContainerStyle={styles.modelsContainerContent}
          showsVerticalScrollIndicator={false}
        />
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
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      marginBottom: 20,
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
