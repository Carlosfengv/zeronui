"use client";

import { KeyValue, type KeyValueItem } from "@zeron-ui/ui/key-value";
import { useState } from "react";

const initialItems: KeyValueItem[] = [
  {
    id: "database-url",
    key: "DATABASE_URL",
    masked: true,
    value: "postgres://production.internal/app",
  },
  {
    id: "next-public-api",
    key: "NEXT_PUBLIC_API",
    value: "https://api.example.com",
  },
  {
    id: "stripe-secret",
    key: "STRIPE_SECRET",
    masked: true,
    value: "STRIPE_SECRET_PLACEHOLDER",
  },
];

export default function KeyValueExample() {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState(false);

  return (
    <div className="grid w-full max-w-xl gap-3">
      <KeyValue editing={editing} items={items} onItemsChange={setItems} />
      <button
        className="justify-self-start rounded-md border bg-background px-3 py-1.5 font-medium text-sm shadow-xs"
        onClick={() => setEditing((currentEditing) => !currentEditing)}
        type="button"
      >
        {editing ? "Preview values" : "Edit values"}
      </button>
    </div>
  );
}
