"use client";
import Link from "next/link";
import Header from "./Header";
import PCSelector from "./PCSelector";
import { useRef, useState } from "react";

export default function Main() {
  const [selectedPC, setSelectedPC] = useState(null);

  const pcSectionRef = useRef(null);

  return (
    <div>
      <Header />
      <div ref={pcSectionRef}>
        <PCSelector selectedPC={selectedPC} setSelectedPC={setSelectedPC} />
      </div>
      <div className="flex gap-4 mt-6 justify-center items-center">
        <Link href={`/${selectedPC}`}>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={!selectedPC}
          >
            Next Step
          </button>
        </Link>
      </div>
    </div>
  );
}
