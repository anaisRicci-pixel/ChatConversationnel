"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, X, CheckCircle, Info } from "lucide-react";

type MessageBarVariant = "warning" | "success" | "info" | "error";

interface MessageBarProps {
  variant?: MessageBarVariant;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

const variantConfig: Record<MessageBarVariant, { icon: React.ElementType; color: string; border: string }> = {
  warning: { icon: AlertCircle, color: "text-orange", border: "border-orange" },
  error: { icon: AlertCircle, color: "text-red-500", border: "border-red-500" },
  success: { icon: CheckCircle, color: "text-green-600", border: "border-green-500" },
  info: { icon: Info, color: "text-gris-fonce-lm", border: "border-separateurs-lm" },
};

export function MessageBar({
  variant = "warning",
  message,
  onDismiss,
  className,
}: MessageBarProps) {
  const { icon: Icon, color, border } = variantConfig[variant];

  return (
    <div
      className={cn(
        "bg-blanc-lm border rounded-r-md p-3 flex items-start justify-between gap-8",
        border,
        className,
      )}
      role="alert"
    >
      <div className="flex items-center gap-2 flex-1">
        <Icon size={16} className={cn("shrink-0", color)} />
        <p className={cn("text-caption-mobile font-inter font-medium leading-relaxed", color)}>
          {message}
        </p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fermer"
          className={cn(
            "inline-flex items-center justify-center size-[24px] rounded-r-sm shrink-0 transition-opacity hover:opacity-70",
            color,
          )}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
