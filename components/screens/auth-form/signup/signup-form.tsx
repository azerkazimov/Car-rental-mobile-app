import Button from "@/components/ui/button";
import { layoutTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { registerSchema, RegisterSchemaType } from "./signup-form.schema";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function SignupForm() {
  const router = useRouter();

  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchemaType) => {
    console.log("Submission:", data);
    AsyncStorage.setItem("user", JSON.stringify(data));


    router.replace("/signin/page");
  };

  return (
    <View style={{ ...styles.container, width: width - 50 }}>
      <Text style={styles.title}> Sign up to join</Text>

      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name?.message}</Text>
            )}
          </>
        )}
      />

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

      <Button onPress={handleSubmit(onSubmit)}>Sign up</Button>
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
