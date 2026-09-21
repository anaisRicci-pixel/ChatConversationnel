"use client";

import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";
import { AppButton } from "@/components/atoms/AppButton";

interface AppPopoverProps {
  title: string;
  children?: React.ReactNode;
  size?: "large" | "small";
  primaryLabel?: string;
  secondaryLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  showPrimary?: boolean;
  showSecondary?: boolean;
  className?: string;
}

export function AppPopover({
  title,
  children,
  size = "large",
  primaryLabel = "Enregistrer",
  secondaryLabel = "Annuler",
  onConfirm,
  onCancel,
  onClose,
  showPrimary = true,
  showSecondary = true,
  className,
}: AppPopoverProps) {
  const isLarge = size === "large";

  return (
    <div
      className={cn(
        "bg-blanc-lm border border-separateurs-lm rounded-r-lg shadow-[0px_4px_8px_rgba(0,0,0,0.10)] flex flex-col gap-8 p-6",
        isLarge ? "w-[576px]" : "w-[415px]",
        className,
      )}
      role="dialog"
      aria-label={title}
    >
      {/* Header */}
      <div className="flex items-center gap-6">
        <h2 className="flex-1 min-w-0 text-h4 font-inter font-semibold text-gris-fonce-lm overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose ?? onCancel}
          aria-label="Fermer"
          className="inline-flex items-center justify-center size-[32px] rounded-r-sm hover:bg-separateurs-lm transition-colors shrink-0 text-gris-clair-lm"
        >
          <X size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-[66px]">
        {children}
      </div>

      {/* Buttons */}
      {(showPrimary || showSecondary) && (
        <div className="flex items-center justify-end gap-3">
          {showSecondary && (
            <AppButton variant="secondary" size="small" onClick={onCancel}>
              {secondaryLabel}
            </AppButton>
          )}
          {showPrimary && (
            <AppButton variant="primary" size="small" icon={Plus} onClick={onConfirm}>
              {primaryLabel}
            </AppButton>
          )}
        </div>
      )}
    </div>
  );
}
