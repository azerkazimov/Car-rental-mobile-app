import Button from "@/components/ui/button";
import { layoutTheme } from "@/constants/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";

import {
    personalDataSchema,
    PersonalDataSchemaType,
} from "./personal-data.schema";

export default function PersonalDataForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalDataSchemaType>({
    resolver: zodResolver(personalDataSchema),
  });

  const onSubmit = async (data: PersonalDataSchemaType) => {
    try {
      setIsLoading(true);
     

      // Save to AsyncStorage
      await AsyncStorage.setItem("personalData", JSON.stringify(data));

      Alert.alert(
        "Success",
        "Personal data saved successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error saving personal data:", error);
      Alert.alert(
        "Error",
        "Failed to save driving licence information. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getPersonalData = async ()=>{
    const personalData = JSON.parse(await AsyncStorage.getItem("personalData") || "{}");
    if(personalData){
      setValue("fullName", personalData.fullName || "");
      setValue("phone", personalData.phone || "");
      setValue("address", personalData.address || "");
      setValue("idNumber", personalData.idNumber || "");
    }
  }

  useEffect(()=>{
    getPersonalData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Progress Bar */}
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>

            {/* Personal Data Section */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Personal Data</Text>

              {/* Full Name Input */}
              <Controller
                control={control}
                name="fullName"
                render={({ field: { value, onChange, onBlur } }) => (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Full Name"
                      placeholderTextColor="#D1D1D1"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onFocus={() => setValue("fullName", "")}
                    />
                    {errors.fullName && (
                      <Text style={styles.errorText}>
                        {errors.fullName.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Phone Input */}
              <Controller
                control={control}
                name="phone"
                render={({ field: { value, onChange, onBlur } }) => (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Phone number"
                      placeholderTextColor="#D1D1D1"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      maxLength={14}
                    />
                    {errors.phone && (
                      <Text style={styles.errorText}>
                        {errors.phone.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Adress Input */}
              <Controller
                control={control}
                name="address"
                render={({ field: { value, onChange, onBlur } }) => (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Address"
                      placeholderTextColor="#D1D1D1"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="default"
                    />
                    {errors.address && (
                      <Text style={styles.errorText}>
                        {errors.address.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* ID Input */}
              <Controller
                control={control}
                name="idNumber"
                render={({ field: { value, onChange, onBlur } }) => (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="National Identiy Number"
                      placeholderTextColor="#D1D1D1"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="default"
                    />
                    {errors.idNumber && (
                      <Text style={styles.errorText}>
                        {errors.idNumber.message}
                      </Text>
                    )}
                  </View>
                )}
              />


            </View>

            

            {/* Check out Button */}
            <View style={styles.buttonContainer}>
              <Button onPress={handleSubmit(onSubmit)}>
                {isLoading ? "Saving..." : "Next"}
              </Button>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: layoutTheme.colors.background.light,
    padding: 20,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#E5E5E5",
    borderRadius: 3,
    marginBottom: 30,
    overflow: "hidden",
  },
  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: layoutTheme.colors.primary[500],
    borderRadius: 3,
  },
  formSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: layoutTheme.fonts.poppins.bold,
    color: layoutTheme.colors.text.primary,
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontFamily: layoutTheme.fonts.poppins.regular,
    color: layoutTheme.colors.text.primary,
    backgroundColor: layoutTheme.colors.background.light,
  },
  errorText: {
    color: layoutTheme.colors.error[500],
    fontSize: 12,
    fontFamily: layoutTheme.fonts.poppins.regular,
    marginTop: 4,
    marginLeft: 4,
  },
  uploadSection: {
    marginBottom: 30,
  },
  uploadTitle: {
    fontSize: 18,
    fontFamily: layoutTheme.fonts.poppins.semiBold,
    color: layoutTheme.colors.text.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  uploadArea: {
    width: "100%",
    height: 200,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cameraIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: 20,
  },
});
