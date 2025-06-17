"use client";
import clsx from "clsx";
import Image from "next/image";

export default function AppCard({
  item,
  selected,
  onClick,
  size = 30,
  multiple = false,
}) {
  const isSelected = multiple
    ? selected.includes(item.id)
    : selected === item.id;

  return (
    <div
      className={clsx(
        "relative rounded-lg bg-white border transition-all duration-200 cursor-pointer hover:shadow-sm",
        "w-full aspect-[5/1] md:aspect-[2/1] flex flex-col items-center justify-center gap-2 p-3 md:p-4",
        isSelected
          ? "border-blue-500 shadow-md"
          : "border-gray-300 hover:border-gray-400"
      )}
      onClick={() =>
        multiple
          ? onClick((prev) =>
              prev.includes(item.id)
                ? prev.filter((id) => id !== item.id)
                : [...prev, item.id]
            )
          : onClick(item.id)
      }
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            className="w-2.5 h-2.5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.type || item.title}
          width={size}
          height={size}
          className="object-contain w-8 h-8 md:w-8 md:h-8"
        />
      </div>

      <div className="text-center">
        <span className="text-xs md:text-sm font-normal text-gray-800 leading-tight">
          {item.type || item.title}
        </span>
      </div>
    </div>
  );
}
