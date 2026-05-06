import { Button } from "@zeron-ui/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@zeron-ui/ui/item";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";

export default function PatternItemLayoutSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item className="bg-background" variant="outline">
        <ItemContent>
          <ItemTitle>Default Size Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item asChild className="bg-background" size="sm" variant="outline">
        <a href="#small-size-item">
          <ItemMedia>
            <BadgeCheckIcon className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Small Size Item</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  );
}
