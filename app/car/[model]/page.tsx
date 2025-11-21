import { carModels } from "@/data/car-models";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarPage() {
  const { model } = useLocalSearchParams();
  const modelData = carModels.find((item) => item.model === model);
  console.log(modelData);
  return (
    <SafeAreaView>
      <Text>{model}</Text>
      <Image source={modelData?.image} style={styles.image} />
      <Text>{modelData?.pricePerDay}</Text>
      <Text>{modelData?.brand}</Text>
      <Text>{modelData?.model}</Text>

      <Text>{modelData?.fuelType}</Text>
      <Text>{modelData?.transmission}</Text>
      <Text>{modelData?.seats}</Text>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});