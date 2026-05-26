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

export default function KeyValueEditExample() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="w-full max-w-xl">
      <KeyValue
        addLabel="添加变量"
        editing
        items={items}
        onItemsChange={setItems}
        valuePlaceholder="输入变量值"
      />
    </div>
  );
}
