
import { useEffect, useCallback, useState } from "react";

// Simple theme hook that switches root .dark class and persists in localStorage.
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme());

  // Reads initial state from localStorage or system preference
  function getInitialTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    const persisted = localStorage.getItem("theme");
    if (persisted === "dark" || persisted === "light") return persisted;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  useEffect(() => {
    document.documentElement.classList.remove(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((cur) => (cur === "dark" ? "light" : "dark"));
  }, []);

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
