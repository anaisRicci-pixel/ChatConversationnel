"use client";

import { cn } from "@/lib/utils";
import { Zap, Brain } from "lucide-react";

type TooltipType = "default" | "llm";
type LLMMode = "rapide" | "avancé";

interface AppTooltipProps {
  type?: TooltipType;
  content?: string;
  llmMode?: LLMMode;
  className?: string;
}

export function AppTooltip({
  type = "default",
  content = "Info-bulle",
  llmMode = "rapide",
  className,
}: AppTooltipProps) {
  if (type === "llm") {
    const isRapide = llmMode === "rapide";
    return (
      <div
        className={cn(
          "bg-noir-2 text-blanc-lm rounded-r-sm px-3 py-2 flex flex-col gap-1 max-w-[270px] shadow-card",
          className,
        )}
        role="tooltip"
      >
        <div className="flex items-center gap-2">
          {isRapide ? <Zap size={14} className="text-orange" /> : <Brain size={14} className="text-orange" />}
          <span className="text-caption-desktop font-inter font-medium">
            {isRapide ? "Rapide" : "Avancé"}
          </span>
        </div>
        <p className="text-caption-mobile font-inter font-normal text-gris-clair-lm leading-snug">
          {isRapide
            ? "Modèle rapide et efficace pour les questions simples."
            : "Modèle avancé pour les questions complexes et l'analyse approfondie."}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-noir-2 text-blanc-lm rounded-r-sm px-3 py-2 text-caption-mobile font-inter font-normal max-w-[270px] shadow-card",
        className,
      )}
      role="tooltip"
    >
      {content}
    </div>
  );
}
