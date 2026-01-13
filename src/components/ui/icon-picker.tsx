"use client";

import { useMemo, useState } from "react";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Lista de iconos comunes para mostrar por defecto
const COMMON_ICONS = [
  "Folder",
  "FolderOpen",
  "File",
  "FileText",
  "Code",
  "Globe",
  "Laptop",
  "Smartphone",
  "Layout",
  "ShoppingCart",
  "Briefcase",
  "MessageSquare",
  "Settings",
  "Star",
  "Zap",
  "Rocket",
  "Heart",
  "Home",
  "User",
  "Users",
  "Mail",
  "Calendar",
  "Clock",
  "Camera",
  "Image",
  "Video",
  "Music",
  "Headphones",
  "Mic",
  "Phone",
  "MapPin",
  "Navigation",
  "Search",
  "Filter",
  "Download",
  "Upload",
  "Cloud",
  "Database",
  "Server",
  "Cpu",
  "Monitor",
  "Tv",
  "Wifi",
  "Bluetooth",
  "Battery",
  "Plug",
  "Lightbulb",
  "Sun",
  "Moon",
  "Palette",
  "Pen",
  "Pencil",
  "Edit",
  "Trash",
  "Archive",
  "Bookmark",
  "Tag",
  "Flag",
  "Bell",
  "AlertCircle",
  "CheckCircle",
  "XCircle",
  "Info",
  "HelpCircle",
  "Lock",
  "Unlock",
  "Key",
  "Shield",
  "Eye",
  "EyeOff",
  "Link",
  "ExternalLink",
  "Share",
  "Send",
  "Inbox",
  "Package",
  "Gift",
  "ShoppingBag",
  "CreditCard",
  "DollarSign",
  "TrendingUp",
  "TrendingDown",
  "BarChart",
  "PieChart",
  "Activity",
  "Target",
  "Award",
  "Trophy",
  "Medal",
  "Crown",
  "Gem",
  "Flame",
  "Sparkles",
  "Wand",
  "Bot",
  "Brain",
  "Gamepad",
  "Puzzle",
];

type IconEntry = {
  name: string;
  Component: LucideIcon;
};

export function useIconPicker() {
  const [search, setSearch] = useState("");

  const icons = useMemo(() => {
    const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;
    const allIcons: IconEntry[] = COMMON_ICONS.map((name) => ({
      name,
      Component: iconMap[name],
    })).filter((icon) => icon.Component);

    if (!search) return allIcons;

    return allIcons.filter((icon) =>
      icon.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return { search, setSearch, icons };
}

export function IconRenderer({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return <LucideIcons.HelpCircle className={className} />;
  }

  return <IconComponent className={className} />;
}
