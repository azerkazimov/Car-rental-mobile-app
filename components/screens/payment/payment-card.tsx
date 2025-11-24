import CustomRadioButton from "@/components/ui/custom-radio-button";
import { Image } from "expo-image";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface PaymentCardProps {
  isSelected: boolean;
  onPress: () => void;
  logo: any;
  logoText?: string;
  styles: any;
  children?: React.ReactNode;
}

export default function PaymentCard({
  isSelected,
  onPress,
  logo,
  logoText,
  styles,
  children,
}: PaymentCardProps) {
  const animatedHeight = useSharedValue(isSelected && children ? 200 : 0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: animatedHeight.value,
      opacity: withTiming(animatedHeight.value > 0 ? 1 : 0, { duration: 300 }),
      overflow: "hidden",
    };
  });

  useEffect(() => {
    animatedHeight.value = withTiming(isSelected && children ? 300 : 0, {
      duration: 400,
    });
  }, [isSelected, children, animatedHeight]);

  return (
    <View style={styles.paymentCardWrapper}>
      <TouchableOpacity
        style={styles.cardImageContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Image source={logo} style={styles.cardImage} />

        <CustomRadioButton checked={isSelected} onPress={onPress} />
      </TouchableOpacity>
      {children && (
        <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
          {children}
        </Animated.View>
      )}
    </View>
  );
}
