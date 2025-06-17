"use client";
import Image from "next/image";
import clsx from "clsx";

export default function PCCard({ post, selectedPC, setSelectedPC }) {
  const isSelected = selectedPC === post.title.toLowerCase();

  return (
    <div
      className={clsx(
        "flex flex-col rounded-lg p-4 mb-6 items-center space-between shadow-sm h-[162px] w-[162px] md:h-[400px] md:w-[400px] cursor-pointer transition-all duration-200",
        isSelected
          ? "border-4 border-blue-500"
          : "border border-gray-200 bg-white"
      )}
      onClick={() => setSelectedPC(post.title.toLowerCase())}
    >
      <h1 className="font-bold text-[16px] mb-15 md:text-[30px] md:mt-10 md:mb-0 leading-snug">
        {post.title}
      </h1>

      <div className="relative w-[100px] h-[60px] md:w-[300px] md:h-[200px]">
        <Image
          src={post.image2}
          height={100}
          width={180}
          className="absolute -top-[40px] w-[90px] md:w-[180px] left-[30px] md:top-[70px] md:left-[120px] z-0"
          alt="Hello"
        />
        <Image
          src={post.image1}
          height={110}
          width={200}
          className="absolute -top-[50px] -left-[10px] md:top-[50px] md:left-[0px] z-10"
          alt="Hello"
        />
      </div>
    </div>
  );
}
