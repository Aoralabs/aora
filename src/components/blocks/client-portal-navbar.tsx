import Link from "next/link";

import { Bell, Hexagon, Settings2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = ["Proyectos", "Bandeja", "Solicitudes", "Vistas", "Equipos"] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
export type ViewMode = "empty" | "demo";

interface ClientPortalNavbarProps {
  activeItem: NavItem;
  onItemChange: (item: NavItem) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ClientPortalNavbar({
  activeItem,
  onItemChange,
  viewMode,
  onViewModeChange,
}: ClientPortalNavbarProps) {
  return (
    <header className="relative border-b border-border bg-background">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/client-portal" className="text-white">
            <Hexagon className="size-7" strokeWidth={2} />
          </Link>

          <div className="h-14 w-px bg-border" />

          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => onItemChange(item)}
                className={cn(
                  "relative px-3 py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                  activeItem === item && "text-primary"
                )}
              >
                {item}
                <span
                  className={cn(
                    "absolute -bottom-[1px] left-3 right-3 h-0.5 bg-primary transition-all",
                    activeItem === item ? "opacity-100" : "opacity-0"
                  )}
                />
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-white">
                <Settings2 className="size-4" />
                {viewMode === "empty" ? "Empty State" : "Demo"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onViewModeChange("empty")}
                className={cn("cursor-pointer", viewMode === "empty" && "bg-muted")}
              >
                Empty State
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onViewModeChange("demo")}
                className={cn("cursor-pointer", viewMode === "demo" && "bg-muted")}
              >
                Demo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="text-muted-foreground transition-colors hover:text-white">
            <Bell className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
