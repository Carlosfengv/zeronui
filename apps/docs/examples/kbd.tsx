import { Kbd, KbdGroup } from "@zeron-ui/ui/kbd";

export default function KbdExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Shift</Kbd>
        <Kbd>?</Kbd>
      </KbdGroup>
      <Kbd>Esc</Kbd>
    </div>
  );
}
