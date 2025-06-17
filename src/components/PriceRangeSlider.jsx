"use client";
import { useState, memo, useEffect } from "react";
import clsx from "clsx";

function PriceRangeSlider({
  min = 0,
  max = 7000,
  defaultValue = 3000,
  onChange,
  variant = "default",
}) {
  const [baseValue, setBaseValue] = useState(defaultValue);

  const minValue = Math.max(min, baseValue);
  const maxValue = Math.min(minValue + 1000, max);
  const monthlyPayment = Math.round(maxValue / 40);

  useEffect(() => {
    onChange?.({ minValue, maxValue });
  }, [minValue, maxValue, onChange]);

  const handleChange = (e) => {
    const raw = Number(e.target.value);
    const clamped = Math.max(min, Math.min(max - 1000, raw));
    setBaseValue(clamped);
  };

  const leftOffsetPx = 0;
  const rightOffsetPx = -40;

  const visualRange = max - min - 450;

  const percent = (baseValue - min) / visualRange;

  const thumbLeft = `calc(${percent * 100}% - ${leftOffsetPx}px + ${
    percent * rightOffsetPx
  }px)`;

  const isSummary = variant === "summary";

  return (
    <div
      className={clsx(
        "w-full",
        isSummary
          ? "flex flex-col md:flex-row justify-center items-center"
          : "max-w-3xl p-6 border rounded-lg border-gray-400 bg-white shadow-sm"
      )}
    >
      {isSummary ? (
        <>
          <div className="hidden md:block flex-col items-start w-[170px] h-20">
            <span className="text-gray-400 text-[18px]">Budget:</span>
            <div className="font-bold text-[20px]">{`$${minValue} - $${maxValue}`}</div>
            <span className="text-gray-500 font-normal text-[13px]">
              or{" "}
              <span className="text-orange-500 font-medium">
                ${monthlyPayment}
              </span>{" "}
              Per month
            </span>
          </div>
          <div className="flex justify-center items-center mb-6 md:hidden">
            <div className="text-lg font-medium text-center">
              Max Price:{" "}
              <span className="font-bold text-black">${maxValue}</span>{" "}
              <span className="text-gray-500 font-normal">
                or{" "}
                <span className="text-orange-500 font-medium">
                  ${monthlyPayment}
                </span>{" "}
                Per month
              </span>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-center items-center mb-6">
            <div className="text-lg font-medium text-center">
              Max Price:{" "}
              <span className="font-bold text-black">${maxValue}</span>{" "}
              <span className="text-gray-500 font-normal">
                or{" "}
                <span className="text-orange-500 font-medium">
                  ${monthlyPayment}
                </span>{" "}
                Per month
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max - 1000}
          step={1}
          value={baseValue}
          onChange={handleChange}
          className="absolute w-full appearance-none z-30 h-2 bg-transparent"
        />

        <style jsx>{`
          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
          }

          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            background-color: transparent;
            height: 28px;
            width: 70px;
            border-radius: 9999px;
            cursor: pointer;
          }

          input[type="range"]::-moz-range-thumb {
            background: transparent;
            border: none;
            height: 0;
            width: 0;
          }

          input[type="range"]::-webkit-slider-runnable-track {
            background: transparent;
          }
        `}</style>

        <div
          className={clsx(
            "absolute top-1/2 left-0 w-full h-2 rounded",
            isSummary ? "bg-gray-300" : "bg-gray-200",
            "-translate-y-1/2"
          )}
        />
        <div className="relative w-full h-0">
          <div
            className="absolute z-40 flex justify-center items-center bg-orange-500 rounded-full text-white font-bold text-sm md:h-6 h-7.5 w-[70px] md:w-[103px] pointer-events-none pb-0.5"
            style={{
              top: "-12px",
              left: thumbLeft,
              letterSpacing: "0.25em",
            }}
          >
            ||||
          </div>
        </div>
      </div>

      {!isSummary && (
        <div className="flex justify-between text-sm text-gray-500 mb-1 pt-4">
          <span>${min}</span>
          <span>${max}</span>
        </div>
      )}

      {!isSummary && (
        <div className="text-center text-gray-800 font-medium text-base mt-4">
          ${minValue} - ${maxValue}
        </div>
      )}
    </div>
  );
}

export default memo(PriceRangeSlider);
