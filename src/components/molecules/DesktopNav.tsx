"use client";

import { cn } from "@/lib/utils";
import {
  Plus, Search, PanelLeft, BookOpen, FolderOpen,
  MessageSquare, ChevronUp, ChevronDown, Timer,
  MoreVertical, Pin, PinOff, Trash2,
} from "lucide-react";
import { useState } from "react";
import type { MobileNavItem } from "./MobileNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopNavProps {
  pinnedItems?: MobileNavItem[];
  recentItems?: MobileNavItem[];
  activeItemId?: string;
  activeSection?: "projets";
  onNewDiscussion?: () => void;
  onProjectsClick?: () => void;
  onNewProject?: () => void;
  onItemClick?: (id: string) => void;
  onPinItem?: (id: string) => void;
  onUnpinItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
  className?: string;
}

export function DesktopNav({
  pinnedItems = [],
  recentItems = [],
  activeItemId,
  activeSection,
  onNewDiscussion,
  onProjectsClick,
  onNewProject,
  onItemClick,
  onPinItem,
  onUnpinItem,
  onDeleteItem,
  className,
}: DesktopNavProps) {
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [discussionsOpen, setDiscussionsOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div
        className={cn(
          "bg-blanc-lm/50 flex flex-col items-center gap-4 px-4 py-6 h-full w-[76px] shrink-0",
          className,
        )}
      >
        {/* Toggle — rouvre la sidebar */}
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Ouvrir le menu"
          className="flex items-center justify-center size-[44px] rounded-r-xl border border-separateurs-lm bg-blanc-lm/50 shadow-[0px_5px_25px_rgba(0,0,0,0.05)] text-gris-clair-lm hover:text-gris-fonce-lm transition-colors shrink-0"
        >
          <PanelLeft size={16} />
        </button>

        {/* Search */}
        <button
          type="button"
          aria-label="Rechercher"
          className="flex items-center justify-center size-[44px] rounded-r-md text-gris-clair-lm hover:bg-separateurs-lm transition-colors shrink-0"
        >
          <Search size={16} />
        </button>

        {/* Nouvelle discussion */}
        <button
          type="button"
          onClick={onNewDiscussion}
          aria-label="Nouvelle discussion"
          className="flex items-center justify-center size-[44px] rounded-r-md text-orange hover:bg-separateurs-lm transition-colors shrink-0"
        >
          <Plus size={20} />
        </button>

        {/* Bibliothèque */}
        <button
          type="button"
          aria-label="Bibliothèque de prompts"
          className="flex items-center justify-center size-[44px] rounded-r-md text-gris-clair-lm hover:bg-separateurs-lm transition-colors shrink-0"
        >
          <BookOpen size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-blanc-lm flex flex-col gap-4 px-3 py-6 h-full w-[300px] shrink-0 overflow-y-auto",
        className,
      )}
    >
      {/* Top action buttons */}
      <div className="flex items-center justify-end gap-3 shrink-0">
        <button
          type="button"
          aria-label="Rechercher"
          className="flex items-center justify-center size-[32px] rounded-r-md text-gris-clair-lm hover:bg-separateurs-lm transition-colors"
        >
          <Search size={16} />
        </button>
        <button
          type="button"
          aria-label="Réduire le menu"
          onClick={() => setCollapsed(true)}
          className="flex items-center justify-center size-[32px] rounded-r-md text-gris-clair-lm hover:bg-separateurs-lm transition-colors"
        >
          <PanelLeft size={16} />
        </button>
      </div>

      {/* Primary nav */}
      <div className="flex flex-col shrink-0">
        <button
          type="button"
          onClick={onNewDiscussion}
          className="flex items-center gap-2 h-[48px] px-3 rounded-r-md"
        >
          <Plus size={16} className="text-orange shrink-0" />
          <span className="font-inter font-semibold text-body text-orange">
            Nouvelle discussion
          </span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 h-[48px] px-3 rounded-r-md text-gris-fonce-lm hover:bg-separateurs-lm transition-colors"
        >
          <BookOpen size={16} className="shrink-0" />
          <span className="font-inter font-normal text-body flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
            Bibliothèque de prompts
          </span>
        </button>

        <button
          type="button"
          onClick={onProjectsClick}
          className={cn(
            "flex items-center gap-2 h-[48px] px-3 rounded-r-md transition-colors",
            activeSection === "projets"
              ? "bg-orange text-blanc-lm"
              : "text-gris-fonce-lm hover:bg-separateurs-lm",
          )}
        >
          <FolderOpen size={16} className="shrink-0" />
          <span className="font-inter font-normal text-body flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
            Projets
          </span>
          {activeSection === "projets" && (
            <button
              type="button"
              aria-label="Nouveau projet"
              onClick={(e) => { e.stopPropagation(); onNewProject?.(); }}
              className="flex items-center justify-center size-[24px] rounded-r-sm bg-[#b5733a] text-blanc-lm shrink-0 transition-colors hover:bg-orange"
            >
              <Plus size={14} />
            </button>
          )}
        </button>
      </div>

      {/* Épinglés */}
      {pinnedItems.length > 0 && (
        <div className="flex flex-col shrink-0">
          <button
            type="button"
            onClick={() => setPinnedOpen((o) => !o)}
            className="flex items-center gap-2 h-[48px] px-3"
          >
            <span className="font-inter font-semibold text-body text-gris-fonce-lm flex-1 text-left">
              Épinglés
            </span>
            {pinnedOpen
              ? <ChevronUp size={16} className="text-gris-fonce-lm shrink-0" />
              : <ChevronDown size={16} className="text-gris-fonce-lm shrink-0" />}
          </button>
          {pinnedOpen && pinnedItems.map((item) => (
            <DesktopNavItem
              key={item.id}
              item={item}
              active={item.id === activeItemId}
              pinned
              onItemClick={onItemClick}
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
            className="flex items-center gap-2 h-[48px] px-3"
          >
            <span className="font-inter font-semibold text-body text-gris-fonce-lm flex-1 text-left">
              Discussions
            </span>
            {discussionsOpen
              ? <ChevronUp size={16} className="text-gris-fonce-lm shrink-0" />
              : <ChevronDown size={16} className="text-gris-fonce-lm shrink-0" />}
          </button>
          {discussionsOpen && recentItems.map((item) => (
            <DesktopNavItem
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

interface DesktopNavItemProps {
  item: MobileNavItem;
  active?: boolean;
  pinned?: boolean;
  onItemClick?: (id: string) => void;
  onPinItem?: (id: string) => void;
  onUnpinItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
}

function DesktopNavItem({ item, active, pinned = false, onItemClick, onPinItem, onUnpinItem, onDeleteItem }: DesktopNavItemProps) {
  const Icon = item.isProject ? Timer : MessageSquare;
  return (
    <div
      className={cn(
        "group flex items-center gap-2 h-[48px] px-3 overflow-hidden rounded-r-md transition-colors hover:bg-separateurs-lm",
      )}
    >
      <Icon size={16} className="text-gris-fonce-lm shrink-0" />
      <button
        type="button"
        onClick={() => onItemClick?.(item.id)}
        className="font-inter font-normal text-body text-gris-fonce-lm flex-1 min-w-0 text-left overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {item.label}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Menu"
            className="flex items-center justify-center size-[24px] shrink-0 text-gris-clair-lm hover:text-gris-fonce-lm opacity-0 group-hover:opacity-100 transition-opacity"
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
