"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon, Pin, PinOff, Share2, Trash2, Pencil, MessageSquare } from "lucide-react";

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}

function MenuItem({ icon: Icon, label, onClick, danger = false }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex gap-3 items-center px-3 py-2 rounded-r-md text-body font-inter font-normal transition-colors text-left",
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-gris-fonce-lm hover:bg-separateurs-lm",
      )}
    >
      <Icon size={16} className="shrink-0" />
      <span>{label}</span>
    </button>
  );
}

export type ContextMenuType = "projet" | "chat" | "source" | "chat-epingle";

interface ContextMenuProps {
  type?: ContextMenuType;
  onPin?: () => void;
  onUnpin?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  className?: string;
}

const menuConfigs: Record<ContextMenuType, MenuItemProps[]> = {
  projet: [
    { icon: Pencil, label: "Modifier" },
    { icon: Pin, label: "Épingler" },
    { icon: Trash2, label: "Supprimer", danger: true },
  ],
  "chat-epingle": [
    { icon: PinOff, label: "Désépingler" },
    { icon: Trash2, label: "Supprimer", danger: true },
  ],
  chat: [
    { icon: Pin, label: "Épingler" },
    { icon: MessageSquare, label: "Renommer" },
    { icon: Trash2, label: "Supprimer", danger: true },
  ],
  source: [
    { icon: Share2, label: "Télécharger" },
    { icon: Trash2, label: "Supprimer", danger: true },
  ],
};

export function ContextMenu({
  type = "projet",
  onPin,
  onUnpin,
  onEdit,
  onDelete,
  onShare,
  className,
}: ContextMenuProps) {
  const handlerMap: Record<string, (() => void) | undefined> = {
    Modifier: onEdit,
    Épingler: onPin,
    Désépingler: onUnpin,
    Supprimer: onDelete,
    Télécharger: onShare,
    Renommer: onEdit,
  };

  return (
    <div
      className={cn(
        "bg-blanc-lm flex flex-col gap-1 p-3 rounded-r-md shadow-[0px_4px_8px_rgba(0,0,0,0.10)] min-w-[154px]",
        className,
      )}
      role="menu"
    >
      {menuConfigs[type].map((item) => (
        <MenuItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          danger={item.danger}
          onClick={handlerMap[item.label]}
        />
      ))}
    </div>
  );
}
