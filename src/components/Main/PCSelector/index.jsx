"use client";

import { useEffect, useRef, useState } from "react";

import { GoQuestion } from "react-icons/go";

import PCCard from "./PCCard";

export default function PCSelector({ selectedPC, setSelectedPC }) {
  const posts = [
    {
      id: 1,
      title: "Gaming",
      image1: "/assets/pc-builder/gaming.png",
      image2: "/assets/pc-builder/gaming.png",
    },

    {
      id: 2,
      title: "Workstation",
      image1: "/assets/pc-builder/workstation.png",
      image2: "/assets/pc-builder/workstation-2.png",
    },
  ];

  const [showAnswer, setShowAnswer] = useState(false);
  const answerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (answerRef.current && !answerRef.current.contains(event.target)) {
        setShowAnswer(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="space-y-6 flex flex-col justify-center items-center">
      <div className="relative" ref={answerRef}>
        <div className="flex items-center gap-4 text-center">
          <h3 className="text-[25px] font-bold ">Choose your PC Builder</h3>

          <button onClick={() => setShowAnswer(!showAnswer)}>
            <GoQuestion size={24} />
          </button>

          {showAnswer && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#202020] text-white p-3 rounded shadow w-120 z-50 text-sm">
              <p>
                Pick the maximum you are willing to spend on this gaming PC?
                We'll give you some options above and below your budget to give
                some choices between what meets your budget, a value option if
                you want to save some money and best option slightly above your
                budget if you want to maximize your gaming experience.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-[20px]">
        {posts.map((post) => (
          <PCCard
            key={post.id}
            post={post}
            selectedPC={selectedPC}
            setSelectedPC={setSelectedPC}
          />
        ))}
      </div>
    </div>
  );
}
