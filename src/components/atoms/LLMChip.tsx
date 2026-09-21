"use client";

import { cn } from "@/lib/utils";

type LLMMode = "rapide" | "avancé";
type LLMChipSize = "desktop" | "mobile";

interface LLMChipProps {
  mode: LLMMode;
  active?: boolean;
  disabled?: boolean;
  size?: LLMChipSize;
  onClick?: () => void;
  className?: string;
}

export function LLMChip({
  mode,
  active = false,
  disabled = false,
  size = "desktop",
  onClick,
  className,
}: LLMChipProps) {
  const isDesktop = size === "desktop";
  const label = mode === "rapide" ? "Rapide" : "Avancé";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "font-inter font-medium rounded-full transition-colors whitespace-nowrap",
        isDesktop ? "px-4 py-[6px] text-caption-desktop" : "px-3 py-1 text-caption-mobile",
        active
          ? "bg-orange text-blanc-lm"
          : "bg-transparent text-gris-fonce-lm hover:text-title-lm",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {label}
    </button>
  );
}

interface LLMSwitcherProps {
  mode: LLMMode;
  onModeChange: (mode: LLMMode) => void;
  size?: LLMChipSize;
  disabled?: boolean;
  className?: string;
}

export function LLMSwitcher({
  mode,
  onModeChange,
  size = "desktop",
  disabled = false,
  className,
}: LLMSwitcherProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-separateurs-lm bg-blanc-lm p-[2px]",
        className,
      )}
    >
      <LLMChip
        mode="rapide"
        active={mode === "rapide"}
        disabled={disabled}
        size={size}
        onClick={() => !disabled && onModeChange("rapide")}
      />
      <LLMChip
        mode="avancé"
        active={mode === "avancé"}
        disabled={disabled}
        size={size}
        onClick={() => !disabled && onModeChange("avancé")}
      />
    </div>
  );
}
