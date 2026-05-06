import { Checkbox } from "@zeron-ui/ui/checkbox";

export default function CheckboxExample() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox defaultChecked id="terms" />
      <label className="font-medium text-sm" htmlFor="terms">
        Accept terms and conditions
      </label>
    </div>
  );
}
