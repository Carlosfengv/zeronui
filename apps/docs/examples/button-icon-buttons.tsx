import { Button } from "@zeron-ui/ui/button";
import {
  BellIcon,
  MoreHorizontalIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

export default function ButtonIconButtonsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button aria-label="搜索" size="icon-xs" variant="ghost">
        <SearchIcon />
      </Button>
      <Button aria-label="通知" size="icon-sm" variant="outline">
        <BellIcon />
      </Button>
      <Button aria-label="设置" size="icon" variant="secondary">
        <SettingsIcon />
      </Button>
      <Button aria-label="更多操作" size="icon-lg" variant="outline">
        <MoreHorizontalIcon />
      </Button>
    </div>
  );
}
