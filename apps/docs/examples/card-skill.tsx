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
  ResourceCardTitle,
} from "@zeron-ui/ui/card";
import { Download, Sparkles, Star } from "lucide-react";

export default function SkillCardExample() {
  return (
    <ResourceCard className="w-full max-w-sm">
      <ResourceCardHeader>
        <ResourceCardIcon className="size-8 rounded-md bg-muted">
          <Sparkles />
        </ResourceCardIcon>
        <ResourceCardBody>
          <ResourceCardTitle>合同审阅技能</ResourceCardTitle>
          <ResourceCardDescription>
            识别风险条款、提取关键义务，并生成结构化修改建议。
          </ResourceCardDescription>
        </ResourceCardBody>
      </ResourceCardHeader>

      <ResourceCardDivider />

      <ResourceCardFooter className="pt-3">
        <div className="flex min-w-0 flex-wrap items-center gap-3 text-muted-foreground text-xs">
          <Badge className="h-5 rounded-lg bg-muted px-1.5" variant="outline">
            官方精选
          </Badge>
          <span className="inline-flex items-center gap-1">
            <Star className="size-3" />
            1.2k
          </span>
        </div>
        <Button size="sm">
          <Download />
          安装
        </Button>
      </ResourceCardFooter>
    </ResourceCard>
  );
}
