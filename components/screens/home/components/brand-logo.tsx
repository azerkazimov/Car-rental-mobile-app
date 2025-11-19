import { layoutTheme } from "@/constants/theme";
import { carLogos } from "@/data/car-logo";
import { Image } from "expo-image";
import { FlatList, StyleSheet, View } from "react-native";

export default function BrandLogo() {
  const data = carLogos;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.brandLogo}>
            <Image source={{ uri: item.image.source }} style={styles.brandLogoImage} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -50,
    left: 0,
    zIndex: 1000,
  },
  listContainer: {
    gap: 12,
  },
  brandLogo: {
    width: 80,
    height: 80,
    backgroundColor: layoutTheme.colors.background.light,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.1)",
  },
  brandLogoImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
