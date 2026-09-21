"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type TextareaSize = "large" | "small";

interface AppTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  size?: TextareaSize;
  error?: string;
  containerClassName?: string;
}

export const AppTextarea = forwardRef<HTMLTextAreaElement, AppTextareaProps>(
  ({ label, size = "large", error, className, containerClassName, ...props }, ref) => {
    const isLarge = size === "large";

    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label className="text-caption-desktop font-inter font-medium text-gris-fonce-lm">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full font-inter font-normal text-title-lm bg-blanc-lm rounded-r-lg border transition-colors outline-none resize-none",
            "placeholder:text-gris-clair-lm",
            isLarge ? "min-h-[160px] px-4 py-3 text-body" : "min-h-[120px] px-3 py-2 text-caption-desktop",
            "border-separateurs-lm focus:border-orange",
            error && "border-red-500",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-caption-mobile font-inter text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

AppTextarea.displayName = "AppTextarea";
