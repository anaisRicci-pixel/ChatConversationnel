"use client";

import { cn } from "@/lib/utils";
import { Copy, ThumbsUp, ThumbsDown, Volume2, RotateCcw } from "lucide-react";
import { useState } from "react";

interface ReactionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  className?: string;
}

function ReactionButton({ icon: Icon, label, onClick, className }: ReactionButtonProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "inline-flex items-center justify-center size-[32px] rounded-r-sm transition-colors",
        hovered ? "text-gris-fonce-lm bg-separateurs-lm" : "text-gris-clair-lm",
        className,
      )}
    >
      <Icon size={16} />
    </button>
  );
}

interface ReactionBarProps {
  onCopy?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onAudio?: () => void;
  onReset?: () => void;
  className?: string;
}

export function ReactionBar({
  onCopy,
  onLike,
  onDislike,
  onAudio,
  onReset,
  className,
}: ReactionBarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-[6px] bg-blanc-lm rounded-r-sm border border-separateurs-lm shadow-card",
        className,
      )}
    >
      <ReactionButton icon={Copy} label="Copier" onClick={onCopy} />
      <ReactionButton icon={ThumbsUp} label="Aimer" onClick={onLike} />
      <ReactionButton icon={ThumbsDown} label="Ne pas aimer" onClick={onDislike} />
      <ReactionButton icon={Volume2} label="Écouter" onClick={onAudio} />
      <ReactionButton icon={RotateCcw} label="Régénérer" onClick={onReset} />
    </div>
  );
}
