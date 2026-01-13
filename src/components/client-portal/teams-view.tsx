import type { ViewMode } from "@/components/blocks/client-portal-navbar";

interface TeamsViewProps {
  viewMode: ViewMode;
}

export function TeamsView({ viewMode }: TeamsViewProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Equipos</h1>
    </div>
  );
}
