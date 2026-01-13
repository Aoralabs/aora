import type { ViewMode } from "@/components/blocks/client-portal-navbar";

interface ViewsViewProps {
  viewMode: ViewMode;
}

export function ViewsView({ viewMode }: ViewsViewProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Vistas</h1>
    </div>
  );
}
