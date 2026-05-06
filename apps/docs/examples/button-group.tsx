import { Button } from "@zeron-ui/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@zeron-ui/ui/button-group";
import { ArchiveIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";

export default function ButtonGroupExample() {
  return (
    <ButtonGroup aria-label="Message actions">
      <Button variant="outline">
        <ArchiveIcon />
        Archive
      </Button>
      <Button variant="outline">
        <Trash2Icon />
        Delete
      </Button>
      <ButtonGroupSeparator />
      <Button aria-label="More actions" size="icon" variant="outline">
        <MoreHorizontalIcon />
      </Button>
    </ButtonGroup>
  );
}
