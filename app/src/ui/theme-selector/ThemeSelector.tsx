import clsx from "clsx";

import { Icon } from "ui/icon/Icon";
import { useThemeContext } from "context/theme/useThemeContext";

import styles from "./ThemeSelector.module.scss";
import { ThemeSelectorProps } from "./ThemeSelector.types";

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className, fixed }) => {
  const { theme, handleOnThemeChange } = useThemeContext();

  return (
    <div
      className={clsx(className, styles["theme-selector"], {
        [styles["theme-selector__fixed"]]: fixed,
      })}
      onClick={handleOnThemeChange}
      onKeyPress={handleOnThemeChange}
      role="button"
      aria-label="Change theme"
      tabIndex={0}
    >
      <Icon name={theme === "svpervnder" ? "icon-moon" : "icon-sun"} className={styles["theme-selector__icon"]} />
    </div>
  );
};
