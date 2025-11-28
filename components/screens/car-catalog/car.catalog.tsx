import CarDetailCard from "@/components/ui/car-details-card";
import { carModels } from "@/data/car-models";
import { useTheme } from "@/hooks/use-theme";
import { CarModel } from "@/types/car-model";
import { ThemeType } from "@/types/theme-types";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export default function CarCatalog() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);

  const shuffleArray = (array: CarModel[]) => {
    const shuffled = [...array].sort(()=>Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };

  const [cars, setCars] = useState(() => shuffleArray(carModels));
  const [reflesh, setReflesh] = useState(false);

  const onReflesh = async () => {
    setReflesh(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCars(shuffleArray(carModels));
    setReflesh(false);
  };

  return (
    <FlatList
      data={cars}
      renderItem={({ item }) => <CarDetailCard model={item as any} />}
      refreshing={reflesh}
      onRefresh={onReflesh}
      contentContainerStyle={styles.container}
    />
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      gap: 20,
    },
  });
