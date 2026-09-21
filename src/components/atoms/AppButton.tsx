"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "large" | "small";

interface AppButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  "aria-label"?: string;
}

export function AppButton({
  variant = "primary",
  size = "large",
  icon: Icon,
  iconRight: IconRight,
  children,
  disabled = false,
  onClick,
  type = "button",
  className,
  "aria-label": ariaLabel,
}: AppButtonProps) {
  const iconSize = size === "large" ? 16 : 14;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center gap-[6px] rounded-full font-inter font-medium whitespace-nowrap transition-opacity",
        size === "large" && "h-[39px] px-4 text-body",
        size === "small" && "h-[33px] px-3 text-caption-desktop",
        variant === "primary" && [
          "bg-orange text-blanc-lm",
          "hover:opacity-90",
          "disabled:opacity-50",
        ],
        variant === "secondary" && [
          "bg-blanc-lm text-title-lm border border-separateurs-lm",
          "hover:bg-separateurs-lm",
          "disabled:opacity-50",
        ],
        disabled && "cursor-not-allowed",
        className,
      )}
    >
      {Icon && <Icon size={iconSize} />}
      {children}
      {IconRight && <IconRight size={iconSize} />}
    </button>
  );
}
