import { ThemeContextType } from "@/types/theme-types";
import { createContext, useContext } from "react";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
// === useTheme hook ===
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context; // returns the theme context = light or dark
}