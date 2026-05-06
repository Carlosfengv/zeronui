"use client";

import { Button } from "@zeron-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@zeron-ui/ui/dropdown-menu";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@zeron-ui/ui/item";
import { ChevronDownIcon } from "lucide-react";

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

export default function PatternItemInteractiveDropdown() {
  return (
    <div className="flex min-h-64 w-full max-w-md flex-col items-center gap-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-fit" size="sm" variant="outline">
            Select <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 [--radius:0.65rem]">
          {people.map((person) => (
            <DropdownMenuItem className="p-0" key={person.username}>
              <Item className="w-full p-2" size="sm">
                <ItemMedia variant="avatar">
                  <img
                    alt=""
                    className="size-full object-cover"
                    src={person.avatar}
                  />
                </ItemMedia>
                <ItemContent className="gap-0.5">
                  <ItemTitle>{person.username}</ItemTitle>
                  <ItemDescription>{person.email}</ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
