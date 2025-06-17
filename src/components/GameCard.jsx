"use client";
import { memo } from "react";
import clsx from "clsx";
import Image from "next/image";

const GameCard = memo(function GameCard({
  item,
  selected,
  onClick,
  size = 90,
  multiple = false,
}) {
  const isSelected = multiple
    ? selected.includes(item.id)
    : selected === item.id;

  const handleClick = () => {
    multiple
      ? onClick((prev) =>
          prev.includes(item.id)
            ? prev.filter((id) => id !== item.id)
            : [...prev, item.id]
        )
      : onClick(item.id);
  };

  return (
    <Image
      className={clsx(
        "rounded-lg  w-40 h-48 cursor-pointer flex flex-col items-center justify-between border transition-all duration-200",
        isSelected ? "border-blue-500" : "border-gray-200"
      )}
      onClick={handleClick}
      src={item.image}
      alt={item.type || item.title}
      width={size}
      height={90}
    />
  );
});

export default GameCard;
