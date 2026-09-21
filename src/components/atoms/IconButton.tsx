"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

type IconButtonSize = "large" | "medium" | "small";
type IconButtonVariant = "default" | "hover" | "selected" | "disabled";

interface IconButtonProps {
  icon: LucideIcon;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  onClick?: () => void;
  "aria-label": string;
  className?: string;
}

const sizeMap: Record<IconButtonSize, { container: string; icon: number }> = {
  large: { container: "size-[44px]", icon: 16 },
  medium: { container: "size-[32px]", icon: 14 },
  small: { container: "size-[24px]", icon: 14 },
};

export function IconButton({
  icon: Icon,
  size = "medium",
  variant = "default",
  onClick,
  "aria-label": ariaLabel,
  className,
}: IconButtonProps) {
  const { container, icon: iconSize } = sizeMap[size];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={variant === "disabled"}
      className={cn(
        "inline-flex items-center justify-center rounded-r-sm transition-colors flex-shrink-0",
        container,
        variant === "default" && "text-gris-clair-lm hover:bg-separateurs-lm hover:text-gris-fonce-lm",
        variant === "hover" && "bg-separateurs-lm text-gris-fonce-lm",
        variant === "selected" && "bg-orange text-blanc-lm",
        variant === "disabled" && "text-separateurs-lm cursor-not-allowed opacity-50",
        className,
      )}
    >
      <Icon size={iconSize} />
    </button>
  );
}
