import { Status, StatusIndicator, StatusLabel } from "@zeron-ui/ui/status";

export default function StatusCustomExample() {
  return (
    <Status
      className="gap-4 rounded-full px-6 py-2 text-sm"
      status="online"
      variant="outline"
    >
      <StatusIndicator />
      <StatusLabel className="font-mono">Fully operational</StatusLabel>
    </Status>
  );
}
