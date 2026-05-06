import { Status, StatusIndicator, StatusLabel } from "@zeron-ui/ui/status";

export default function StatusExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Status status="online">
        <StatusIndicator />
        <StatusLabel />
      </Status>
      <Status status="offline">
        <StatusIndicator />
        <StatusLabel />
      </Status>
      <Status status="maintenance">
        <StatusIndicator />
        <StatusLabel />
      </Status>
      <Status status="degraded">
        <StatusIndicator />
        <StatusLabel />
      </Status>
    </div>
  );
}
