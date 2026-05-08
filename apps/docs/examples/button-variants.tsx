import { Button } from "@zeron-ui/ui/button";

export default function ButtonVariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>默认</Button>
      <Button variant="secondary">次级</Button>
      <Button variant="outline">描边</Button>
      <Button variant="ghost">幽灵</Button>
      <Button variant="link">链接</Button>
      <Button variant="destructive">危险</Button>
    </div>
  );
}
