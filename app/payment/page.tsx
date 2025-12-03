import PaymentCard from "@/components/screens/payment/payment-card";
import PaymentForm from "@/components/screens/payment/payment-form";
import Button from "@/components/ui/button";
import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useCardStore } from "@/store/card-store";
import { ThemeType } from "@/types/theme-types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

type PaymentMethod = "mastercard" | "visa" | "paypal";

export default function PaymentPage() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { cardNumber, expiry, cvv } = useCardStore();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>();

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedPayment(method);
  };

  const handlePayNow = () => {
    if (selectedPayment && cardNumber && expiry && cvv) {
      router.push("/payment/confirm/page");
    } else {
      Alert.alert("Please select a payment method and fill in all the fields");
    }
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
        <Text style={styles.headerText}>Payment</Text>
      </View>
      <View style={styles.formContainer}>
        <ScrollView
          style={styles.formWrapper}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardContainer}>
            {/* MasterCard */}
            <PaymentCard
              isSelected={selectedPayment === "mastercard"}
              onPress={() => handlePaymentSelect("mastercard")}
              logo={require("@/assets/images/card-mastercard.png")}
              styles={styles}
            >
              {selectedPayment === "mastercard" && <PaymentForm />}
            </PaymentCard>

            {/* Visa */}
            <PaymentCard
              isSelected={selectedPayment === "visa"}
              onPress={() => handlePaymentSelect("visa")}
              logo={require("@/assets/images/card-visa.png")}
              styles={styles}
            >
              {selectedPayment === "visa" && <PaymentForm />}
            </PaymentCard>

            {/* PayPal */}
            <PaymentCard
              isSelected={selectedPayment === "paypal"}
              onPress={() => handlePaymentSelect("paypal")}
              logo={require("@/assets/images/card-paypal.png")}
              styles={styles}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button onPress={handlePayNow}>
            <Text style={styles.buttonText}>Pay now</Text>
          </Button>
        </View>
      </View>
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
      left: "10%",
    },
    headerText: {
      color: layoutTheme.colors.text.inverse,
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: layoutTheme.fonts.poppins.bold,
    },
    formContainer: {
      flex: 1,
      backgroundColor: layoutTheme.colors.background.black,
    },
    formWrapper: {
      flex: 1,
      borderTopLeftRadius: 55,
      borderTopRightRadius: 55,
      paddingTop: 56,
      paddingHorizontal: 33,
      paddingBottom: 20,
      backgroundColor: layoutTheme.colors.background.light,
    },
    cardContainer: {
      gap: 16,
      paddingBottom: 20,
    },
    paymentCardWrapper: {
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 8,
      backgroundColor: "white",
      overflow: "hidden",
    },
    cardImageContainer: {
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardImage: {
      width: 75,
      height: 45,
      resizeMode: "contain",
    },
    logoTextContainer: {
      flex: 1,
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
