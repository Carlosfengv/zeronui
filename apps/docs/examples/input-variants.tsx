import { Input } from "@zeron-ui/ui/input";

export default function InputVariantsExample() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input placeholder="默认描边" variant="outline" />
      <Input placeholder="无边框" variant="ghost" />
      <Input placeholder="次级填充" variant="secondary" />
    </div>
  );
}
