import { Badge } from "@zeron-ui/ui/badge";
import {
  ResourceCard,
  ResourceCardBody,
  ResourceCardDescription,
  ResourceCardHeader,
  ResourceCardIcon,
  ResourceCardMeta,
  ResourceCardTitle,
} from "@zeron-ui/ui/card";
import { Lightbulb, WandSparkles } from "lucide-react";

export default function InspirationCardExample() {
  return (
    <ResourceCard
      className="min-h-[9.375rem] w-full max-w-sm bg-card p-4"
      data-interactive
    >
      <ResourceCardHeader className="p-0">
        <ResourceCardIcon>
          <Lightbulb />
        </ResourceCardIcon>
      </ResourceCardHeader>

      <ResourceCardBody className="mt-2 flex flex-1 flex-col gap-1">
        <ResourceCardTitle>会议纪要自动整理</ResourceCardTitle>
        <ResourceCardDescription>
          从录音和聊天记录中提炼结论、待办、负责人和截止时间。
        </ResourceCardDescription>
      </ResourceCardBody>

      <ResourceCardMeta className="mt-2 px-0">
        <Badge className="min-h-6 rounded-lg bg-card px-1.5" variant="outline">
          <WandSparkles className="size-3" />
          运营助理
        </Badge>
        <Badge
          className="min-h-6 rounded-lg bg-muted px-1.5"
          variant="secondary"
        >
          效率
        </Badge>
      </ResourceCardMeta>
    </ResourceCard>
  );
}
