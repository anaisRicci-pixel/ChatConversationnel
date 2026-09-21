"use client";

import { cn } from "@/lib/utils";

type ToggleSize = "desktop" | "mobile";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: ToggleSize;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  size = "desktop",
  disabled = false,
  "aria-label": ariaLabel,
  className,
}: ToggleProps) {
  const isDesktop = size === "desktop";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative inline-flex flex-shrink-0 rounded-full transition-colors duration-200",
        isDesktop ? "w-[56px] h-[28px] p-[4px]" : "w-[43px] h-[22px] p-[3px]",
        checked ? "bg-orange border-none" : "bg-blanc-lm border-[1.5px] border-orange",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block rounded-full bg-blanc-lm shadow-sm transition-transform duration-200",
          isDesktop ? "size-[20px]" : "size-[16px]",
          checked
            ? isDesktop
              ? "translate-x-[28px]"
              : "translate-x-[21px]"
            : "translate-x-0",
          !checked && "bg-orange",
        )}
      />
    </button>
  );
}
