"use client";

import { Badge } from "@zeron-ui/ui/badge";
import { Button } from "@zeron-ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zeron-ui/ui/card";
import { ShieldCheckIcon } from "lucide-react";
import { useMemo, useState } from "react";

type MindSection = {
  body: string[];
  description: string;
  filename: string;
  label: string;
  value: string;
};

const mindSections: [MindSection, ...MindSection[]] = [
  {
    body: [
      "优先遵守用户与团队设定的边界，不越权访问敏感数据。",
      "遇到高风险操作时先说明影响，再等待明确确认。",
      "输出需要可追溯，关键假设和限制要清楚呈现。",
    ],
    description: "智能体必须遵守的底线规则、安全框架和核心价值。",
    filename: "SOUL.md",
    label: "行为准则",
    value: "guardrails",
  },
  {
    body: [
      "先识别目标和上下文，再选择工具、数据源和执行顺序。",
      "长任务持续同步进度，遇到阻塞时给出下一步选择。",
      "交付前检查结果是否完整、准确、可复用。",
    ],
    description: "智能体的工作流、协作规则和任务编排方式。",
    filename: "AGENTS.md",
    label: "工作流",
    value: "workflow",
  },
  {
    body: [
      "保持专业、温和、直接的沟通风格。",
      "在不确定时主动澄清，而不是假装确定。",
      "关注业务目标，不把实现细节推给使用者消化。",
    ],
    description: "智能体名称、人格和身份定义。",
    filename: "IDENTITY.md",
    label: "智能体档案",
    value: "agent-profile",
  },
  {
    body: [
      "默认使用中文回复，保留必要的英文术语。",
      "偏好简洁的结论和明确的行动项。",
      "对重复任务保留上下文，减少用户重新说明的成本。",
    ],
    description: "用户基础信息与沟通偏好，帮助智能体调整回复方式。",
    filename: "USER.md",
    label: "用户档案",
    value: "user-profile",
  },
];

export default function AgentBehaviorGuidelines() {
  const [activeValue, setActiveValue] = useState("guardrails");

  const activeSection = useMemo(
    () =>
      mindSections.find((section) => section.value === activeValue) ??
      mindSections[0],
    [activeValue],
  );

  return (
    <Card className="w-full max-w-2xl rounded-lg">
      <CardHeader className="gap-3 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ShieldCheckIcon className="size-4" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base">行为准则</CardTitle>
            <CardDescription>
              将智能体的规则文件整理成可浏览、可编辑的详情面板。
            </CardDescription>
          </div>
        </div>
        <div
          aria-label="行为准则文件"
          className="flex flex-wrap gap-2"
          role="tablist"
        >
          {mindSections.map((section) => {
            const active = activeValue === section.value;

            return (
              <Button
                aria-selected={active}
                key={section.value}
                onClick={() => setActiveValue(section.value)}
                role="tab"
                size="sm"
                type="button"
                variant="outline"
                className={
                  active
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : undefined
                }
              >
                {section.label}
              </Button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <section
          aria-labelledby={`${activeSection.value}-title`}
          className="rounded-lg border bg-muted/30 p-4"
          role="tabpanel"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 py-1">
                <h3
                  className="font-medium text-sm"
                  id={`${activeSection.value}-title`}
                >
                  {activeSection.filename}
                </h3>
                <Badge variant="secondary">workspace</Badge>
                <p className="text-muted-foreground text-xs">
                  {activeSection.description}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button size="sm" type="button" variant="outline">
                Edit
              </Button>
            </div>
          </div>
          <ul className="grid gap-2 text-sm">
            {activeSection.body.map((item) => (
              <li className="flex gap-2" key={item}>
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-secondary-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
