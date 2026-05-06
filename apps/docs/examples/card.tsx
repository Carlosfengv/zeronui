import {
  Card,
  CardFrame,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
} from "@zeron-ui/ui/card";

export default function CardExample() {
  return (
    <CardFrame className="w-80">
      <CardFrameHeader>
        <CardFrameTitle>Component cover</CardFrameTitle>
        <CardFrameDescription>
          A framed card for component galleries.
        </CardFrameDescription>
      </CardFrameHeader>
      <Card className="min-h-44">
        <CardPanel className="flex items-center justify-center">
          <div className="flex w-44 flex-col gap-3 rounded-2xl border bg-card p-5 shadow-md/5">
            <div className="h-2 w-20 rounded-full bg-muted-foreground/40" />
            <div className="h-2 w-full rounded-full bg-muted-foreground/20" />
            <div className="h-2 w-2/3 rounded-full bg-muted-foreground/20" />
            <div className="mt-4 h-8 w-24 rounded-md bg-primary" />
          </div>
        </CardPanel>
      </Card>
    </CardFrame>
  );
}
