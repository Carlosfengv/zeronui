import { Alert, AlertDescription, AlertTitle } from "@zeron-ui/ui/alert";
import { Terminal } from "lucide-react";

export default function AlertExample() {
  return (
    <Alert className="max-w-md">
      <Terminal />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        You can install components from the Zeron UI registry.
      </AlertDescription>
    </Alert>
  );
}
