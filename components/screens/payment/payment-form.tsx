import CustomCheckbox from "@/components/ui/custom-checkbox";
import { layoutTheme } from "@/constants/theme";
import { useCardStore } from "@/store/card-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  paymentFormSchema,
  PaymentFormSchema,
} from "./payment-form.schema";

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

  const {
    control,
    formState: { errors },
    setValue,
  } = useForm<PaymentFormSchema>({
    resolver: zodResolver(paymentFormSchema),
    mode: "onChange",
    defaultValues: {
      cardNumber,
      cardHolder,
      expiry,
      cvv,
    },
  });

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    setCardNumber(formatted);
    setValue("cardNumber", formatted, { shouldValidate: true });
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    setExpiry(formatted);
    setValue("expiry", formatted, { shouldValidate: true });
  };

  const handleCardHolderChange = (text: string) => {
    setCardHolder(text);
    setValue("cardHolder", text, { shouldValidate: true });
  };

  const handleCvvChange = (text: string) => {
    setCvv(text);
    setValue("cvv", text, { shouldValidate: true });
  };

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="cardNumber"
        render={({ field: { onBlur } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                errors.cardNumber && styles.inputError,
              ]}
              placeholder="Card Number"
              placeholderTextColor="#D1D1D1"
              value={cardNumber}
              onChangeText={formatCardNumber}
              onBlur={onBlur}
              keyboardType="numeric"
              maxLength={19}
            />
            {errors.cardNumber && (
              <Text style={styles.errorText}>
                {errors.cardNumber.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="cardHolder"
        render={({ field: { onBlur } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                errors.cardHolder && styles.inputError,
              ]}
              placeholder="Card Holder's Name"
              placeholderTextColor="#D1D1D1"
              value={cardHolder}
              onChangeText={handleCardHolderChange}
              onBlur={onBlur}
            />
            {errors.cardHolder && (
              <Text style={styles.errorText}>
                {errors.cardHolder.message}
              </Text>
            )}
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <Controller
          control={control}
          name="expiry"
          render={({ field: { onBlur } }) => (
            <View style={[styles.inputWrapper, styles.inputHalf]}>
              <TextInput
                style={[
                  styles.input,
                  errors.expiry && styles.inputError,
                ]}
                placeholder="MM/YY"
                placeholderTextColor="#D1D1D1"
                value={expiry}
                onChangeText={formatExpiry}
                onBlur={onBlur}
                keyboardType="numeric"
                maxLength={5}
              />
              {errors.expiry && (
                <Text style={styles.errorText}>
                  {errors.expiry.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="cvv"
          render={({ field: { onBlur } }) => (
            <View style={[styles.inputWrapper, styles.inputHalf]}>
              <TextInput
                style={[
                  styles.input,
                  errors.cvv && styles.inputError,
                ]}
                placeholder="CVV"
                placeholderTextColor="#D1D1D1"
                value={cvv}
                onChangeText={handleCvvChange}
                onBlur={onBlur}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
              {errors.cvv && (
                <Text style={styles.errorText}>
                  {errors.cvv.message}
                </Text>
              )}
            </View>
          )}
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
  inputWrapper: {
    marginBottom: 0,
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
  inputError: {
    borderColor: layoutTheme.colors.error?.[500] || "#DC2626",
  },
  errorText: {
    color: layoutTheme.colors.error?.[500] || "#DC2626",
    fontSize: 12,
    fontFamily: layoutTheme.fonts.poppins.regular,
    marginTop: 4,
    marginLeft: 4,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
});
