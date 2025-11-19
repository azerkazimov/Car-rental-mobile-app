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
    height: 100,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandLogoImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
