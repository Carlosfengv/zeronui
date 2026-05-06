import { Card, CardContent, CardHeader, CardTitle } from "@zeron-ui/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@zeron-ui/ui/item";

const quotaItems = [
  {
    name: "Edge Requests",
    percentage: 67.34,
    value: "$1.83K",
  },
  {
    name: "Fast Data Transfer",
    percentage: 52.18,
    value: "$952.51",
  },
  {
    name: "Monitoring data points",
    percentage: 89.42,
    value: "$901.20",
  },
  {
    name: "Web Analytics Events",
    percentage: 45.67,
    value: "$603.71",
  },
  {
    name: "ISR Writes",
    percentage: 26.23,
    value: "524.52K / 2M",
  },
  {
    name: "Function Duration",
    percentage: 5.11,
    value: "5.11 GB Hrs / 1K GB Hrs",
  },
];

function CircularGauge({ percentage }: { percentage: number }) {
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
  const circumference = 2 * Math.PI * 42.5;
  const strokePercent = (normalizedPercentage / 100) * circumference;

  return (
    <svg
      aria-hidden="true"
      className="-rotate-90"
      fill="none"
      height="16"
      strokeWidth="2"
      viewBox="0 0 100 100"
      width="16"
    >
      <circle
        className="opacity-20"
        cx="50"
        cy="50"
        r="42.5"
        stroke="currentColor"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
        }}
      />
      <circle
        className="transition-all duration-300"
        cx="50"
        cy="50"
        r="42.5"
        stroke="currentColor"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
        style={{
          strokeDasharray: `${strokePercent} ${circumference}`,
        }}
      />
    </svg>
  );
}

export default function Quota() {
  return (
    <Card className="w-full max-w-sm gap-4 rounded-lg">
      <CardHeader className="px-5 pt-5 pb-0">
        <CardTitle className="text-sm">5 days remaining in cycle</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pt-0 pb-5">
        <ItemGroup className="gap-0">
          {quotaItems.map((item) => (
            <Item
              asChild
              className="px-0 hover:bg-transparent"
              key={item.name}
              size="xs"
            >
              <a href="#quota-details">
                <ItemMedia
                  className="size-4 border-0 bg-transparent text-primary"
                  variant="icon"
                >
                  <CircularGauge percentage={item.percentage} />
                </ItemMedia>
                <ItemContent className="min-w-0">
                  <ItemTitle className="truncate text-sm">
                    {item.name}
                  </ItemTitle>
                </ItemContent>
                <ItemActions>
                  <span className="font-mono font-medium text-muted-foreground text-xs tabular-nums">
                    {item.value}
                  </span>
                </ItemActions>
              </a>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
