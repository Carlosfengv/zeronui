"use client";

import { KeyValue, type KeyValueItem } from "@zeron-ui/ui/key-value";

const items: KeyValueItem[] = [
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
    id: "node-env",
    key: "NODE_ENV",
    value: "production",
  },
];

export default function KeyValueDisplayExample() {
  return (
    <div className="w-full max-w-xl">
      <KeyValue items={items} />
    </div>
  );
}
