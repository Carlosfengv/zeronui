import { Badge } from "@zeron-ui/ui/badge";
import { Button } from "@zeron-ui/ui/button";
import {
  ResourceCard,
  ResourceCardBody,
  ResourceCardDescription,
  ResourceCardDivider,
  ResourceCardFooter,
  ResourceCardHeader,
  ResourceCardIcon,
  ResourceCardMeta,
  ResourceCardTitle,
} from "@zeron-ui/ui/card";
import { Bot, MessageSquare, Settings } from "lucide-react";

export default function AgentCardExample() {
  return (
    <ResourceCard className="w-full max-w-md" data-interactive>
      <ResourceCardHeader>
        <ResourceCardIcon className="rounded-xl bg-background">
          <Bot />
        </ResourceCardIcon>
        <ResourceCardBody>
          <div className="flex min-w-0 items-center gap-2">
            <ResourceCardTitle>销售线索助理</ResourceCardTitle>
            <Badge className="h-5 rounded-md px-1.5 text-[11px]">云端</Badge>
          </div>
          <ResourceCardDescription>
            自动汇总客户意向、生成跟进建议，并把重要会话同步到团队看板。
          </ResourceCardDescription>
        </ResourceCardBody>
      </ResourceCardHeader>

      <ResourceCardMeta>
        <Badge variant="outline" className="h-6 rounded-lg bg-card px-2">
          工作区可见
        </Badge>
      </ResourceCardMeta>

      <ResourceCardDivider className="mt-3" />

      <ResourceCardFooter>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge className="h-6 rounded-lg border-transparent bg-[#E2F5C4] px-2 text-[#476700]">
            运行中
          </Badge>
          <Badge
            className="h-6 rounded-lg border-transparent bg-muted/60 px-2 font-normal text-foreground/80"
            variant="outline"
          >
            企业微信
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button aria-label="设置" size="icon-sm" variant="outline">
            <Settings />
          </Button>
          <Button size="sm">
            <MessageSquare />
            会话
          </Button>
        </div>
      </ResourceCardFooter>
    </ResourceCard>
  );
}
