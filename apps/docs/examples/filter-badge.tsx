"use client";

import { FilterBadge } from "@zeron-ui/ui/filter-badge";
import { useState } from "react";

const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
];

export default function FilterBadgeExample() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {filters.map((filter) => (
        <FilterBadge
          key={filter.value}
          onClick={() => setSelectedFilter(filter.value)}
          selected={selectedFilter === filter.value}
        >
          {filter.label}
        </FilterBadge>
      ))}
    </div>
  );
}
