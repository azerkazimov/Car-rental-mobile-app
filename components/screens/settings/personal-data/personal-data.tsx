import { layoutTheme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import PersonalDataForm from "./personal-data-form";


export default function PersonalData() {
  return (
    <View style={styles.container}>
      <PersonalDataForm />
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