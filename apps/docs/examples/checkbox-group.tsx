import { CheckboxGroup, CheckboxGroupItem } from "@zeron-ui/ui/checkbox-group";

export default function CheckboxGroupExample() {
  return (
    <CheckboxGroup aria-label="Desktop items" className="w-72">
      <CheckboxGroupItem defaultChecked id="hard-disks">
        Hard disks
      </CheckboxGroupItem>
      <CheckboxGroupItem id="external-disks">External disks</CheckboxGroupItem>
      <CheckboxGroupItem id="servers">Connected servers</CheckboxGroupItem>
    </CheckboxGroup>
  );
}
