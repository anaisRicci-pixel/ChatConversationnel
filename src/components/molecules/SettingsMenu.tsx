"use client";

import { cn } from "@/lib/utils";
import { User, Bell, Shield, Globe, HelpCircle, LogOut, Moon } from "lucide-react";
import { Toggle } from "@/components/atoms/Toggle";
import { useState } from "react";

type SettingsMenuSize = "desktop" | "mobile";

interface SettingsItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  size?: SettingsMenuSize;
  danger?: boolean;
}

function SettingsItem({ icon: Icon, label, onClick, size = "desktop", danger = false }: SettingsItemProps) {
  const isDesktop = size === "desktop";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 rounded-r-md transition-colors text-left",
        isDesktop ? "px-3 py-2" : "px-3 py-2",
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-gris-fonce-lm hover:bg-separateurs-lm",
      )}
    >
      <Icon size={16} className="shrink-0" />
      <span className={cn("font-inter font-normal", isDesktop ? "text-body" : "text-caption-desktop")}>
        {label}
      </span>
    </button>
  );
}

interface SettingsToggleItemProps {
  icon: React.ElementType;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: SettingsMenuSize;
}

function SettingsToggleItem({ icon: Icon, label, checked, onChange, size = "desktop" }: SettingsToggleItemProps) {
  const isDesktop = size === "desktop";
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2">
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-gris-fonce-lm shrink-0" />
        <span className={cn("font-inter font-normal text-gris-fonce-lm", isDesktop ? "text-body" : "text-caption-desktop")}>
          {label}
        </span>
      </div>
      <Toggle
        checked={checked}
        onChange={onChange}
        size={isDesktop ? "desktop" : "mobile"}
        aria-label={label}
      />
    </div>
  );
}

interface SettingsSection {
  items: Array<{ type: "button" | "toggle"; icon: React.ElementType; label: string; danger?: boolean }>;
}

const sections: SettingsSection[] = [
  {
    items: [
      { type: "button", icon: User, label: "Mon compte" },
      { type: "button", icon: Bell, label: "Notifications" },
      { type: "button", icon: Shield, label: "Confidentialité" },
      { type: "button", icon: Globe, label: "Langue" },
    ],
  },
  {
    items: [
      { type: "toggle", icon: Moon, label: "Mode sombre" },
    ],
  },
  {
    items: [
      { type: "button", icon: HelpCircle, label: "Aide et support" },
      { type: "button", icon: LogOut, label: "Se déconnecter", danger: true },
    ],
  },
];

interface SettingsMenuProps {
  size?: SettingsMenuSize;
  className?: string;
}

export function SettingsMenu({ size = "desktop", className }: SettingsMenuProps) {
  const [darkMode, setDarkMode] = useState(false);
  const isDesktop = size === "desktop";

  return (
    <div
      className={cn(
        "bg-blanc-lm flex flex-col shadow-[0px_4px_8px_rgba(0,0,0,0.10)] rounded-r-md overflow-hidden",
        isDesktop ? "w-[366px] p-3" : "w-[288px] p-3",
        className,
      )}
      role="menu"
    >
      {sections.map((section, sIdx) => (
        <div key={sIdx}>
          {sIdx > 0 && <div className="border-t border-separateurs-lm my-1" />}
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) =>
              item.type === "toggle" ? (
                <SettingsToggleItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  checked={darkMode}
                  onChange={setDarkMode}
                  size={size}
                />
              ) : (
                <SettingsItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  danger={item.danger}
                  size={size}
                />
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
