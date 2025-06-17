"use client";
import { memo } from "react";
import clsx from "clsx";
import Image from "next/image";

const SmallCard = memo(function SmallCard({
  item,
  selected,
  onClick,
  size = 80,
  multiple = false,
  isChip = false,
}) {
  const isSelected = multiple
    ? selected?.includes(item.id)
    : selected?.id === item.id;

  const handleClick = () => {
    if (multiple) {
      onClick((prev) =>
        prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id]
      );
    } else {
      onClick(item);
    }
  };

  return (
    <div>
      {isChip && (
        <div
          className={clsx(
            "rounded-lg p-3 shadow-sm w-35 h-35 md:w-50 md:h-50 cursor-pointer flex flex-col items-center justify-center border-2",
            isSelected ? "border-blue-500" : "border-gray-200"
          )}
          onClick={handleClick}
        >
          <Image
            src={item.image}
            alt={item.type || item.title}
            width={size}
            height={size}
          />
        </div>
      )}
      {!isChip && (
        <div
          className={clsx(
            "rounded-lg p-3 shadow-sm w-40 h-40 md:w-60 md:h-60 cursor-pointer flex flex-col items-center justify-between border-2",
            isSelected ? "border-blue-500" : "border-gray-200"
          )}
          onClick={handleClick}
        >
          <span className="text-center font-bold text-sm">
            {item.type || item.title}
          </span>
          <Image
            src={item.image}
            alt={item.type || item.title}
            width={size}
            height={size}
            className="object-contain w-30 h-30 "
          />
        </div>
      )}
    </div>
  );
});

export default SmallCard;
