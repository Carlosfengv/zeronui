"use client";

import { FilterBadge } from "@zeron-ui/ui/filter-badge";
import { useState } from "react";

const filters = [
  { count: 12, label: "All", value: "all" },
  { count: 5, label: "Active", value: "active" },
  { count: 3, label: "Draft", value: "draft" },
  { count: 4, label: "Archived", value: "archived" },
];

export default function FilterBadgeCountExample() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {filters.map((filter) => (
        <FilterBadge
          count={filter.count}
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
