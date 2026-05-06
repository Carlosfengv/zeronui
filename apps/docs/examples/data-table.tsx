"use client";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { Badge } from "@zeron-ui/ui/badge";
import { Button } from "@zeron-ui/ui/button";
import { Checkbox } from "@zeron-ui/ui/checkbox";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableToolbar,
  useDataTable,
} from "@zeron-ui/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@zeron-ui/ui/dropdown-menu";
import {
  BadgeDollarSignIcon,
  CheckCircle2Icon,
  CircleDashedIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";

type Project = {
  budget: number;
  id: string;
  owner: string;
  status: "active" | "paused";
  title: string;
};

const projects: Project[] = [
  {
    budget: 50_000,
    id: "prj-1",
    owner: "Ada Chen",
    status: "active",
    title: "Atlas billing",
  },
  {
    budget: 75_000,
    id: "prj-2",
    owner: "Nina Patel",
    status: "paused",
    title: "Onboarding refresh",
  },
  {
    budget: 32_500,
    id: "prj-3",
    owner: "Mika Torres",
    status: "active",
    title: "Usage reports",
  },
  {
    budget: 108_000,
    id: "prj-4",
    owner: "Jon Bell",
    status: "active",
    title: "Enterprise controls",
  },
  {
    budget: 46_000,
    id: "prj-5",
    owner: "Leah Kim",
    status: "paused",
    title: "Mobile command bar",
  },
];

export default function DataTableExample() {
  const columns = React.useMemo<ColumnDef<Project>[]>(
    () => [
      {
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
        enableHiding: false,
        enableSorting: false,
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        ),
        id: "select",
        size: 32,
      },
      {
        accessorKey: "title",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.title}</div>
        ),
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} label="Title" />
        ),
        meta: {
          label: "Title",
          placeholder: "Search title...",
          variant: "text",
        },
      },
      {
        accessorKey: "status",
        cell: ({ row }) => {
          const active = row.original.status === "active";
          const Icon = active ? CheckCircle2Icon : CircleDashedIcon;

          return (
            <Badge className="capitalize" variant="outline">
              <Icon />
              {row.original.status}
            </Badge>
          );
        },
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} label="Status" />
        ),
        filterFn: (row, id, value) =>
          Array.isArray(value) && value.includes(row.getValue(id)),
        meta: {
          label: "Status",
          options: [
            {
              icon: CheckCircle2Icon,
              label: "Active",
              value: "active",
            },
            {
              icon: CircleDashedIcon,
              label: "Paused",
              value: "paused",
            },
          ],
          variant: "multiSelect",
        },
      },
      {
        accessorKey: "owner",
        cell: ({ row }) => (
          <div className="text-muted-foreground">{row.original.owner}</div>
        ),
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} label="Owner" />
        ),
        enableColumnFilter: false,
        meta: {
          label: "Owner",
        },
      },
      {
        accessorKey: "budget",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1">
            <BadgeDollarSignIcon className="size-4 text-muted-foreground" />
            {row.original.budget.toLocaleString()}
          </div>
        ),
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader
            className="ml-auto"
            column={column}
            label="Budget"
          />
        ),
        enableColumnFilter: false,
        meta: {
          label: "Budget",
        },
      },
      {
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Open row menu" size="icon-sm" variant="ghost">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableHiding: false,
        id: "actions",
        size: 40,
      },
    ],
    [],
  );

  const { table } = useDataTable({
    columns,
    data: projects,
    getRowId: (row) => row.id,
    initialState: {
      columnPinning: { right: ["actions"] },
      pagination: { pageIndex: 0, pageSize: 5 },
      sorting: [{ desc: false, id: "title" }],
    },
  });

  return (
    <div className="w-full max-w-3xl">
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
}
