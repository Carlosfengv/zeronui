"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  DataGrid,
  DataGridKeyboardShortcuts,
  useDataGrid,
} from "@zeron-ui/ui/data-grid";
import * as React from "react";

type Release = {
  id: string;
  title?: string;
  owner?: string;
  status?: "planned" | "active" | "blocked" | "shipped";
  priority?: "low" | "medium" | "high";
  reviewed?: boolean;
  effort?: number;
  due?: string;
};

const initialReleases: Release[] = [
  {
    id: "rel-1",
    title: "Command palette polish",
    owner: "Maya Chen",
    status: "active",
    priority: "high",
    reviewed: true,
    effort: 8,
    due: "2026-05-18",
  },
  {
    id: "rel-2",
    title: "Billing export",
    owner: "Jon Bell",
    status: "planned",
    priority: "medium",
    reviewed: false,
    effort: 5,
    due: "2026-05-24",
  },
  {
    id: "rel-3",
    title: "Workspace audit trail",
    owner: "Nina Patel",
    status: "blocked",
    priority: "high",
    reviewed: false,
    effort: 13,
    due: "2026-06-02",
  },
  {
    id: "rel-4",
    title: "Inline filters",
    owner: "Ada Park",
    status: "shipped",
    priority: "low",
    reviewed: true,
    effort: 3,
    due: "2026-04-28",
  },
];

export default function DataGridExample() {
  const [data, setData] = React.useState<Release[]>(initialReleases);

  const columns = React.useMemo<ColumnDef<Release>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        id: "title",
        meta: { cell: { variant: "short-text" } },
        minSize: 190,
      },
      {
        accessorKey: "owner",
        header: "Owner",
        id: "owner",
        meta: { cell: { variant: "short-text" } },
        minSize: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        id: "status",
        meta: {
          cell: {
            options: [
              { label: "Planned", value: "planned" },
              { label: "Active", value: "active" },
              { label: "Blocked", value: "blocked" },
              { label: "Shipped", value: "shipped" },
            ],
            variant: "select",
          },
        },
        minSize: 130,
      },
      {
        accessorKey: "priority",
        header: "Priority",
        id: "priority",
        meta: {
          cell: {
            options: [
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ],
            variant: "select",
          },
        },
        minSize: 120,
      },
      {
        accessorKey: "reviewed",
        header: "Reviewed",
        id: "reviewed",
        meta: { cell: { variant: "checkbox" } },
        minSize: 110,
      },
      {
        accessorKey: "effort",
        header: "Effort",
        id: "effort",
        meta: { cell: { max: 21, min: 1, variant: "number" } },
        minSize: 100,
      },
      {
        accessorKey: "due",
        header: "Due",
        id: "due",
        meta: { cell: { variant: "date" } },
        minSize: 130,
      },
    ],
    [],
  );

  const onRowAdd = React.useCallback(() => {
    setData((rows) => [...rows, { id: `rel-${rows.length + 1}` }]);

    return {
      columnId: "title",
      rowIndex: data.length,
    };
  }, [data.length]);

  const { table, ...dataGridProps } = useDataGrid({
    columns,
    data,
    enablePaste: true,
    getRowId: (row) => row.id,
    initialState: { columnPinning: { left: ["title"] } },
    onDataChange: setData,
    onRowAdd,
  });

  return (
    <div className="w-full max-w-4xl">
      <DataGridKeyboardShortcuts enableSearch={!!dataGridProps.searchState} />
      <DataGrid {...dataGridProps} height={360} table={table} />
    </div>
  );
}
