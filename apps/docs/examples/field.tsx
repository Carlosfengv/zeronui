import { Button } from "@zeron-ui/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@zeron-ui/ui/field";
import { Input } from "@zeron-ui/ui/input";

export default function FieldExample() {
  return (
    <FieldSet className="w-full min-w-[420px] max-w-md">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-name">Name</FieldLabel>
          <Input id="field-name" placeholder="Ada Lovelace" />
          <FieldDescription>
            This name appears on your profile.
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="field-email">Email updates</FieldLabel>
            <FieldDescription>
              Receive product and security notifications.
            </FieldDescription>
          </FieldContent>
          <input
            className="size-4 rounded border border-input accent-primary"
            id="field-email"
            type="checkbox"
          />
        </Field>
        <FieldSeparator>or</FieldSeparator>
        <Button type="button">Save preferences</Button>
      </FieldGroup>
    </FieldSet>
  );
}
