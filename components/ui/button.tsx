import { layoutTheme } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({
  children,
  onPress,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const textColor =
    variant === "primary"
      ? layoutTheme.colors.text.inverse
      : layoutTheme.colors.text.secondary;
  const fontSize = variant === "primary" ? 18 : 14;

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // If child is a string or number, wrap it in a Text component
      if (typeof child === "string" || typeof child === "number") {
        return (
          <Text
            style={{
              ...styles.text,
              color: textColor,
              fontSize: fontSize,
            }}
          >
            {child}
          </Text>
        );
      }
      // Otherwise, return the child as-is (e.g., icons)
      return child;
    });
  };

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        ...styles.button,
        backgroundColor:
          variant === "primary"
            ? layoutTheme.colors.background.primary
            : layoutTheme.colors.background.secondary,
        opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
      })}
    >
      <View style={styles.content}>{renderChildren()}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: layoutTheme.colors.background.primary,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: layoutTheme.fonts.poppins.bold,
  },
});
