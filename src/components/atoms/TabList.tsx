"use client";

import { cn } from "@/lib/utils";

type TabSize = "large" | "small";

interface Tab {
  id: string;
  label: string;
}

interface TabListProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  size?: TabSize;
  className?: string;
}

export function TabList({
  tabs,
  activeTab,
  onTabChange,
  size = "large",
  className,
}: TabListProps) {
  const isLarge = size === "large";

  return (
    <div
      className={cn(
        "flex items-center border-b border-separateurs-lm",
        className,
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "font-inter font-semibold whitespace-nowrap transition-colors",
              isLarge ? "text-body py-3" : "text-caption-desktop py-2",
              isActive
                ? "text-orange border-b-2 border-orange px-4"
                : "text-gris-fonce-lm border-b-2 border-transparent px-6",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
