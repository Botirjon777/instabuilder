"use client";
import { useEffect, useRef } from "react";

import { GoQuestion } from "react-icons/go";

export default function InfoTooltip({ show, setShow }) {
  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setShow(!show)}>
        <GoQuestion size={24} />
      </button>
      {show && (
        <div className="absolute bottom-10 md:bottom-full -left-30 md:left-1/2 -translate-x-1/2 mb-2 bg-[#202020] text-white p-3 rounded shadow w-80 md:w-100 z-50 text-sm">
          <p>Choose options based on your needs. .</p>
        </div>
      )}
    </div>
  );
}
