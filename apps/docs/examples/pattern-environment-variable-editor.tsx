"use client";

import { Button } from "@zeron-ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@zeron-ui/ui/card";
import { KeyValue, type KeyValueItem } from "@zeron-ui/ui/key-value";
import { CheckIcon } from "lucide-react";
import { useMemo, useState } from "react";

const initialVariables: KeyValueItem[] = [
  {
    id: "database-url",
    key: "DATABASE_URL",
    masked: true,
    value: "postgres://production.internal/app",
  },
  {
    id: "next-public-api",
    key: "NEXT_PUBLIC_API",
    masked: false,
    value: "https://api.example.com",
  },
  {
    id: "stripe-secret",
    key: "STRIPE_SECRET",
    masked: true,
    value: "STRIPE_SECRET_PLACEHOLDER",
  },
];

export default function EnvironmentVariables() {
  const [variables, setVariables] = useState(initialVariables);
  const [draftVariables, setDraftVariables] = useState(initialVariables);
  const [editing, setEditing] = useState(false);

  const visibleCount = useMemo(
    () => variables.filter((variable) => variable.key.trim()).length,
    [variables],
  );

  function startEditing() {
    setDraftVariables(variables);
    setEditing(true);
  }

  function cancelEditing() {
    setDraftVariables(variables);
    setEditing(false);
  }

  function saveVariables() {
    const nextVariables = draftVariables
      .map((variable) => ({
        ...variable,
        key: variable.key.trim().toUpperCase().replaceAll(" ", "_"),
        value: variable.value.trim(),
      }))
      .filter((variable) => variable.key || variable.value);

    setVariables(nextVariables);
    setDraftVariables(nextVariables);
    setEditing(false);
  }

  return (
    <Card className="w-full max-w-xl rounded-lg">
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <CardDescription>Production - {visibleCount} variables</CardDescription>
      </CardHeader>
      <CardContent>
        <KeyValue
          editing={editing}
          items={editing ? draftVariables : variables}
          onItemsChange={setDraftVariables}
        />
      </CardContent>
      <CardFooter className="gap-2">
        {editing ? (
          <>
            <Button onClick={cancelEditing} type="button" variant="outline">
              Cancel
            </Button>
            <Button className="ml-auto" onClick={saveVariables} type="button">
              <CheckIcon />
              Save changes
            </Button>
          </>
        ) : (
          <>
            <Button onClick={startEditing} type="button" variant="outline">
              Edit
            </Button>
            <Button className="ml-auto" type="button">
              Deploy
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
