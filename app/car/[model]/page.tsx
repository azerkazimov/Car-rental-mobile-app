import { layoutTheme } from "@/constants/theme";
import { carModels } from "@/data/car-models";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarPage() {
  const { model } = useLocalSearchParams();
  const router = useRouter();
  const modelData = carModels.find((item) => item.model === model);
  console.log(modelData);

  if (!modelData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Car not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Car Image */}
      <View style={styles.imageContainer}>
        <Image
          source={modelData.image}
          style={styles.image}
          contentFit="contain"
        />
      </View>

      {/* Details Card */}
      <View style={styles.detailsCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.carName}>
                {modelData.brand} {modelData.model}
              </Text>
              <Text style={styles.pricePerDay}>
                ${modelData.pricePerDay.toFixed(2)} per day
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons
                name="star"
                size={24}
                color={layoutTheme.colors.primary[500]}
              />
              <Text style={styles.rating}>4.8</Text>
            </View>
          </View>

          {/* Features Section */}
          <Text style={styles.featuresTitle}>Features</Text>

          <View style={styles.featuresGrid}>
            <View style={styles.featureBox}>
              <Ionicons name="car-sport" size={32} color="#fff" />
              <Text style={styles.featureLabel}>Vehicle Type</Text>
              <Text style={styles.featureValue}>{modelData.type}</Text>
            </View>
            <View style={styles.featureBox}>
              <Ionicons name="speedometer" size={32} color="#fff" />
              <Text style={styles.featureLabel}>Transmission</Text>
              <Text style={styles.featureValue}>{modelData.transmission}</Text>
            </View>

            <View style={styles.featureBox}>
              <Ionicons name="people" size={32} color="#fff" />
              <Text style={styles.featureLabel}>Seats</Text>
              <Text style={styles.featureValue}>{modelData.seats}</Text>
            </View>

            <View style={styles.featureBox}>
              <Ionicons name="ellipse" size={32} color="#fff" />
              <Text style={styles.featureLabel}>Fuel Type</Text>
              <Text style={styles.featureValue}>{modelData.fuelType}</Text>
            </View>
            <View style={styles.featureBox}>
              <Ionicons name="bluetooth" size={32} color="#fff" />
              <Text style={styles.featureLabel}>Bluetooth</Text>
              <Text style={styles.featureValue}>4.0</Text>
            </View>
            <View style={styles.featureBox}>
              <Ionicons name="git-network" size={32} color="#fff" />
              <Text style={styles.featureLabel}>Sensor</Text>
              <Text style={styles.featureValue}>Available</Text>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <Text style={styles.totalPrice}>
              ${modelData.pricePerDay.toFixed(2)}
            </Text>
            <Link href="/payment/page" style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book now</Text>
            </Link>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: "35%",
    width: "100%",
    paddingHorizontal: "5%",
    paddingTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    fontSize: 18,
    fontFamily: layoutTheme.fonts.poppins.medium,
    textAlign: "center",
    marginTop: 50,
  },
  detailsCard: {
    flex: 1,
    backgroundColor: layoutTheme.colors.background.black,
    borderTopLeftRadius: 54,
    borderTopRightRadius: 54,
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  carName: {
    fontSize: 24,
    fontFamily: layoutTheme.fonts.poppins.bold,
    color: "#fff",
  },
  pricePerDay: {
    fontSize: 14,
    fontFamily: layoutTheme.fonts.poppins.regular,
    color: "#999",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rating: {
    fontSize: 18,
    fontFamily: layoutTheme.fonts.poppins.semiBold,
    color: "#fff",
  },
  featuresTitle: {
    fontSize: 22,
    fontFamily: layoutTheme.fonts.poppins.bold,
    color: "#fff",
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  featureBox: {
    width: "31%",
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  featureLabel: {
    fontSize: 11,
    fontFamily: layoutTheme.fonts.poppins.semiBold,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  featureValue: {
    fontSize: 14,
    fontFamily: layoutTheme.fonts.poppins.bold,
    color: "#fff",
    marginTop: 4,
    textAlign: "center",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  totalPrice: {
    fontSize: 26,
    fontFamily: layoutTheme.fonts.poppins.bold,
    color: "#fff",
  },
  bookButton: {
    backgroundColor: layoutTheme.colors.primary[500],
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 16,
  },
  bookButtonText: {
    fontSize: 18,
    fontFamily: layoutTheme.fonts.poppins.bold,
    color: layoutTheme.colors.text.inverse,
  },
});
