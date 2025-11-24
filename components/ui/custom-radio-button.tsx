import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CustomRadioButtonProps {
  checked: boolean;
  onPress: () => void;
}

export default function CustomRadioButton({
  checked,
  onPress,
}: CustomRadioButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.outerCircle,
          checked && styles.outerCircleChecked,
        ]}
      >
        {checked && <View style={styles.innerCircle} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D1D1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D1D1D1",
  },
  outerCircleChecked: {
    borderColor: "#F7B32B",
    backgroundColor: "#F7B32B",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
  },
});

