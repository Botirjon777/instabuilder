"use client";
import { memo } from "react";
import clsx from "clsx";
import Image from "next/image";

const GameCard = memo(function GameCard({ item, selected, onClick }) {
  const handleClick = () => onClick(item.id);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:scale-105",
        selected && "ring-2 ring-blue-500 ring-offset-2"
      )}
    >
      <div className="aspect-[3/4] bg-gray-200">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      {selected && (
        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
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
        </div>
      )}
    </div>
  );
});

export default GameCard;
