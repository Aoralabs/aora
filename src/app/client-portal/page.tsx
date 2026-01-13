"use client";

import { useState } from "react";

import { MessageCircle } from "lucide-react";

import {
  ClientPortalNavbar,
  NavItem,
  ViewMode,
} from "@/components/blocks/client-portal-navbar";
import { InboxView } from "@/components/client-portal/inbox-view";
import { ProjectsView } from "@/components/client-portal/projects-view";
import { RequestsView } from "@/components/client-portal/requests-view";
import { TeamsView } from "@/components/client-portal/teams-view";
import { ViewsView } from "@/components/client-portal/views-view";
import { Button } from "@/components/ui/button";

const VIEWS: Record<NavItem, React.ComponentType<{ viewMode: ViewMode }>> = {
  Proyectos: ProjectsView,
  Bandeja: InboxView,
  Solicitudes: RequestsView,
  Vistas: ViewsView,
  Equipos: TeamsView,
};

export default function ClientPortal() {
  const [activeItem, setActiveItem] = useState<NavItem>("Proyectos");
  const [viewMode, setViewMode] = useState<ViewMode>("demo");

  const ActiveView = VIEWS[activeItem];

  return (
    <div className="min-h-screen">
      <ClientPortalNavbar
        activeItem={activeItem}
        onItemChange={setActiveItem}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <div className="py-[50px]">
        <ActiveView viewMode={viewMode} />
      </div>

      <Button
        size="icon"
        className="fixed bottom-6 right-6 size-14 rounded-full shadow-lg"
      >
        <MessageCircle className="size-6" />
      </Button>
    </div>
  );
}
