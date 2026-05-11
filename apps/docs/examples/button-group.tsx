import { Button } from "@zeron-ui/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@zeron-ui/ui/button-group";
import {
  ArchiveIcon,
  ChevronDownIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";

export default function ButtonGroupExample() {
  return (
    <div className="flex flex-col items-start gap-4">
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

      <ButtonGroup aria-label="筛选操作">
        <Button size="sm" variant="outline">
          最近 7 天
        </Button>
        <Button size="sm" variant="outline">
          状态
          <ChevronDownIcon />
        </Button>
        <Button aria-label="更多筛选" size="icon-sm" variant="outline">
          <MoreHorizontalIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
