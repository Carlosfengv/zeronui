import { Button } from "@zeron-ui/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@zeron-ui/ui/item";
import { BadgeCheckIcon } from "lucide-react";

export default function ItemExample() {
  return (
    <Item className="w-96" variant="outline">
      <ItemMedia variant="icon">
        <BadgeCheckIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Basic Item</ItemTitle>
        <ItemDescription>Your profile has been verified.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Action
        </Button>
      </ItemActions>
    </Item>
  );
}
