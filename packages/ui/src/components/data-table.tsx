"use client";

import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type Table as TanstackTable,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  EyeOffIcon,
  PlusCircleIcon,
  Settings2Icon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export type DataTableColumnMeta = {
  label?: string;
  options?: DataTableFilterOption[];
  placeholder?: string;
  unit?: string;
  variant?: "text" | "number" | "select" | "multiSelect";
};

export type DataTableFilterOption = {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> extends DataTableColumnMeta {}
}

export type UseDataTableProps<TData> = Omit<
  TableOptions<TData>,
  | "getCoreRowModel"
  | "getFacetedRowModel"
  | "getFacetedUniqueValues"
  | "getFilteredRowModel"
  | "getPaginationRowModel"
  | "getSortedRowModel"
  | "onColumnFiltersChange"
  | "onColumnPinningChange"
  | "onColumnVisibilityChange"
  | "onPaginationChange"
  | "onRowSelectionChange"
  | "onSortingChange"
  | "state"
> & {
  columns: ColumnDef<TData, unknown>[];
  initialState?: TableOptions<TData>["initialState"];
};

export function useDataTable<TData>({
  initialState,
  ...options
}: UseDataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialState?.columnFilters ?? [],
  );
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    initialState?.columnPinning ?? {},
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState?.columnVisibility ?? {});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize: initialState?.pagination?.pageSize ?? 10,
  });
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {},
  );
  const [sorting, setSorting] = React.useState<SortingState>(
    initialState?.sorting ?? [],
  );

  const table = useReactTable({
    ...options,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState,
    onColumnFiltersChange: setColumnFilters,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnPinning,
      columnVisibility,
      pagination,
      rowSelection,
      sorting,
    },
  });

  return { table };
}

export type DataTableProps<TData> = React.ComponentProps<"div"> & {
  actionBar?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  table: TanstackTable<TData>;
};

