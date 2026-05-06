import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@zeron-ui/ui/item";

const models = [
  {
    description: "Everyday tasks and UI generation.",
    image: "https://placehold.co/640x480",
    name: "v0-1.5-sm",
  },
  {
    description: "Advanced thinking or reasoning.",
    image: "https://placehold.co/640x480",
    name: "v0-1.5-lg",
  },
  {
    description: "Open Source model for everyone.",
    image: "https://placehold.co/640x480",
    name: "v0-2.0-mini",
  },
];

export default function PatternItemLayoutHeader() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <ItemGroup className="grid grid-cols-3 gap-4">
        {models.map((model) => (
          <Item className="bg-background" key={model.name} variant="outline">
            <ItemHeader>
              <img
                alt={model.name}
                className="aspect-[3/2] w-full rounded-sm object-cover"
                height={480}
                src={model.image}
                width={640}
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{model.name}</ItemTitle>
              <ItemDescription>{model.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
