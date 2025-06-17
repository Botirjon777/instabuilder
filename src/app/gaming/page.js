"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import clsx from "clsx";
import Link from "next/link";
import {
  games,
  caseSizes,
  caseTypes,
  chipBrands,
  resolutions,
  steps,
} from "@/data/data";
import ProgressBar from "@/components/ProgressBar";

import InfoTooltip from "@/components/InfoToolTip";
import SmallCard from "@/components/SmallCard";
import GameCard from "@/components/GameCard";

import PriceRangeSlider from "@/components/PriceRangeSlider";

export default function GamingPage() {
  const sectionsRef = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const [currentSection, setCurrentSection] = useState(0);

  const [showInfo, setShowInfo] = useState(false);

  const [selectedGames, setSelectedGames] = useState([]);
  const [selectedResolution, setSelectedResolution] = useState("1080");
  const [selectedCaseSize, setSelectedCaseSize] = useState(null);
  const [selectedCaseType, setSelectedCaseType] = useState(null);
  const [selectedChipBrand, setSelectedChipBrand] = useState(null);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const [currentStep, setCurrentStep] = useState(1);

  const handleGameSelect = useCallback((gameId) => {
    setSelectedGames((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId);
      } else {
        return [...prev, gameId];
      }
    });
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const scrollToSection = (index) => {
    setCurrentSection(index);
    sectionsRef[index].current?.scrollIntoView({ behavior: "smooth" });
  };

  const Section = ({ title, children, index }) => (
    <div
      ref={sectionsRef[index]}
      className="w-full min-h-screen flex flex-col justify-center items-center px-4"
    >
      <div className="flex items-center justify-center gap-4 text-center mb-4">
        <h3 className="text-[22px] font-bold">{title}</h3>
        <InfoTooltip show={showInfo} setShow={setShowInfo} />
      </div>
      {children}
      <div className="flex justify-center gap-4 mt-4">
        {index > 0 && (
          <button
            onClick={() => {
              scrollToSection(index - 1);
              if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
              }
            }}
            className="border border-blue-500 py-2 px-4 rounded"
          >
            Previous
          </button>
        )}
        {index == 0 && (
          <Link href="/">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Go Back
            </button>
          </Link>
        )}
        {index < sectionsRef.length - 1 && (
          <button
            onClick={() => {
              scrollToSection(index + 1);
              if (currentStep < steps.length) {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next Step
          </button>
        )}
        {index === 4 && (
          <Link
            href={{
              pathname: "/results",
              query: {
                selectedGames: selectedGames.join(","),
                selectedResolution,
                selectedCaseSize: selectedCaseSize?.type,
                selectedCaseType: selectedCaseType?.type,
                selectedChipBrand: selectedChipBrand?.type,
                minValue,
                maxValue,
                type: "gaming",
              },
            }}
          >
            <button className="bg-green-500 text-white py-2 px-4 rounded">
              View Results
            </button>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-12">
      <ProgressBar steps={steps} currentStep={currentStep} />
      <div
        ref={sectionsRef[0]}
        className="w-full min-h-screen flex flex-col justify-center items-center px-4"
      >
        <div className="flex items-center justify-center gap-4 text-center mb-4">
          <h3 className="text-[22px] font-bold">Choose your PC Builder</h3>
          <InfoTooltip show={showInfo} setShow={setShowInfo} />
        </div>

        <PriceRangeSlider
          min={0}
          max={7000}
          defaultValue={minValue}
          onChange={({ minValue, maxValue }) => {
            setMinValue(minValue);
            setMaxValue(maxValue);
          }}
        />

        <div className="flex justify-center gap-4 mt-4">
          <Link href="/">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Go Back
            </button>
          </Link>

          <button
            onClick={() => {
              scrollToSection(1);
              setCurrentStep(2);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next Step
          </button>
        </div>
      </div>

      <Section title="Select your favorite games (multiple allowed)" index={1}>
        <div className="w-full max-h-[420px] overflow-y-auto">
          <div className="flex justify-center mb-6">
            {resolutions.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedResolution(r.id)}
                className={clsx(
                  "px-4 py-2 text-sm font-medium border first:rounded-l las:rounded-r transition-all",
                  selectedResolution === r.id
                    ? "bg-blue-500 text-white border-blue-500 scale-105"
                    : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 px-4">
            {games.map((game) => (
              <GameCard
                key={game.id}
                item={game}
                selected={selectedGames}
                onClick={setSelectedGames}
                multiple
              />
            ))}
          </div>
        </div>
      </Section>

      <Section title="Choose your case size" index={2}>
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4">
          {caseSizes.map((item) => (
            <SmallCard
              key={item.id}
              item={item}
              selected={selectedCaseSize}
              onClick={setSelectedCaseSize}
            />
          ))}
        </div>
      </Section>

      <Section title="Choose your case type" index={3}>
        <div className="flex flex-wrap justify-center gap-4">
          {caseTypes.map((item) => (
            <SmallCard
              key={item.id}
              item={item}
              selected={selectedCaseType}
              onClick={setSelectedCaseType}
              size={150}
            />
          ))}
        </div>
      </Section>

      <Section title="Choose your chip brand" index={4}>
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4">
          {chipBrands.map((item) => (
            <SmallCard
              key={item.id}
              item={item}
              selected={selectedChipBrand}
              onClick={setSelectedChipBrand}
              size={120}
              isChip
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
