"use client";
import Image from "next/image";
import clsx from "clsx";

export default function SelectedCard({
  item,
  selected,
  setSelected,
  multiple = false,
  isChip = false,
  size = 80,
}) {
  const picked = multiple
    ? selected.includes(item.id)
    : selected?.id === item.id;

  const toggle = () =>
    multiple
      ? setSelected((prev) =>
          prev.includes(item.id)
            ? prev.filter((id) => id !== item.id)
            : [...prev, item.id]
        )
      : setSelected(item);

  return (
    <div
      onClick={toggle}
      className={clsx(
        "cursor-pointer border-2 rounded-lg flex flex-col items-center justify-center p-2 transition-colors",
        picked ? "border-blue-500" : "border-gray-200",
        isChip ? "w-28 h-28" : "w-36 h-36"
      )}
    >
      <Image
        src={item.image}
        alt={item.type || item.title}
        width={size}
        height={size}
        className="object-contain"
      />
      {item.type && (
        <span className="mt-2 text-sm font-semibold text-center">
          {item.type}
        </span>
      )}
    </div>
  );
}
