import { Badge } from "@zeron-ui/ui/badge";
import { Button } from "@zeron-ui/ui/button";
import {
  ResourceCard,
  ResourceCardBody,
  ResourceCardDescription,
  ResourceCardFooter,
  ResourceCardHeader,
  ResourceCardIcon,
  ResourceCardTitle,
} from "@zeron-ui/ui/card";
import { AppWindow, Download, ShieldCheck } from "lucide-react";

export default function AppCardExample() {
  return (
    <ResourceCard className="w-full max-w-sm min-h-[168px]" data-interactive>
      <div className="flex min-h-0 flex-1 flex-col">
        <ResourceCardHeader>
          <ResourceCardIcon>
            <AppWindow />
          </ResourceCardIcon>
          <ResourceCardBody>
            <ResourceCardTitle>飞书知识库</ResourceCardTitle>
            <ResourceCardDescription className="line-clamp-3">
              连接企业知识库，让智能体可以检索空间文档、页面和评论上下文。
            </ResourceCardDescription>
          </ResourceCardBody>
        </ResourceCardHeader>
      </div>

      <ResourceCardFooter className="border-t py-3">
        <div className="flex min-w-0 flex-wrap items-center gap-3 text-foreground/80 text-xs">
          <Badge className="h-6 rounded-lg bg-amber-50 px-1.5 text-amber-700">
            官方
          </Badge>
          <span className="inline-flex items-center gap-1">
            <Download className="size-3.5 text-foreground/55" />
            24k
          </span>
        </div>
        <Button size="sm">
          <ShieldCheck />
          连接
        </Button>
      </ResourceCardFooter>
    </ResourceCard>
  );
}
