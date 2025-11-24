import BrandLogo from "@/components/screens/home/components/brand-logo";
import CarDetailCard from "@/components/ui/car-details-card";
import { layoutTheme } from "@/constants/theme";
import { carModels } from "@/data/car-models";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BrandPage() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { brand } = useLocalSearchParams();
  const [reflesh, setReflesh] = useState(false);


  const models = carModels.filter((item) => item.brandSlug === brand);
  // const models = [];
  
  const handleReflesh = () => {
    setReflesh(true);

    setTimeout(() => {
      setReflesh(false);
    }, 1000);
  };


  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Brands</Text>
          <BrandLogo />
        </View>
        {/* <ScrollView
          style={styles.modelsContainer}
          contentContainerStyle={styles.modelsContainerContent}
        >
          {models &&
            models.map((model) => {
              return <CarDetailCard key={model.id} model={model} />;
            })}
        </ScrollView> */}

        <FlatList
          data={models}
          renderItem={({ item }) => <CarDetailCard model={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No items found</Text>}
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
