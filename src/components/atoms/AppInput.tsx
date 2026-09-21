"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type InputSize = "large" | "small";
type InputState = "rest" | "focus";

interface AppInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: InputSize;
  state?: InputState;
  error?: string;
  containerClassName?: string;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ label, size = "large", state = "rest", error, className, containerClassName, ...props }, ref) => {
    const isLarge = size === "large";
    const isFocused = state === "focus";

    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label className="text-caption-desktop font-inter font-medium text-gris-fonce-lm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full font-inter font-normal text-title-lm bg-blanc-lm rounded-r-lg border transition-colors outline-none",
            "placeholder:text-gris-clair-lm",
            isLarge ? "h-[56px] px-4 text-body" : "h-[44px] px-3 text-caption-desktop",
            isFocused || "focus"
              ? "border-orange focus:border-orange"
              : "border-separateurs-lm focus:border-orange",
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

AppInput.displayName = "AppInput";
