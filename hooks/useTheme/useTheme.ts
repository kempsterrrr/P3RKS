import { useEffect } from "react";
import useStore from "../../stores/useStore";

const useTheme = () => {
  const setTheme = useStore((state) => state.setTheme);
  const theme = useStore((state) => state.user.theme);
  const localStorageTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;

  useEffect(() => {
    setTheme(localStorageTheme ?? "system");
  }, []);

  useEffect(() => {
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      if (theme === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return { setTheme, theme, localStorageTheme };
};

export default useTheme;
