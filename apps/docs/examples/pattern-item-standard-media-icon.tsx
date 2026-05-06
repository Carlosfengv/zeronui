import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@zeron-ui/ui/item";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";

export default function PatternItemStandardMediaIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item asChild className="bg-background" size="sm" variant="outline">
        <a href="#standard-media-icon">
          <ItemMedia>
            <BadgeCheckIcon className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </ItemActions>
        </a>
      </Item>
    </div>
  );
}