export function DataTable<TData>({
  actionBar,
  children,
  className,
  emptyMessage = "No results.",
  table,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("flex w-full flex-col gap-2 overflow-auto", className)}
      data-slot="data-table"
      {...props}
    >
      {children}
      <div className="overflow-hidden rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    colSpan={header.colSpan}
                    key={header.id}
                    style={getCommonPinningStyles(header.column)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={getCommonPinningStyles(cell.column)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center text-muted-foreground"
                  colSpan={table.getAllLeafColumns().length}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}

export type DataTableColumnHeaderProps<TData, TValue> = React.ComponentProps<
  typeof DropdownMenuTrigger
> & {
  column: Column<TData, TValue>;
  label: string;
};

export function DataTableColumnHeader<TData, TValue>({
  className,
  column,
  label,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{label}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[popup-open]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
          className,
        )}
        {...props}
      >
        {label}
        {column.getCanSort() &&
          (column.getIsSorted() === "desc" ? (
            <ChevronDownIcon />
          ) : column.getIsSorted() === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          ))}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-32">
        <DropdownMenuGroup>
          {column.getCanSort() && (
            <>
              <DropdownMenuCheckboxItem
                checked={column.getIsSorted() === "asc"}
                className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
                onClick={() => column.toggleSorting(false)}
              >
                <ChevronUpIcon />
                Asc
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={column.getIsSorted() === "desc"}
                className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
                onClick={() => column.toggleSorting(true)}
              >
                <ChevronDownIcon />
                Desc
              </DropdownMenuCheckboxItem>
              {column.getIsSorted() && (
                <DropdownMenuItem
                  className="pl-2 [&_svg]:text-muted-foreground"
                  onClick={() => column.clearSorting()}
                >
                  <XIcon />
                  Reset
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuGroup>
        {column.getCanSort() && column.getCanHide() && (
          <DropdownMenuSeparator />
        )}
        {column.getCanHide() && (
          <DropdownMenuGroup>
            <DropdownMenuCheckboxItem
              checked={!column.getIsVisible()}
              className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOffIcon />
              Hide
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type DataTableToolbarProps<TData> = React.ComponentProps<"div"> & {
  table: TanstackTable<TData>;
};

export function DataTableToolbar<TData>({
  children,
  className,
  table,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) => column.getCanFilter() && column.columnDef.meta?.variant,
        ),
    [table],
  );

  return (
    <div
      aria-orientation="horizontal"
      className={cn(
        "flex w-full flex-nowrap items-center justify-between gap-2 overflow-x-auto p-1",
        className,
      )}
      role="toolbar"
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-2">
        {columns.map((column) => (
          <DataTableToolbarFilter column={column} key={column.id} />
        ))}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            className="border-dashed"
            onClick={() => table.resetColumnFilters()}
            size="sm"
            variant="outline"
          >
            <XIcon />
            Reset
          </Button>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

type DataTableToolbarFilterProps<TData> = {
  column: Column<TData>;
};

function DataTableToolbarFilter<TData>({
  column,
}: DataTableToolbarFilterProps<TData>) {
  const meta = column.columnDef.meta;
  const variant = meta?.variant;

  if (!variant) {
    return null;
  }

  if (variant === "select" || variant === "multiSelect") {
    return (
      <DataTableFacetedFilter
        column={column}
        multiple={variant === "multiSelect"}
        options={meta?.options ?? []}
        title={meta?.label ?? column.id}
      />
    );
  }

  if (variant === "number") {
    return (
      <div className="relative">
        <Input
          className={cn("h-8 w-[120px]", meta?.unit && "pr-8")}
          inputMode="numeric"
          onChange={(event) => column.setFilterValue(event.target.value)}
          placeholder={meta?.placeholder ?? meta?.label ?? column.id}
          type="number"
          value={(column.getFilterValue() as string) ?? ""}
        />
        {meta?.unit && (
          <span className="absolute inset-y-0 right-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
            {meta.unit}
          </span>
        )}
      </div>
    );
  }

  return (
    <Input
      className="h-8 w-40 lg:w-56"
      onChange={(event) => column.setFilterValue(event.target.value)}
      placeholder={meta?.placeholder ?? meta?.label ?? column.id}
      value={(column.getFilterValue() as string) ?? ""}
    />
  );
}

export type DataTableFacetedFilterProps<TData, TValue> = {
  column: Column<TData, TValue>;
  multiple?: boolean;
  options: DataTableFilterOption[];
  title: string;
};

export function DataTableFacetedFilter<TData, TValue>({
  column,
  multiple,
  options,
  title,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const detailsRef = React.useRef<HTMLDetailsElement>(null);
  const columnFilterValue = column.getFilterValue();
  const selectedValues = new Set(
    Array.isArray(columnFilterValue) ? columnFilterValue : [],
  );

  const onItemSelect = React.useCallback(
    (option: DataTableFilterOption, isSelected: boolean) => {
      if (multiple) {
        const nextValues = new Set(selectedValues);

        if (isSelected) {
          nextValues.delete(option.value);
        } else {
          nextValues.add(option.value);
        }

        const filterValue = Array.from(nextValues);
        column.setFilterValue(filterValue.length ? filterValue : undefined);
      } else {
        column.setFilterValue(isSelected ? undefined : [option.value]);
        detailsRef.current?.removeAttribute("open");
      }
    },
    [column, multiple, selectedValues],
  );

  return (
    <details className="relative" ref={detailsRef}>
      <summary
        className={cn(
          "inline-flex h-8 shrink-0 cursor-default list-none items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-dashed bg-background px-3 font-normal text-sm shadow-xs outline-none transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&::-webkit-details-marker]:hidden [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        )}
      >
        {selectedValues.size > 0 ? <XCircleIcon /> : <PlusCircleIcon />}
        {title}
        {selectedValues.size > 0 && (
          <>
            <span className="mx-0.5 h-4 w-px bg-border" />
            <Badge
              className="rounded-sm px-1 font-normal lg:hidden"
              variant="secondary"
            >
              {selectedValues.size}
            </Badge>
            <div className="hidden items-center gap-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge
                  className="rounded-sm px-1 font-normal"
                  variant="secondary"
                >
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge
                      className="rounded-sm px-1 font-normal"
                      key={option.value}
                      variant="secondary"
                    >
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </summary>
      <div
        className="absolute top-full left-0 z-50 mt-1 w-52 rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        role="menu"
      >
        <div className="px-2 py-1.5 font-medium text-sm">{title}</div>
        <div className="-mx-1 my-1 h-px bg-border" />
        {options.map((option) => {
          const isSelected = selectedValues.has(option.value);
          const Icon = option.icon;

          return (
            <button
              aria-checked={isSelected}
              className="relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-2 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              key={option.value}
              onClick={() => onItemSelect(option, isSelected)}
              role="menuitemcheckbox"
              type="button"
            >
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-sm border border-primary",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "opacity-50 [&_svg]:invisible",
                )}
              >
                <CheckIcon className="size-3" />
              </span>
              {Icon && <Icon className="size-4 text-muted-foreground" />}
              <span className="truncate">{option.label}</span>
            </button>
          );
        })}
        {selectedValues.size > 0 && (
          <>
            <div className="-mx-1 my-1 h-px bg-border" />
            <button
              className="relative flex w-full cursor-default select-none items-center justify-center rounded-sm px-2 py-1.5 text-center text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                column.setFilterValue(undefined);
                detailsRef.current?.removeAttribute("open");
              }}
              role="menuitem"
              type="button"
            >
              Clear filters
            </button>
          </>
        )}
      </div>
    </details>
  );
}

export type DataTablePaginationProps<TData> = React.ComponentProps<"div"> & {
  pageSizeOptions?: number[];
  table: TanstackTable<TData>;
};

export function DataTablePagination<TData>({
  className,
  pageSizeOptions = [10, 20, 30, 40, 50],
  table,
  ...props
}: DataTablePaginationProps<TData>) {
  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        className,
      )}
      data-slot="data-table-pagination"
      {...props}
    >
      <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap font-medium text-sm">Rows per page</p>
          <Select
            onValueChange={(value) => table.setPageSize(Number(value))}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className="h-8 w-18 data-size:h-8">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center whitespace-nowrap font-medium text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.max(table.getPageCount(), 1)}
        </div>
        <div className="flex items-center gap-2">
          <Button
            aria-label="Go to first page"
            className="hidden size-8 lg:flex"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            size="icon"
            variant="outline"
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            aria-label="Go to previous page"
            className="size-8"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="icon"
            variant="outline"
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            aria-label="Go to next page"
            className="size-8"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="icon"
            variant="outline"
          >
            <ChevronRightIcon />
          </Button>
          <Button
            aria-label="Go to last page"
            className="hidden size-8 lg:flex"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            size="icon"
            variant="outline"
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export type DataTableViewOptionsProps<TData> = React.ComponentProps<
  typeof DropdownMenuContent
> & {
  table: TanstackTable<TData>;
};

export function DataTableViewOptions<TData>({
  table,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide(),
        ),
    [table],
  );

  if (!columns.length) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Toggle columns"
          className="ml-auto h-8 font-normal"
          role="combobox"
          size="sm"
          variant="outline"
        >
          <Settings2Icon className="text-muted-foreground" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48" {...props}>
        <div className="px-2 py-1.5 font-medium text-sm">Toggle columns</div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              checked={column.getIsVisible()}
              key={column.id}
              onClick={() => column.toggleVisibility(!column.getIsVisible())}
            >
              <span className="truncate">
                {column.columnDef.meta?.label ?? column.id}
              </span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getCommonPinningStyles<TData, TValue>(
  column: Column<TData, TValue>,
): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    background: "var(--background)",
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px var(--border) inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px var(--border) inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    opacity: isPinned ? 0.98 : 1,
    position: isPinned ? "sticky" : "relative",
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    width: column.getSize(),
    zIndex: isPinned ? 1 : undefined,
  };
}
