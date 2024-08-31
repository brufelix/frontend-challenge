import { THEME } from "~/constants/tokens";
import { cache } from "~/utils/cache.util";
import { PropsWithChildren, createContext, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const currentTheme = cache.getValue(THEME);
  const [isDarkMode, setIsDarkMode] = useState(currentTheme === "dark");

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      cache.setValue(THEME, !prevMode ? "dark" : "light");

      return !prevMode;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
