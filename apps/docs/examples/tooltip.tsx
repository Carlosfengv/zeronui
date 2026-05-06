import { Button } from "@zeron-ui/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@zeron-ui/ui/tooltip";

export default function TooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>Draft changes are saved automatically.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
