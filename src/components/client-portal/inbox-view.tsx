import type { ViewMode } from "@/components/blocks/client-portal-navbar";

interface InboxViewProps {
  viewMode: ViewMode;
}

export function InboxView({ viewMode }: InboxViewProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bandeja</h1>
    </div>
  );
}
