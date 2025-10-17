import { BUTTON_BASE, BUTTON_SIZES, BUTTON_VARIANTS } from "../constants/classes";
import type { ButtonProps } from "../model/types/type";
import clsx from "clsx";

export function Button({
  children,
  className = "",
  icon,
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  full = false,
  ...rest
}: ButtonProps) {
  const classes = clsx(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], full && "w-full", className);

  return (
    <button className={classes} disabled={loading || rest.disabled} {...rest}>
      {icon && <span className="mr-2">{icon}</span>}
      {loading ? loadingText || children : children}
    </button>
  );
}
