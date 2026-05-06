import { CopyCommandButton } from "./copy-command-button";

type InstallerProps = {
  packageName: string;
};

export function Installer({ packageName }: InstallerProps) {
  const command = `npx shadcn@latest add @zeron-ui/${packageName}`;

  return (
    <div className="not-prose overflow-hidden rounded-lg border bg-background">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-muted-foreground text-sm">CLI</span>
        <CopyCommandButton value={command} />
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-sm">
        <code>{command}</code>
      </pre>
    </div>
  );
}
