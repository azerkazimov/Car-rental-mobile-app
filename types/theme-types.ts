export type ThemeType = "system" | "light" | "dark" | "auto";


export type ThemeContextType = {
    theme: ThemeType;
    colorScheme: "light" | "dark";
    toggleTheme: (theme: ThemeType) => void;
  };