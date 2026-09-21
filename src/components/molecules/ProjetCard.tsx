"use client";

import { cn } from "@/lib/utils";
import { FolderOpen, Pin, PinOff, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ProjetCardProps {
  titre: string;
  description?: string;
  date?: string;
  size?: "large" | "small";
  pinned?: boolean;
  onClick?: () => void;
  onPin?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function ProjetCard({
  titre,
  description,
  date,
  size = "large",
  pinned = false,
  onClick,
  onPin,
  onEdit,
  onDelete,
  className,
}: ProjetCardProps) {
  const isSmall = size === "small";

  return (
    <div
      onClick={onClick}
      className={cn(
        "backdrop-blur-[8px] bg-blanc-lm/50 flex flex-col gap-4 items-end justify-end p-4 rounded-r-md shadow-[0px_5px_25px_rgba(0,0,0,0.05)] cursor-pointer transition-shadow hover:shadow-[0px_8px_32px_rgba(0,0,0,0.1)]",
        isSmall ? "w-full" : "w-full",
        className,
      )}
    >
      {/* Content */}
      <div className="flex flex-col gap-2 items-start w-full">
        {/* Title row */}
        <div className="flex gap-2 items-center w-full">
          <FolderOpen
            size={isSmall ? 14 : 16}
            className="text-gris-fonce-lm shrink-0"
          />
          <p
            className={cn(
              "font-inter font-semibold text-gris-fonce-lm flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
              isSmall ? "text-caption-desktop" : "text-body",
            )}
          >
            {titre}
          </p>

          {/* Action buttons */}
          <div className="flex items-center shrink-0">
            {/* Pin button */}
            <button
              type="button"
              aria-label={pinned ? "Désépingler" : "Épingler"}
              onClick={(e) => { e.stopPropagation(); onPin?.(); }}
              className={cn(
                "flex items-center justify-center rounded-r-sm text-gris-clair-lm hover:text-gris-fonce-lm hover:bg-separateurs-lm transition-colors",
                isSmall ? "size-[24px]" : "size-[32px]",
              )}
            >
              {pinned
                ? <PinOff size={isSmall ? 12 : 14} />
                : <Pin size={isSmall ? 12 : 14} />}
            </button>

            {/* Menu ⋮ */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Menu"
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "flex items-center justify-center rounded-r-sm text-gris-clair-lm hover:text-gris-fonce-lm hover:bg-separateurs-lm transition-colors",
                    isSmall ? "size-[24px]" : "size-[32px]",
                  )}
                >
                  <MoreVertical size={isSmall ? 12 : 14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-blanc-lm rounded-r-md p-2 shadow-[0px_4px_8px_rgba(0,0,0,0.1)] border-0 min-w-[140px]"
              >
                <DropdownMenuItem
                  onClick={() => onEdit?.()}
                  className="flex items-center gap-2 px-3 py-2 rounded-r-md text-caption-mobile text-gris-fonce-lm font-inter font-normal cursor-pointer hover:bg-separateurs-lm focus:bg-separateurs-lm"
                >
                  <Pencil size={14} className="shrink-0" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onPin?.()}
                  className="flex items-center gap-2 px-3 py-2 rounded-r-md text-caption-mobile text-gris-fonce-lm font-inter font-normal cursor-pointer hover:bg-separateurs-lm focus:bg-separateurs-lm"
                >
                  {pinned
                    ? <><PinOff size={14} className="shrink-0" />Désépingler</>
                    : <><Pin size={14} className="shrink-0" />Épingler</>}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-separateurs-lm mx-2" />
                <DropdownMenuItem
                  onClick={() => onDelete?.()}
                  className="flex items-center gap-2 px-3 py-2 rounded-r-md text-caption-mobile text-gris-fonce-lm font-inter font-normal cursor-pointer hover:bg-separateurs-lm focus:bg-separateurs-lm"
                >
                  <Trash2 size={14} className="shrink-0" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Description — Large only */}
        {!isSmall && description && (
          <p className="font-inter font-normal text-body text-gris-clair-lm line-clamp-2 w-full">
            {description}
          </p>
        )}
      </div>

      {/* Date */}
      {date && (
        <p className="font-inter font-normal text-[12px] text-gris-clair-lm w-full">
          {date}
        </p>
      )}
    </div>
  );
}
