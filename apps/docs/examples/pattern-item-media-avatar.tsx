import { Button } from "@zeron-ui/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@zeron-ui/ui/item";
import { PlusIcon } from "lucide-react";

export default function PatternItemMediaAvatar() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item className="bg-background" variant="outline">
        <ItemMedia variant="avatar">
          <img
            alt=""
            className="size-full object-cover"
            src="https://github.com/haydenbleasel.png"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Hayden Bleasel</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            aria-label="Invite"
            className="rounded-full"
            size="sm"
            variant="outline"
          >
            <PlusIcon />
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
