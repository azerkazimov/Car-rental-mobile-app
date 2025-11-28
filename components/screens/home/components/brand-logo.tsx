import { layoutTheme } from "@/constants/theme";
import { carLogos } from "@/data/car-logo";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export default function BrandLogo({ selected }: { selected?: string }) {
  const data = carLogos;
  const listRef = useRef<FlatList>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    selected || null
  );
  const onSelectBrand = (brand: string, index: number) => {
    setSelectedBrand(brand);
    listRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          const isActive = selectedBrand === item.slug;
          return (
            <TouchableOpacity onPress={() => onSelectBrand(item.slug, index)}>
              <Link href={`/${item.slug}/page`}>
                <View
                  style={[styles.brandLogo, isActive && styles.activeBrandLogo]}
                >
                  <Image
                    source={{ uri: item.image.source }}
                    style={styles.brandLogoImage}
                  />
                </View>
              </Link>
            </TouchableOpacity>
          );
        }}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
        initialScrollIndex={data.findIndex((item) => item.slug === selected)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  activeBrandLogo: {
    backgroundColor: layoutTheme.colors.primary[500],
  },
  brandLogoImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
