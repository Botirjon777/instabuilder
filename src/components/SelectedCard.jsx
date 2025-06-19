"use client";
import clsx from "clsx";
import Image from "next/image";

export default function SelectedCard({
  item,
  selected,
  setSelected,
  multiple = false,
  isChip = false,
  isGameCard = false,
  size = 50,
  aspect = "default",
}) {
  const isSelected = multiple
    ? selected.includes(item.id)
    : selected?.id === item.id;

  const handleClick = () => {
    if (multiple) {
      setSelected((prev) =>
        prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id]
      );
    } else {
      setSelected(item);
    }
  };

  if (isGameCard) {
    return (
      <div
        onClick={handleClick}
        className={clsx(
          "relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:scale-105",
          "w-[95px] md:w-[120px] h-[139px] md:h-[160px]",
          isSelected && "ring-2 ring-blue-500 ring-offset-2"
        )}
      >
        <div className="w-full h-full relative bg-gray-200">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100px, 120px"
          />
        </div>

        {isSelected && (
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
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "relative rounded-lg bg-white border transition-all duration-200 cursor-pointer hover:shadow-md",
        "aspect-[4/3] w-[160px] h-[160px]",
        "flex flex-col items-center justify-center gap-2 p-4",
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-300 hover:border-gray-400"
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
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
      {!isChip && (
        <div
          className={clsx(
            "p-3 w-35 h-35 cursor-pointer flex flex-col items-center justify-between gap-2"
          )}
        >
          <span className="text-center font-bold text-sm">
            {item.type || item.title}
          </span>
          <Image
            src={item.image}
            alt={item.type || item.title}
            width={size}
            height={size}
          />
        </div>
      )}
      {isChip && (
        <div className="flex-1 flex items-center justify-center w-40 h-40">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.type || item.title || item.name}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}
