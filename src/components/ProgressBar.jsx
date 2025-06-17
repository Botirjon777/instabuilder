"use client";
import clsx from "clsx";

import { FaCircleCheck } from "react-icons/fa6";

export default function ProgressBar({ steps, currentStep }) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-[150px] hidden lg:block">
      <div className="relative flex flex-col gap-8">
        <div className="absolute left-34 top-6 bottom-6 w-0.5 bg-gray-400" />
        <div
          className="absolute left-34 top-6 w-0.5 bg-blue-500 transition-all duration-300 ease-in-out"
          style={{
            height: `${((currentStep - 0.8) / 5) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <div key={step.id} className="relative flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-500 font-medium">
                  Step {step.id}
                </div>
                <div
                  className={clsx(
                    "text-lg font-semibold",
                    isCurrent && "text-blue-600",
                    isCompleted && "text-gray-900",
                    isUpcoming && "text-gray-400"
                  )}
                >
                  {step.title}
                </div>
              </div>
              <div
                className={clsx(
                  "relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium",
                  isCompleted && "bg-blue-500",
                  isCurrent && "bg-blue-500",
                  isUpcoming && "bg-gray-300"
                )}
              >
                {isCompleted ? (
                  <FaCircleCheck />
                ) : (
                  <span className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
