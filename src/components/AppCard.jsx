"use client";
import clsx from "clsx";
import Image from "next/image";

export default function AppCard({
  item,
  selected,
  onClick,
  size = 40,
  multiple = false,
}) {
  const isSelected = multiple
    ? selected.includes(item.id)
    : selected === item.id;

  return (
    <div
      className={clsx(
        "rounded-lg p-3 shadow-sm w-[162px] h-[59px] md:w-73 md:h-34 cursor-pointer flex flex-row md:flex-col items-center justify-center gap-5 border-2",
        isSelected ? "border-blue-500" : "border-gray-200"
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
      <Image
        src={item.image}
        alt={item.type || item.title}
        width={size}
        height={size}
        className="object-contain"
      />

      <span className="text-center text-sm">{item.type || item.title}</span>
    </div>
  );
}
