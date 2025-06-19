"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  games,
  caseSizes,
  caseTypes,
  chipBrands,
  resolutions,
  steps,
} from "@/data/data";

import { usePageNavigation } from "@/hooks/use-page-navigation";
import { usePriceRange } from "@/hooks/use-price-range";
import { useSelection } from "@/hooks/use-selection";

import ProgressBar from "@/components/ProgressBar";
import PageSection from "@/components/page-section";
import NavigationButtons from "@/components/navigation-buttons";
import PriceRangeSlider from "@/components/PriceRangeSlider";
import GameCard from "@/components/GameCard";
import SmallCard from "@/components/SmallCard";

export default function GamingPage() {
  const {
    sectionsRef,
    currentStep,
    goToNextSection,
    goToPreviousSection,
    scrollToSection,
    setCurrentStep,
  } = usePageNavigation(4);

  const { minValue, maxValue, handlePriceChange } = usePriceRange(0, 1000);
  const { selected: selectedGames, handleSelect: handleGameSelect } =
    useSelection([]);
  const { selected: selectedChipBrand, setSelected: setSelectedChipBrand } =
    useSelection([]);

  const [showInfo, setShowInfo] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("1080");
  const [selectedCaseSize, setSelectedCaseSize] = useState(null);
  const [selectedCaseType, setSelectedCaseType] = useState(null);

  const resultsLink = {
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
  };

  return (
    <div className="flex flex-col items-center space-y-12">
      <ProgressBar steps={steps} currentStep={currentStep} />

      {/* Price Range Section */}
      <PageSection
        title="Choose your PC Builder"
        index={0}
        sectionsRef={sectionsRef}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      >
        <PriceRangeSlider
          min={0}
          max={7000}
          defaultValue={minValue}
          onChange={handlePriceChange}
        />
        <NavigationButtons
          index={0}
          totalSections={4}
          onNext={() => {
            scrollToSection(1);
            setCurrentStep(2);
          }}
          backLink="/"
        />
      </PageSection>

      {/* Games and Resolution Section */}
      <PageSection
        title="Select your favorite games and preferred resolution"
        index={1}
        sectionsRef={sectionsRef}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
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
        </div>
        <NavigationButtons
          index={1}
          totalSections={4}
          onPrevious={() => goToPreviousSection()}
          onNext={() => goToNextSection(steps.length)}
        />
      </PageSection>

      {/* Case Size Section */}
      <PageSection
        title="Choose your case size"
        index={2}
        sectionsRef={sectionsRef}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      >
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4">
          {caseSizes.map((item, index) => (
            <div
              key={item.id}
              className={`${
                index === 2 ? "col-span-2 flex justify-center" : ""
              } md:col-span-1`}
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
        <NavigationButtons
          index={2}
          totalSections={4}
          onPrevious={() => goToPreviousSection()}
          onNext={() => goToNextSection(steps.length)}
        />
      </PageSection>

      {/* Chip Brand Section */}
      <PageSection
        title="Choose your chip brand"
        index={3}
        sectionsRef={sectionsRef}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      >
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
        <NavigationButtons
          index={3}
          totalSections={4}
          onPrevious={() => goToPreviousSection()}
          showResults={true}
          resultsLink={resultsLink}
        />
      </PageSection>
    </div>
  );
}
