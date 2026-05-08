import { Button } from "@zeron-ui/ui/button";
import { ArrowRightIcon, DownloadIcon, PlusIcon } from "lucide-react";

export default function ButtonIconsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <PlusIcon />
        新建项目
      </Button>
      <Button variant="outline">
        下载
        <DownloadIcon />
      </Button>
      <Button variant="secondary">
        继续
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
