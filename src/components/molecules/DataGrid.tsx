"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon, MoreVertical, Pin } from "lucide-react";
import { useState } from "react";

type DataGridSize = "large" | "small";

export interface DataGridColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  icon?: LucideIcon;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

export interface DataGridRow {
  id: string;
  [key: string]: unknown;
}

interface DataGridCellProps {
  children?: React.ReactNode;
  subtext?: string;
  icon?: React.ElementType;
  size?: DataGridSize;
  active?: boolean;
  className?: string;
}

function DataGridCell({ children, subtext, icon: Icon, size = "large", active = false, className }: DataGridCellProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 overflow-hidden",
        size === "large" ? "h-[56px]" : "h-[52px]",
        active && "bg-separateurs-lm",
        className,
      )}
    >
      {Icon && <Icon size={16} className="shrink-0 text-gris-clair-lm" />}
      <div className="flex flex-col flex-1 min-w-0 gap-0.5">
        <span className="text-body font-inter font-normal text-title-lm overflow-hidden text-ellipsis whitespace-nowrap">
          {children}
        </span>
        {subtext && (
          <span className="text-caption-mobile font-inter font-normal text-gris-clair-lm overflow-hidden text-ellipsis whitespace-nowrap">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}

interface DataGridHeaderProps {
  label: string;
  icon?: LucideIcon;
  size?: DataGridSize;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

function DataGridHeader({ label, icon: Icon, size = "large", active = false, onClick, className }: DataGridHeaderProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 text-left w-full transition-colors",
        size === "large" ? "h-[56px]" : "h-[52px]",
        active ? "text-title-lm font-semibold" : "text-gris-fonce-lm font-medium hover:text-title-lm",
        className,
      )}
    >
      {Icon && <Icon size={14} className="shrink-0" />}
      <span className="text-caption-desktop font-inter overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

interface DataGridProps<T extends DataGridRow = DataGridRow> {
  columns: DataGridColumn<T>[];
  rows: T[];
  size?: DataGridSize;
  onRowMenuClick?: (row: T) => void;
  onRowClick?: (row: T) => void;
  activeRowId?: string;
  className?: string;
}

export function DataGrid<T extends DataGridRow = DataGridRow>({
  columns,
  rows,
  size = "large",
  onRowMenuClick,
  onRowClick,
  activeRowId,
  className,
}: DataGridProps<T>) {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-separateurs-lm">
            {columns.map((col) => (
              <th key={col.key} className={cn("text-left", col.width)}>
                <DataGridHeader
                  label={col.header}
                  icon={col.icon}
                  size={size}
                />
              </th>
            ))}
            {/* Actions column */}
            <th className="w-[40px]" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isActive = row.id === activeRowId;
            const isHovered = row.id === hoveredRowId;

            return (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                onMouseEnter={() => setHoveredRowId(row.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                className={cn(
                  "border-b border-separateurs-lm last:border-b-0 cursor-pointer transition-colors",
                  isActive ? "bg-separateurs-lm" : isHovered && "bg-separateurs-lm/50",
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={col.width}>
                    {col.render ? (
                      col.render(row)
                    ) : (
                      <DataGridCell size={size}>
                        {String(row[col.key] ?? "")}
                      </DataGridCell>
                    )}
                  </td>
                ))}
                {/* Actions cell */}
                <td className="w-[40px]">
                  <div
                    className={cn(
                      "flex items-center justify-center transition-opacity",
                      size === "large" ? "h-[56px]" : "h-[52px]",
                      isHovered || isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <button
                      type="button"
                      aria-label="Menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowMenuClick?.(row);
                      }}
                      className="inline-flex items-center justify-center size-[24px] rounded-r-sm text-gris-clair-lm hover:bg-separateurs-lm transition-colors"
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className={cn(
                  "text-center text-gris-clair-lm text-body font-inter py-12",
                )}
              >
                Aucun élément
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Re-export helpers
export { DataGridCell, DataGridHeader };
