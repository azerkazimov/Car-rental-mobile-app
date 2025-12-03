import Button from "@/components/ui/button";
import CustomModal from "@/components/ui/modal";
import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useBookingStore } from "@/store/booking-store";
import { useModalStore } from "@/store/modal-store";
import { ThemeType } from "@/types/theme-types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SuccessPayment() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const {
    selectedCar,
    rentalDays,
    getTotalPrice,
    getServiceFee,
    getFinalTotal,
  } = useBookingStore();

  // Default values if no car is selected (for demo purposes)
  const carBrand = selectedCar?.brand || "BMW";
  const carModel = selectedCar?.model || "X5";
  const carImage =
    selectedCar?.image ||
    "https://alcf.s3.us-west-1.amazonaws.com/_custom/2024/bmw/x5/2024%20bmw%20x5%20m%20competition.png";
  const pricePerDay = selectedCar?.pricePerDay || 200;
  const days = rentalDays;
  const { setIsVisible } = useModalStore();

  const subtotal = getTotalPrice() || pricePerDay * days;
  const serviceFee = getServiceFee() || subtotal * 0.05;
  const total = getFinalTotal() || subtotal + serviceFee;

  const handleConfirmPayment = () => {
    setIsVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="white"
          onPress={() => router.back()}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Payment Successful</Text>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Success Icon */}
          <View style={styles.successIconContainer}>
            <Text style={styles.successTitle}>Payment Confirmation!</Text>
            <Text style={styles.successMessage}>
              Please confirm your payment.
            </Text>
          </View>

          {/* Car Details Card */}
          <View style={styles.carCard}>
            <View style={styles.carImageContainer}>
              <Image
                source={carImage}
                style={styles.carImage}
                contentFit="contain"
              />
            </View>
            <View style={styles.carDetails}>
              <Text style={styles.carName}>
                {carBrand} {carModel}
              </Text>
              <Text style={styles.carType}>
                {selectedCar?.type || "Luxury SUV"}
              </Text>
            </View>
          </View>

          {/* Order Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Price per day</Text>
              <Text style={styles.summaryValue}>${pricePerDay.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Number of days</Text>
              <Text style={styles.summaryValue}>
                {days} {days === 1 ? "day" : "days"}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee (5%)</Text>
              <Text style={styles.summaryValueHighlight}>
                +${serviceFee.toFixed(2)}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Payment Method Info */}
          <View style={styles.paymentInfoCard}>
            <View style={styles.paymentInfoRow}>
              <Ionicons
                name="card"
                size={24}
                color={layoutTheme.colors.primary[500]}
              />
              <View style={styles.paymentInfoText}>
                <Text style={styles.paymentInfoLabel}>Payment Method</Text>
                <Text style={styles.paymentInfoValue}>**** **** **** 1234</Text>
              </View>
            </View>

            <View style={styles.paymentInfoRow}>
              <Ionicons
                name="calendar"
                size={24}
                color={layoutTheme.colors.primary[500]}
              />
              <View style={styles.paymentInfoText}>
                <Text style={styles.paymentInfoLabel}>Booking Date</Text>
                <Text style={styles.paymentInfoValue}>
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <Button onPress={handleConfirmPayment}>
            <Text style={styles.buttonText}>Confirm Payment</Text>
          </Button>
        </View>
      </View>
      <CustomModal icon="shield-checkmark-outline" text="Payment confirmed successfully" />
    </View>
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flex: 1,
      flexDirection: "row",
      maxHeight: "20%",
      backgroundColor: layoutTheme.colors.background.black,
      justifyContent: "center",
      alignItems: "center",
    },
    headerIcon: {
      position: "absolute",
      left: "5%",
    },
    headerText: {
      color: layoutTheme.colors.text.inverse,
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: layoutTheme.fonts.poppins.bold,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: layoutTheme.colors.background.black,
    },
    scrollView: {
      flex: 1,
      borderTopLeftRadius: 55,
      borderTopRightRadius: 55,
      backgroundColor: layoutTheme.colors.background.light,
    },
    scrollContent: {
      paddingTop: 40,
      paddingHorizontal: 33,
      paddingBottom: 20,
    },
    successIconContainer: {
      alignItems: "center",
      marginBottom: 30,
    },
    successTitle: {
      fontSize: 22,
      fontWeight: "bold",
      fontFamily: layoutTheme.fonts.poppins.bold,
      color: layoutTheme.colors.text.primary,
      marginBottom: 8,
    },
    successMessage: {
      fontSize: 16,
      fontFamily: layoutTheme.fonts.poppins.regular,
      color: layoutTheme.colors.text.secondary,
      textAlign: "center",
    },
    carCard: {
      backgroundColor: "white",
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    carImageContainer: {
      width: "100%",
      height: 150,
      marginBottom: 16,
    },
    carImage: {
      width: "100%",
      height: "100%",
    },
    carDetails: {
      alignItems: "center",
    },
    carName: {
      fontSize: 22,
      fontWeight: "bold",
      fontFamily: layoutTheme.fonts.poppins.bold,
      color: layoutTheme.colors.text.primary,
      marginBottom: 4,
    },
    carType: {
      fontSize: 14,
      fontFamily: layoutTheme.fonts.poppins.regular,
      color: layoutTheme.colors.text.secondary,
    },
    summaryCard: {
      backgroundColor: "white",
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    summaryTitle: {
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: layoutTheme.fonts.poppins.bold,
      color: layoutTheme.colors.text.primary,
      marginBottom: 16,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    summaryLabel: {
      fontSize: 16,
      fontFamily: layoutTheme.fonts.poppins.regular,
      color: layoutTheme.colors.text.secondary,
    },
    summaryValue: {
      fontSize: 16,
      fontFamily: layoutTheme.fonts.poppins.semiBold,
      color: layoutTheme.colors.text.primary,
    },
    summaryValueHighlight: {
      fontSize: 16,
      fontFamily: layoutTheme.fonts.poppins.semiBold,
      color: layoutTheme.colors.primary[500],
    },
    divider: {
      height: 1,
      backgroundColor: "#E0E0E0",
      marginVertical: 12,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: layoutTheme.fonts.poppins.bold,
      color: layoutTheme.colors.text.primary,
    },
    totalValue: {
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: layoutTheme.fonts.poppins.bold,
      color: layoutTheme.colors.primary[500],
    },
    paymentInfoCard: {
      backgroundColor: "white",
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    paymentInfoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    paymentInfoText: {
      marginLeft: 16,
      flex: 1,
    },
    paymentInfoLabel: {
      fontSize: 14,
      fontFamily: layoutTheme.fonts.poppins.regular,
      color: layoutTheme.colors.text.secondary,
      marginBottom: 4,
    },
    paymentInfoValue: {
      fontSize: 16,
      fontFamily: layoutTheme.fonts.poppins.semiBold,
      color: layoutTheme.colors.text.primary,
    },
    buttonContainer: {
      paddingHorizontal: 33,
      paddingBottom: 20,
      paddingTop: 10,
      backgroundColor: layoutTheme.colors.background.light,
    },
    buttonText: {
      color: layoutTheme.colors.text.inverse,
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: layoutTheme.fonts.poppins.bold,
    },
  });
