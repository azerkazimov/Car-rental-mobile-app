import { useTheme } from "./use-theme";

// === useColorScheme hook - returns the actual resolved color scheme ===
export function useColorScheme() {
    const { colorScheme } = useTheme();
    return colorScheme;
  }