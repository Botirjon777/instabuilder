"use client";

import clsx from "clsx";

export default function FilterOptions({
  options,
  selectedFilter,
  onFilterChange,
  isMobile = false,
}) {
  const containerClass = isMobile
    ? "md:hidden grid grid-cols-2 gap-2 bg-white rounded-lg border border-gray-200 p-2"
    : "hidden md:flex flex-wrap justify-center bg-white rounded-lg border border-gray-200 p-2 gap-2 w-full";

  const buttonClass = isMobile
    ? "w-full px-3 py-2 text-xs font-medium text-left rounded-md break-words whitespace-normal"
    : "flex-1 min-w-[120px] max-w-[220px] text-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-md break-words whitespace-normal";

  return (
    <div className={containerClass}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.label)}
          className={clsx(
            buttonClass,
            selectedFilter === option.label
              ? "bg-blue-500 text-white shadow-sm"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
