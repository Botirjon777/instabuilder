"use client";

import Image from "next/image";

export default function PcCard({ pc }) {
  const pcPrice = (Math.round(pc.price * 100) / 100).toFixed(2);
  const realPrice = (Math.round(pc.realPrice * 100) / 100).toFixed(2);
  return (
    <div
      key={pc.id}
      className="w-[190px] lg:w-75 h-[580px] lg:h-155 flex flex-col lg:p-2 items-center border border-gray-200 rounded-lg shadow"
    >
      <div className="flex flex-col justify-center items-center px-2 pt-2 lg:px-4 lg:pt-4">
        <span className="text-[#FB3232] font-semibold pb-2">Special</span>
        <h2 className="font-bold text-[16px] pb-3 lg:pb-10 text-center">
          {pc.title}
        </h2>
        <Image
          src={pc.image}
          width={180}
          height={230}
          alt={pc.title}
          style={{ width: "180px", height: "230px" }}
          className="pb-2 lg:pb-10"
        />
      </div>
      <div className="hidden lg:flex flex-col justify-center items-center px-2 lg:px-4 w-full">
        <span className="text-[#9C9C9C] pb-2 text-[13px] lg:text-[14px]">
          Starting at:&nbsp;
          <span className="font-semibold text-black text-[13px] lg:text-[18px]">
            ${pcPrice}
          </span>{" "}
          <span className="line-through text-[13px] lg:text-[14px]">
            ${realPrice}
          </span>
        </span>

        <a
          href="#"
          className="underline text-blue-400 mb-2 text-[12px] lg:text-[15px]"
        >
          Payment plans available
        </a>
        <div className="flex flex-col gap-1 w-full lg:flex-row lg:gap-4">
          <button className="bg-[#2198F3] text-white py-2 px-4 rounded-md text-sm">
            Customize
          </button>
          <button className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md text-sm">
            Preconfigured
          </button>
        </div>
      </div>

      <div className="flex flex-col px-2 lg:px-4 w-full lg:hidden">
        <span className="text-[#9C9C9C] text-[13px] lg:text-[14px] flex flex-col w-full">
          Starting at:&nbsp;
          <span>
            <span className="font-semibold text-black text-[13px] lg:text-[18px]">
              ${pcPrice}
            </span>{" "}
            <span className="line-through text-[13px] lg:text-[14px]">
              ${realPrice}
            </span>
          </span>
        </span>

        <a
          href="#"
          className="underline text-blue-400 mb-2 text-[12px] lg:text-[15px]"
        >
          Payment plans available
        </a>
        <div className="flex flex-col gap-1 w-full lg:flex-row lg:gap-4">
          <button className="bg-[#2198F3] text-white py-2 px-4 rounded-md text-sm">
            Customize
          </button>
          <button className="border border-blue-400 text-blue-400 py-2 px-4 rounded-md text-sm">
            Preconfigured
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start px-2 lg:px-6 w-full">
        <div className="text-[#9C9C9C] flex flex-col pt-4 text-[13px] leading-tight">
          <span>Socket: {pc.type.socket}</span>
          <span>CPU: {pc.type.cpu}</span>
          <span>Chipset: {pc.type.chipset}</span>
          <span>Memory: {pc.type.memory}</span>
          <span>Storage: {pc.type.storage}</span>
          <span>Graphics: {pc.type.graphics}</span>
        </div>
      </div>
    </div>
  );
}
