"use client";

import { EyeIcon, EyeOffIcon, PlusIcon, Trash2Icon } from "lucide-react";
import type * as React from "react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";

export type KeyValueItem = {
  id: string;
  key: string;
  masked?: boolean;
  value: string;
};

export type KeyValueProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  addLabel?: string;
  canAdd?: boolean;
  canRemove?: boolean;
  editing?: boolean;
  items: KeyValueItem[];
  keyPlaceholder?: string;
  onItemsChange?: (items: KeyValueItem[]) => void;
  valuePlaceholder?: string;
};

function createItem(): KeyValueItem {
  return {
    id: crypto.randomUUID(),
    key: "",
    masked: true,
    value: "",
  };
}

export function KeyValue({
  addLabel = "Add variable",
  canAdd,
  canRemove,
  className,
  editing = false,
  items,
  keyPlaceholder = "VARIABLE_NAME",
  onItemsChange,
  valuePlaceholder = "value",
  ...props
}: KeyValueProps) {
  const [visibleValueIds, setVisibleValueIds] = useState<Set<string>>(
    () => new Set(),
  );
  const showAddButton = canAdd ?? editing;
  const showRemoveButton = canRemove ?? editing;

  function updateItem(id: string, field: "key" | "value", value: string) {
    onItemsChange?.(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removeItem(id: string) {
    onItemsChange?.(items.filter((item) => item.id !== id));
  }

  function addItem() {
    onItemsChange?.([...items, createItem()]);
  }

  function toggleValueVisibility(id: string) {
    setVisibleValueIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(id)) {
        nextIds.delete(id);
      } else {
        nextIds.add(id);
      }

      return nextIds;
    });
  }

  return (
    <div
      className={cn("flex w-full flex-col gap-2", className)}
      data-slot="key-value"
      {...props}
    >
      {items.map((item) => {
        const valueIsVisible = visibleValueIds.has(item.id);
        const displayValue =
          item.masked && !valueIsVisible ? "••••••••" : item.value;

        return (
          <div
            className={cn(
              "grid gap-2 rounded-md p-2 ring ring-border",
              editing
                ? "grid-cols-[minmax(9rem,1fr)_minmax(0,1.35fr)_auto]"
                : "grid-cols-[minmax(9rem,1fr)_minmax(0,1.35fr)]",
            )}
            data-slot="key-value-item"
            key={item.id}
          >
            {editing ? (
              <>
                <Input
                  aria-label="Key"
                  className="h-8 min-w-0 font-mono text-xs uppercase"
                  onChange={(event) =>
                    updateItem(item.id, "key", event.target.value)
                  }
                  placeholder={keyPlaceholder}
                  value={item.key}
                />
                {item.masked ? (
                  <InputGroup className="h-8 min-w-0">
                    <InputGroupInput
                      aria-label={`${item.key || "Key"} value`}
                      className="h-8 font-mono text-xs"
                      onChange={(event) =>
                        updateItem(item.id, "value", event.target.value)
                      }
                      placeholder={valuePlaceholder}
                      type={valueIsVisible ? "text" : "password"}
                      value={item.value}
                    />
                    <InputGroupAddon align="inline-end" className="px-1">
                      <InputGroupButton
                        aria-label={
                          valueIsVisible ? "Hide value" : "Show value"
                        }
                        onClick={() => toggleValueVisibility(item.id)}
                        size="icon-xs"
                      >
                        {valueIsVisible ? <EyeOffIcon /> : <EyeIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                ) : (
                  <Input
                    aria-label={`${item.key || "Key"} value`}
                    className="h-8 min-w-0 font-mono text-xs"
                    onChange={(event) =>
                      updateItem(item.id, "value", event.target.value)
                    }
                    placeholder={valuePlaceholder}
                    value={item.value}
                  />
                )}
                {showRemoveButton ? (
                  <Button
                    aria-label="Remove item"
                    onClick={() => removeItem(item.id)}
                    size="icon-sm"
                    type="button"
                    variant="ghost"
                  >
                    <Trash2Icon />
                  </Button>
                ) : null}
              </>
            ) : (
              <>
                <span className="min-w-0 truncate font-medium font-mono text-xs leading-8">
                  {item.key}
                </span>
                <div className="flex min-w-0 items-center justify-end gap-2">
                  <span className="min-w-0 truncate font-mono text-muted-foreground text-xs leading-8">
                    {displayValue}
                  </span>
                  {item.masked ? (
                    <Button
                      aria-label={valueIsVisible ? "Hide value" : "Show value"}
                      onClick={() => toggleValueVisibility(item.id)}
                      size="icon-xs"
                      type="button"
                      variant="ghost"
                    >
                      {valueIsVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </Button>
                  ) : null}
                </div>
              </>
            )}
          </div>
        );
      })}

      {showAddButton ? (
        <Button
          className="mt-1 w-full justify-start"
          onClick={addItem}
          type="button"
          variant="ghost"
        >
          <PlusIcon />
          {addLabel}
        </Button>
      ) : null}
    </div>
  );
}
