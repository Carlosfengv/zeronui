import { Avatar, AvatarFallback, AvatarImage } from "@zeron-ui/ui/avatar";

export default function AvatarExample() {
  return (
    <Avatar>
      <AvatarImage alt="shadcn" src="/avatars/shadcn.jpg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
