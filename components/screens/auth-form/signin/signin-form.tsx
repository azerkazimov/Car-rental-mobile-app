import Button from "@/components/ui/button";
import { layoutTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { loginSchema, LoginSchemaType } from "./signin-form.schema";
import { useAuthStore } from "@/store/auth-store";

export default function SigninForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const user = await AsyncStorage.getItem("user");

      if (!user) {
        Alert.alert("Error", "No user found. Please sign up first.");
        return;
      }

      const userData = JSON.parse(user);

      if (
        userData.email === data.email &&
        userData.password === data.password
      ) {
        console.log("User logged in", userData);
        AsyncStorage.setItem("isAuthenticated", "true");
        setUser(userData);
        router.replace("/(tabs)");
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      Alert.alert(
        "Error",
        "An error occurred during sign in. Please try again."
      );
    }
  };

  return (
    <View style={{ ...styles.container, width: width - 50 }}>
      <Text style={styles.title}> Sign in to your account</Text>

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
          </>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={value}
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>Sign in</Button>
      <Text style={styles.orText}>or</Text>
      <Button variant="secondary" onPress={handleSubmit(onSubmit)}>
        <Ionicons
          name="logo-google"
          size={24}
          color={layoutTheme.colors.background.primary}
        />
        Sign up with Google
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    borderRadius: 10,
    backgroundColor: layoutTheme.colors.background.light,
    boxShadow: "0 2px 1px 0 rgba(0, 0, 0, 0.25)",
  },
  title: {
    fontSize: 24,
    fontFamily: layoutTheme.fonts.poppins.semiBold,
    color: layoutTheme.colors.text.gray,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  error: { color: "red", marginTop: 4 },
  orText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: layoutTheme.fonts.poppins.regular,
    color: layoutTheme.colors.text.gray,
  },
});
