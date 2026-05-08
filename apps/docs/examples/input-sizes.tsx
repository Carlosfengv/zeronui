import { Input } from "@zeron-ui/ui/input";

export default function InputSizesExample() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input placeholder="小号输入框" size="sm" />
      <Input placeholder="默认输入框" />
      <Input placeholder="大号输入框" size="lg" />
      <Input placeholder="超大输入框" size="xl" />
    </div>
  );
}
