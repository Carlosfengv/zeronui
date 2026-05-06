import { Switch } from "@zeron-ui/ui/switch";

export default function SwitchLabeledExample() {
  return (
    <label className="flex items-center gap-3 text-sm" htmlFor="notifications">
      <Switch defaultChecked id="notifications" name="notifications" />
      Enable release notifications
    </label>
  );
}
