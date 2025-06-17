"use client";

import Image from "next/image";

export default function PcCard({ pc }) {
  return (
    <div
      key={pc.id}
      className="w-75 h-140 flex flex-col p-2 items-center border border-gray-200 rounded shadow"
    >
      <span className="text-[#FB3232] font-semibold pb-2">Special</span>
      <h2 className="font-bold text-[16px] pb-10 text-center">{pc.title}</h2>
      <Image
        src={pc.image}
        width={180}
        height={230}
        alt={pc.title}
        className="pb-10"
      />
      <span className="text-gray-500 pb-2 text-[14px]">
        Starting at:&nbsp;
        <span className="font-semibold text-black text-[18px]">
          ${pc.price}
        </span>{" "}
        <span className="line-through">${pc.realPrice}</span>
      </span>
      <a href="#" className="underline text-blue-400 mb-2">
        Payment plans available
      </a>
      <div className="flex gap-4">
        <button className="bg-[#2198F3] text-white py-2 px-4 rounded text-sm">
          Customize
        </button>
        <button className="border border-blue-400 text-blue-400 py-2 px-4 rounded text-sm">
          Preconfigured
        </button>
      </div>
      <div className="text-gray-500 flex flex-col pt-4 text-[13px] leading-tight">
        <span>Socket: {pc.type.socket}</span>
        <span>CPU: {pc.type.cpu}</span>
        <span>Chipset: {pc.type.chipset}</span>
        <span>Memory: {pc.type.memory}</span>
        <span>Storage: {pc.type.storage}</span>
        <span>Graphics: {pc.type.graphics}</span>
      </div>
    </div>
  );
}
