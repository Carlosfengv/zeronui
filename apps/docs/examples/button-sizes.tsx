import { Button } from "@zeron-ui/ui/button";

export default function ButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">超小</Button>
      <Button size="sm">小号</Button>
      <Button>默认</Button>
      <Button size="lg">大号</Button>
    </div>
  );
}
