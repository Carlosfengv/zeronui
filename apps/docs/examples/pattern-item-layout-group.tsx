import { Button } from "@zeron-ui/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@zeron-ui/ui/item";
import { PlusIcon } from "lucide-react";
import { Fragment } from "react";

const people = [
  {
    avatar: "https://github.com/haydenbleasel.png",
    email: "h****n@vercel.com",
    username: "haydenbleasel",
  },
  {
    avatar: "https://github.com/shadcn.png",
    email: "s****n@vercel.com",
    username: "shadcn",
  },
  {
    avatar: "https://github.com/rauchg.png",
    email: "r****g@vercel.com",
    username: "rauchg",
  },
];

export default function PatternItemLayoutGroup() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup>
        {people.map((person, index) => (
          <Fragment key={person.username}>
            <Item>
              <ItemMedia variant="avatar">
                <img
                  alt=""
                  className="size-full object-cover"
                  src={person.avatar}
                />
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <PlusIcon />
                </Button>
              </ItemActions>
            </Item>
            {index !== people.length - 1 && <ItemSeparator />}
          </Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
