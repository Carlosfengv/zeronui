import { Button } from "@zeron-ui/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@zeron-ui/ui/button-group";
import { ArchiveIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";

export default function ButtonGroupExample() {
  return (
    <ButtonGroup aria-label="消息操作">
      <Button variant="outline">
        <ArchiveIcon />
        归档
      </Button>
      <Button variant="outline">
        <Trash2Icon />
        删除
      </Button>
      <ButtonGroupSeparator />
      <Button aria-label="更多操作" size="icon" variant="outline">
        <MoreHorizontalIcon />
      </Button>
    </ButtonGroup>
  );
}
