import { layoutTheme } from "@/constants/theme";
import { useModalStore } from "@/store/modal-store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ModalProps {
  icon: string;
  text: string;
}

export default function CustomModal({ icon, text }: ModalProps) {
  const router = useRouter();
  const { isVisible, setIsVisible } = useModalStore();

  const handleConfirm = () => {
    setIsVisible(false);
    router.push("/");
  };
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name={icon as any} 
              size={64} 
              color={layoutTheme.colors.primary[500]} 
            />
          </View>
          <Text style={styles.modalText}>{text}</Text>
          <Pressable
            style={styles.button}
            onPress={handleConfirm}
          >
            <Text style={styles.textStyle}>Back</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 300,
  },
  iconContainer: {
    marginBottom: 20,
    backgroundColor: layoutTheme.colors.primary[50],
    borderRadius: 50,
    padding: 20,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontFamily: layoutTheme.fonts.poppins.semiBold,
    color: layoutTheme.colors.text.primary,
  },
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    backgroundColor: layoutTheme.colors.primary[500],
    minWidth: 200,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    fontFamily: layoutTheme.fonts.poppins.bold,
  },
});
