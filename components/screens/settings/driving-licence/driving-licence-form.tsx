import Button from "@/components/ui/button";
import { layoutTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  drivingLicenceSchema,
  DrivingLicenceSchemaType,
} from "./driving-licence-form.schema";

export default function DrivingLicenceForm() {
  const router = useRouter();
  const [licenceImage, setLicenceImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DrivingLicenceSchemaType>({
    resolver: zodResolver(drivingLicenceSchema),
    defaultValues: {
      licenceNumber: "",
      expiryDate: "",
      licencePhoto: "",
    },
  });

  // Format date input as DD/MM/YYYY
  const formatDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2);
      if (cleaned.length >= 2) {
        formatted += "/" + cleaned.slice(2, 4);
      }
      if (cleaned.length >= 4) {
        formatted += "/" + cleaned.slice(4, 8);
      }
    }
    return formatted;
  };

  // Pick image from gallery or camera
  const pickImage = async () => {
    // Request permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Permission to access camera roll is required!"
      );
      return;
    }

    // Show action sheet for camera or gallery
    Alert.alert(
      "Upload Licence Photo",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            const cameraPermission =
              await ImagePicker.requestCameraPermissionsAsync();
            if (cameraPermission.granted) {
              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });

              if (!result.canceled) {
                setLicenceImage(result.assets[0].uri);
                setValue("licencePhoto", result.assets[0].uri);
              }
            }
          },
        },
        {
          text: "Choose from Gallery",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setLicenceImage(result.assets[0].uri);
              setValue("licencePhoto", result.assets[0].uri);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const onSubmit = async (data: DrivingLicenceSchemaType) => {
    try {
      setIsLoading(true);

      // Validate that photo is uploaded
      if (!licenceImage) {
        Alert.alert("Error", "Please upload your licence photo");
        setIsLoading(false);
        return;
      }

      // Save to AsyncStorage
      await AsyncStorage.setItem("drivingLicence", JSON.stringify(data));

      Alert.alert(
        "Success",
        "Driving licence information saved successfully!",
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
      console.error("Error saving driving licence:", error);
      Alert.alert(
        "Error",
        "Failed to save driving licence information. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getDrivingLicence = async ()=>{
    const drivingLicence = JSON.parse(await AsyncStorage.getItem("drivingLicence") || "{}");
    if(drivingLicence){
      setValue("licenceNumber", drivingLicence.licenceNumber || "");
      setValue("expiryDate", drivingLicence.expiryDate || "");
      setValue("licencePhoto", drivingLicence.licencePhoto || null);
    }
  }
  useEffect(()=>{
    getDrivingLicence();
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

            {/* Driving Licence Section */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Driving Licence</Text>

              {/* Licence Number Input */}
              <Controller
                control={control}
                name="licenceNumber"
                render={({ field: { value, onChange, onBlur } }) => (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Licence Number"
                      placeholderTextColor="#D1D1D1"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                    {errors.licenceNumber && (
                      <Text style={styles.errorText}>
                        {errors.licenceNumber.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Expiry Date Input */}
              <Controller
                control={control}
                name="expiryDate"
                render={({ field: { value, onChange, onBlur } }) => (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Expiry Date"
                      placeholderTextColor="#D1D1D1"
                      value={value}
                      onChangeText={(text) => onChange(formatDate(text))}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                    {errors.expiryDate && (
                      <Text style={styles.errorText}>
                        {errors.expiryDate.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Upload Photo Section */}
            <View style={styles.uploadSection}>
              <Text style={styles.uploadTitle}>Upload Your Licence Photo</Text>

              <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
                {licenceImage || watch("licencePhoto") ? (
                  <Image
                    source={{ uri: licenceImage || watch("licencePhoto") || "" }}
                    style={styles.uploadedImage}
                  />
                ) : (
                  <View style={styles.cameraIconContainer}>
                    <Ionicons name="camera" size={60} color="#C4C4C4" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Check out Button */}
            <View style={styles.buttonContainer}>
              <Button onPress={handleSubmit(onSubmit)}>
                {isLoading ? "Saving..." : "Check out"}
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
