import CustomCheckbox from "@/components/ui/custom-checkbox";
import { layoutTheme } from "@/constants/theme";
import { useCardStore } from "@/store/card-store";
import { StyleSheet, TextInput, View } from "react-native";

export default function PaymentForm() {
  const {
    cardNumber,
    cardHolder,
    expiry,
    cvv,
    saveCardInfo,
    setCardNumber,
    setCardHolder,
    setExpiry,
    setCvv,
    setSaveCardInfo,
  } = useCardStore();

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    setCardNumber(formatted);
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4) + "/" + cleaned.slice(4, 6);
    }
    setExpiry(formatted);
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        placeholderTextColor="#D1D1D1"
        value={cardNumber}
        onChangeText={formatCardNumber}
        keyboardType="numeric"
        maxLength={19}
      />
      <TextInput
        style={styles.input}
        placeholder="Card Holder's Name"
        placeholderTextColor="#D1D1D1"
        value={cardHolder}
        onChangeText={setCardHolder}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="DD/MM/YY"
          placeholderTextColor="#D1D1D1"
          value={expiry}
          onChangeText={formatExpiry}
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="CVV"
          placeholderTextColor="#D1D1D1"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
        />
      </View>
      <CustomCheckbox
        checked={saveCardInfo}
        onPress={() => setSaveCardInfo(!saveCardInfo)}
        label="Save Card Information"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 16,
    fontSize: 14,
    color: "#333",
    backgroundColor: "white",
    fontFamily: layoutTheme.fonts.poppins.regular,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
});
