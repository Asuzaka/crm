import type { ReactNode } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "icon" | "link" | "destructive" | "text" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  full?: boolean;
}

export interface TabButtonProps {
  active: boolean;
  onClick?: () => void;
  children: ReactNode;
  icon?: ReactNode;
}
