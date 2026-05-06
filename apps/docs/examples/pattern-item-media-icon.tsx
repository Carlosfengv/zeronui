import { Button } from "@zeron-ui/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@zeron-ui/ui/item";
import { ShieldAlertIcon } from "lucide-react";

export default function PatternItemMediaIcon() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item className="bg-background" variant="outline">
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>
            New login detected from an unknown device.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Review
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
