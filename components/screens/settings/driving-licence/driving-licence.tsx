import { layoutTheme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import DrivingLicenceForm from "./driving-licence-form";

export default function DrivingLicence() {
  return (
    <View style={styles.container}>
      <DrivingLicenceForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: layoutTheme.colors.background.light,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
});