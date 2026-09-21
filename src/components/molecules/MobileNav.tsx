"use client";

import { cn } from "@/lib/utils";
import {
  Plus, X, BookOpen, FolderOpen, MessageSquare,
  MoreVertical, ChevronUp, ChevronDown, Timer, Pin, PinOff, Trash2,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface MobileNavItem {
  id: string;
  label: string;
  isProject?: boolean;
}

interface MobileNavProps {
  onClose?: () => void;
  pinnedItems?: MobileNavItem[];
  recentItems?: MobileNavItem[];
  activeItemId?: string;
  onNewDiscussion?: () => void;
  onProjectsClick?: () => void;
  onItemClick?: (id: string) => void;
  onPinItem?: (id: string) => void;
  onUnpinItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
  className?: string;
}

export function MobileNav({
  onClose,
  pinnedItems = [],
  recentItems = [],
  activeItemId,
  onNewDiscussion,
  onProjectsClick,
  onItemClick,
  onPinItem,
  onUnpinItem,
  onDeleteItem,
  className,
}: MobileNavProps) {
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [discussionsOpen, setDiscussionsOpen] = useState(true);

  return (
    <div
      className={cn(
        "bg-blanc-lm flex flex-col gap-4 p-3 shadow-[0px_5px_12.5px_rgba(0,0,0,0.05)] h-full w-full overflow-y-auto",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="relative h-[30px] w-[120px] overflow-hidden shrink-0">
          <Image
            src="/logo.png"
            alt="Secured ChatGPT"
            width={1507}
            height={500}
            className="absolute max-w-none"
            style={{ height: "143%", width: "108%", top: "-17%", left: "-5%" }}
            priority
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="bg-blanc-lm/50 border border-separateurs-lm rounded-r-lg shadow-[0px_5px_25px_rgba(0,0,0,0.05)] flex items-center justify-center size-[40px] shrink-0"
        >
          <X size={16} className="text-title-lm" />
        </button>
      </div>

      {/* Primary nav */}
      <div className="flex flex-col shrink-0">
        <button
          type="button"
          onClick={onNewDiscussion}
          className="flex items-center gap-2 h-[40px] px-2 rounded-r-md"
        >
          <Plus size={16} className="text-orange shrink-0" />
          <span className="font-inter font-semibold text-caption-desktop text-orange">
            Nouvelle discussion
          </span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 h-[40px] px-2 rounded-r-md text-gris-fonce-lm hover:bg-separateurs-lm transition-colors"
        >
          <BookOpen size={14} className="shrink-0" />
          <span className="font-inter font-normal text-caption-desktop flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
            Bibliothèque de prompts
          </span>
        </button>

        <button
          type="button"
          onClick={onProjectsClick}
          className="flex items-center gap-2 h-[40px] px-2 rounded-r-md text-gris-fonce-lm hover:bg-separateurs-lm transition-colors"
        >
          <FolderOpen size={14} className="shrink-0" />
          <span className="font-inter font-normal text-caption-desktop flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
            Projets
          </span>
          <span className="flex items-center justify-center rounded-r-sm size-[24px]">
            <Plus size={14} />
          </span>
        </button>
      </div>

      {/* Épinglés */}
      {pinnedItems.length > 0 && (
        <div className="flex flex-col shrink-0">
          <button
            type="button"
            onClick={() => setPinnedOpen((o) => !o)}
            className="flex items-center gap-2 h-[40px] px-2"
          >
            <span className="font-inter font-semibold text-caption-desktop text-gris-fonce-lm flex-1 text-left">
              Épinglés
            </span>
            {pinnedOpen
              ? <ChevronUp size={16} className="text-gris-fonce-lm shrink-0" />
              : <ChevronDown size={16} className="text-gris-fonce-lm shrink-0" />
            }
          </button>
          {pinnedOpen && pinnedItems.map((item) => (
            <NavSubItem
              key={item.id}
              item={item}
              active={item.id === activeItemId}
              onItemClick={onItemClick}
              pinned
              onUnpinItem={onUnpinItem}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </div>
      )}

      {/* Discussions */}
      {recentItems.length > 0 && (
        <div className="flex flex-col shrink-0">
          <button
            type="button"
            onClick={() => setDiscussionsOpen((o) => !o)}
            className="flex items-center gap-2 h-[40px] px-2"
          >
            <span className="font-inter font-semibold text-caption-desktop text-gris-fonce-lm flex-1 text-left">
              Discussions
            </span>
            {discussionsOpen
              ? <ChevronUp size={16} className="text-gris-fonce-lm shrink-0" />
              : <ChevronDown size={16} className="text-gris-fonce-lm shrink-0" />
            }
          </button>
          {discussionsOpen && recentItems.map((item) => (
            <NavSubItem
              key={item.id}
              item={item}
              active={item.id === activeItemId}
              onItemClick={onItemClick}
              onPinItem={onPinItem}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface NavSubItemProps {
  item: MobileNavItem;
  active?: boolean;
  pinned?: boolean;
  onItemClick?: (id: string) => void;
  onPinItem?: (id: string) => void;
  onUnpinItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
}

function NavSubItem({ item, active, pinned = false, onItemClick, onPinItem, onUnpinItem, onDeleteItem }: NavSubItemProps) {
  const Icon = item.isProject ? Timer : MessageSquare;
  return (
    <div
      className={cn(
        "flex items-center gap-1 h-[40px] px-2 overflow-hidden rounded-r-md",
        active && "bg-separateurs-lm",
      )}
    >
      <Icon size={14} className="text-gris-fonce-lm shrink-0" />
      <button
        type="button"
        onClick={() => onItemClick?.(item.id)}
        className="font-inter font-normal text-caption-desktop text-gris-fonce-lm flex-1 min-w-0 text-left overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {item.label}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Menu"
            className="flex items-center justify-center size-[24px] shrink-0 text-gris-clair-lm hover:text-gris-fonce-lm"
          >
            <MoreVertical size={14} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-blanc-lm rounded-r-md p-2 shadow-[0px_4px_8px_rgba(0,0,0,0.1)] border-0 min-w-[120px]"
        >
          {pinned ? (
            <DropdownMenuItem
              onClick={() => onUnpinItem?.(item.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-r-md text-caption-mobile text-gris-fonce-lm font-inter font-normal cursor-pointer hover:bg-separateurs-lm focus:bg-separateurs-lm"
            >
              <PinOff size={14} className="shrink-0" />
              Désépingler
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => onPinItem?.(item.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-r-md text-caption-mobile text-gris-fonce-lm font-inter font-normal cursor-pointer hover:bg-separateurs-lm focus:bg-separateurs-lm"
            >
              <Pin size={14} className="shrink-0" />
              Épingler
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => onDeleteItem?.(item.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-r-md text-caption-mobile text-gris-fonce-lm font-inter font-normal cursor-pointer hover:bg-separateurs-lm focus:bg-separateurs-lm"
          >
            <Trash2 size={14} className="shrink-0" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
