"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon, X } from "lucide-react";

type BadgeVariant = "outline" | "filled";

interface AppBadgeProps {
  variant?: BadgeVariant;
  label: string;
  icon?: LucideIcon;
  onRemove?: () => void;
  className?: string;
}

export function AppBadge({
  variant = "outline",
  label,
  icon: Icon,
  onRemove,
  className,
}: AppBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2 py-1 rounded-r-md",
        variant === "outline" && "border border-separateurs-lm bg-blanc-lm",
        variant === "filled" && "bg-orange",
        className,
      )}
    >
      {Icon && (
        <Icon
          size={14}
          className={cn(
            variant === "outline" ? "text-gris-clair-lm" : "text-blanc-lm",
          )}
        />
      )}
      <span
        className={cn(
          "text-caption-mobile font-inter font-normal leading-none",
          variant === "outline" ? "text-gris-clair-lm" : "text-blanc-lm",
        )}
      >
        {label}
      </span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Retirer ${label}`}
          className={cn(
            "inline-flex items-center justify-center size-[16px] rounded-r-sm transition-opacity hover:opacity-70",
            variant === "outline" ? "text-gris-clair-lm" : "text-blanc-lm",
          )}
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}
