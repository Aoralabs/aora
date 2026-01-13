import Link from "next/link";

import { Bell, Hexagon } from "lucide-react";

import { cn } from "@/lib/utils";

export const NAV_ITEMS = ["Proyectos", "Bandeja", "Solicitudes", "Vistas", "Equipos"] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

interface ClientPortalNavbarProps {
  activeItem: NavItem;
  onItemChange: (item: NavItem) => void;
}

export function ClientPortalNavbar({ activeItem, onItemChange }: ClientPortalNavbarProps) {

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

        <button className="text-muted-foreground transition-colors hover:text-white">
          <Bell className="size-5" />
        </button>
      </div>
    </header>
  );
}
