import { Checkbox } from "@zeron-ui/ui/checkbox";
import { Input } from "@zeron-ui/ui/input";
import { Label } from "@zeron-ui/ui/label";

export default function LabelExample() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <Label htmlFor="label-email">Email</Label>
        <Input id="label-email" placeholder="hello@example.com" type="email" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-updates" />
        <Label htmlFor="label-updates">Receive product updates</Label>
      </div>
    </div>
  );
}
