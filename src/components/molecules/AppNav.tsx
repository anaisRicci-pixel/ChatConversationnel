"use client";

import { cn } from "@/lib/utils";
import {
  Plus,
  BookOpen,
  FolderOpen,
  MessageSquare,
  Clock,
  Pin,
  ChevronDown,
  ChevronUp,
  Search,
  Layout,
} from "lucide-react";
import { useState } from "react";

interface NavSubItemProps {
  icon?: React.ElementType;
  label: string;
  active?: boolean;
  pinned?: boolean;
  onClick?: () => void;
  size?: "large" | "small";
}

function NavSubItem({
  icon: Icon = MessageSquare,
  label,
  active = false,
  onClick,
  size = "large",
}: NavSubItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2 pl-3 pr-2 overflow-hidden transition-colors rounded-r-md text-left",
        size === "large" ? "h-[48px] py-3" : "h-[40px] py-2",
        active
          ? "bg-separateurs-lm text-title-lm font-semibold"
          : "text-gris-fonce-lm font-normal hover:bg-separateurs-lm",
      )}
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1 min-w-0 text-body font-inter overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

interface NavSectionProps {
  title: string;
  items: { id: string; label: string; pinned?: boolean; active?: boolean; icon?: React.ElementType }[];
  defaultOpen?: boolean;
  activeItemId?: string;
  onItemClick?: (id: string) => void;
  size?: "large" | "small";
}

function NavSection({
  title,
  items,
  defaultOpen = true,
  activeItemId,
  onItemClick,
  size = "large",
}: NavSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between pl-3 pr-2 py-3 h-[48px]"
      >
        <span className="text-body font-inter font-semibold text-gris-fonce-lm">{title}</span>
        {open
          ? <ChevronUp size={16} className="text-gris-clair-lm shrink-0" />
          : <ChevronDown size={16} className="text-gris-clair-lm shrink-0" />
        }
      </button>
      {open && items.map((item) => (
        <NavSubItem
          key={item.id}
          icon={item.pinned ? Pin : (item.icon ?? MessageSquare)}
          label={item.label}
          active={item.id === activeItemId}
          size={size}
          onClick={() => onItemClick?.(item.id)}
        />
      ))}
      {open && items.length > 3 && (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 text-body font-inter font-semibold text-gris-fonce-lm"
        >
          <span>Afficher moins</span>
          <ChevronUp size={16} />
        </button>
      )}
    </div>
  );
}

export interface NavChat {
  id: string;
  label: string;
  pinned?: boolean;
  active?: boolean;
}

interface AppNavProps {
  size?: "large" | "small";
  pinnedChats?: NavChat[];
  recentChats?: NavChat[];
  activeItemId?: string;
  onNewChat?: () => void;
  onGoToProjects?: () => void;
  onGoToLibrary?: () => void;
  onChatClick?: (id: string) => void;
  className?: string;
}

export function AppNav({
  size = "large",
  pinnedChats = [],
  recentChats = [],
  activeItemId,
  onNewChat,
  onGoToProjects,
  onGoToLibrary,
  onChatClick,
  className,
}: AppNavProps) {
  const isLarge = size === "large";
  const w = isLarge ? "w-[300px]" : "w-[320px]";

  return (
    <nav
      className={cn(
        "bg-blanc-lm flex flex-col gap-4 px-3 py-6 overflow-y-auto",
        w,
        className,
      )}
      aria-label="Navigation principale"
    >
      {/* Top action buttons */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Rechercher"
          className="inline-flex items-center justify-center size-[32px] rounded-r-md text-gris-clair-lm hover:bg-separateurs-lm transition-colors"
        >
          <Search size={16} />
        </button>
        <button
          type="button"
          aria-label="Fenêtre"
          className="inline-flex items-center justify-center size-[32px] rounded-r-md text-gris-clair-lm hover:bg-separateurs-lm transition-colors"
        >
          <Layout size={16} />
        </button>
      </div>

      {/* Primary nav items */}
      <div className="flex flex-col">
        <button
          type="button"
          onClick={onNewChat}
          className={cn(
            "w-full flex items-center gap-2 pl-3 pr-2 rounded-r-md h-[43px] py-3 text-orange font-inter font-semibold hover:bg-separateurs-lm transition-colors text-left",
            "text-body",
          )}
        >
          <Plus size={16} className="shrink-0" />
          <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            Nouvelle discussion
          </span>
        </button>

        <button
          type="button"
          onClick={onGoToLibrary}
          className="w-full flex items-center gap-2 pl-3 pr-2 rounded-r-md h-[43px] py-3 text-gris-fonce-lm font-inter font-normal hover:bg-separateurs-lm transition-colors text-left text-body"
        >
          <BookOpen size={16} className="shrink-0" />
          <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            Bibliothèque de prompts
          </span>
        </button>

        <button
          type="button"
          onClick={onGoToProjects}
          className="w-full flex items-center gap-2 pl-3 pr-2 rounded-r-md h-[43px] py-3 text-gris-fonce-lm font-inter font-normal hover:bg-separateurs-lm transition-colors text-left text-body"
        >
          <FolderOpen size={16} className="shrink-0" />
          <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            Projets
          </span>
        </button>
      </div>

      {/* Pinned chats section */}
      {pinnedChats.length > 0 && (
        <NavSection
          title="Épinglés"
          items={pinnedChats.map((c) => ({ ...c, pinned: true }))}
          activeItemId={activeItemId}
          onItemClick={onChatClick}
          size={size}
        />
      )}

      {/* Recent chats section */}
      {recentChats.length > 0 && (
        <NavSection
          title="Discussions"
          items={recentChats.map((c) => ({
            ...c,
            icon: c.label.includes("projet") ? Clock : MessageSquare,
          }))}
          activeItemId={activeItemId}
          onItemClick={onChatClick}
          size={size}
        />
      )}
    </nav>
  );
}
