"use client";

import Link from "next/link";

export default function NavigationButtons({
  index,
  totalSections,
  onPrevious,
  onNext,
  showResults = false,
  resultsLink = {},
  backLink = "/",
}) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      {index > 0 && (
        <button
          onClick={onPrevious}
          className="px-6 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Previous
        </button>
      )}

      {index === 0 && (
        <Link href={backLink}>
          <button
            onClick={onPrevious}
            className="px-6 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Previous
          </button>
        </Link>
      )}

      {index < totalSections - 1 && (
        <button
          onClick={onNext}
          className="px-6 py-2 bg-[#2198F3] text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Next Step
        </button>
      )}

      {showResults && index === totalSections - 1 && (
        <Link href={resultsLink}>
          <button
            onClick={onPrevious}
            className="bg-[#2198F3] text-white py-2 px-4 rounded-lg"
          >
            Show Results
          </button>
        </Link>
      )}
    </div>
  );
}
