"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const sectionsRef = [useRef(), useRef(), useRef(), useRef()];
  const [currentSection, setCurrentSection] = useState(0);

  const pathname = usePathname();

  const [showInfo, setShowInfo] = useState(false);

  const [selectedGames, setSelectedGames] = useState([]);
  const [selectedResolution, setSelectedResolution] = useState("1080");
  const [selectedCaseSize, setSelectedCaseSize] = useState(null);
  const [selectedCaseType, setSelectedCaseType] = useState(null);
  const [selectedChipBrand, setSelectedChipBrand] = useState([]);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const [currentStep, setCurrentStep] = useState(1);

  const handlePriceChange = useCallback(({ minValue, maxValue }) => {
    setMinValue(minValue);
    setMaxValue(maxValue);
  }, []);

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

  useEffect(() => {
    if (pathname === "/gaming") {
      setTimeout(() => {
        sectionsRef[0].current?.scrollIntoView({ behavior: "auto" });
        setCurrentSection(0);
        setCurrentStep(1);
      }, 10);
    }
  }, [pathname]);

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
            className="px-6 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Previous
          </button>
        )}
        {index < sectionsRef.length - 1 && (
          <button
            onClick={() => {
              scrollToSection(index + 1);
              if (currentStep < steps.length) {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="px-6 py-2 bg-[#2198F3] text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Step
          </button>
        )}
        {index === 3 && (
          <Link
            href={{
              pathname: "/results",
              query: {
                selectedGames: selectedGames.join(","),
                selectedResolution,
                selectedCaseSize: selectedCaseSize?.type,
                selectedCaseType: selectedCaseType?.type,
                selectedChipBrand: selectedChipBrand.join(","),
                minValue,
                maxValue,
                type: "gaming",
              },
            }}
          >
            <button className="bg-[#2198F3] text-white py-2 px-4 rounded-lg">
              Show Results
            </button>
          </Link>
        )}
      </div>
    </div>
  );
  const HydrationSafeGameGrid = memo(
    ({ games, selectedGames, handleGameSelect }) => {
      const [mounted, setMounted] = useState(false);
      useEffect(() => setMounted(true), []);

      if (!mounted) return null;

      return (
        <div className="max-h-[420px] overflow-y-auto custom-scrollbar mb-8">
          <div className="grid grid-cols-3 pt-2 md:grid-cols-5 lg:grid-cols-7 gap-4 px-4 pb-4">
            {games.map((game) => (
              <GameCard
                key={game.id}
                item={game}
                selected={selectedGames.includes(game.id)}
                onClick={handleGameSelect}
              />
            ))}
          </div>
        </div>
      );
    }
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
          onChange={handlePriceChange}
        />

        <div className="flex justify-center gap-4 mt-4">
          <Link href="/">
            <button className="px-6 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
              Previous
            </button>
          </Link>

          <button
            onClick={() => {
              scrollToSection(1);
              setCurrentStep(2);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Next Step
          </button>
        </div>
      </div>

      <Section
        title="Select your favorite games and preferred resolution"
        index={1}
      >
        <div className="w-full">
          <div className="flex justify-center mb-6">
            {resolutions.map((r, index) => (
              <button
                key={r.id}
                onClick={() => setSelectedResolution(r.id)}
                className={clsx(
                  "px-6 py-2 text-sm font-medium border transition-all duration-200",
                  index === 0 && "rounded-l-lg",
                  index === resolutions.length - 1 && "rounded-r-lg",
                  selectedResolution === r.id
                    ? "bg-blue-500 text-white border-blue-500 scale-105 z-10 relative"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-blue-600"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="max-h-[420px] overflow-y-auto custom-scrollbar mb-8">
            <div className="grid grid-cols-3 pt-2 md:grid-cols-5 lg:grid-cols-7 gap-4 px-4 pb-4">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  item={game}
                  selected={selectedGames.includes(game.id)}
                  onClick={handleGameSelect}
                />
              ))}
            </div>
          </div>
          {/* <HydrationSafeGameGrid
            games={games}
            selectedGames={selectedGames}
            handleGameSelect={handleGameSelect}
          /> */}
        </div>
      </Section>

      <Section title="Choose your case size" index={2}>
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4">
          {caseSizes.map((item, index) => (
            <div
              key={item.id}
              className={`
        ${index === 2 ? "col-span-2 flex justify-center" : ""}
        md:col-span-1
      `}
            >
              <SmallCard
                item={item}
                selected={selectedCaseSize}
                onClick={setSelectedCaseSize}
                size={55}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {caseTypes.map((item) => (
            <SmallCard
              key={item.id}
              item={item}
              selected={selectedCaseType}
              onClick={setSelectedCaseType}
              size={100}
            />
          ))}
        </div>
      </Section>

      <Section title="Choose your chip brand" index={3}>
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4">
          {chipBrands.map((item, index) => (
            <div
              key={item.id}
              className={`${
                index === 4 ? "col-span-2 flex justify-center" : ""
              } md:col-span-1`}
            >
              <SmallCard
                item={item}
                selected={selectedChipBrand}
                onClick={setSelectedChipBrand}
                size={100}
                isChip
                multiple={true}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
