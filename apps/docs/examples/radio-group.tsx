import { RadioGroup, RadioGroupItem } from "@zeron-ui/ui/radio-group";

export default function RadioGroupExample() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem id="default" value="default" />
        <label className="font-medium text-sm" htmlFor="default">
          Default
        </label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem id="comfortable" value="comfortable" />
        <label className="font-medium text-sm" htmlFor="comfortable">
          Comfortable
        </label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem id="compact" value="compact" />
        <label className="font-medium text-sm" htmlFor="compact">
          Compact
        </label>
      </div>
    </RadioGroup>
  );
}
