"use client";

import { useState } from "react";
import { filtersWithApps, chip_brands, case_sizes, steps2 } from "@/data/data";

import { usePageNavigation } from "@/hooks/use-page-navigation";
import { usePriceRange } from "@/hooks/use-price-range";
import { useSelection } from "@/hooks/use-selection";

import ProgressBar from "@/components/ProgressBar";
import PageSection from "@/components/page-section";
import NavigationButtons from "@/components/navigation-buttons";
import FilterOptions from "@/components/filter-options";
import PriceRangeSlider from "@/components/PriceRangeSlider";
import AppCard from "@/components/AppCard";
import SmallCard from "@/components/SmallCard";

export default function WorkStationPage() {
  const {
    sectionsRef,
    currentStep,
    goToNextSection,
    goToPreviousSection,
    scrollToSection,
    setCurrentStep,
  } = usePageNavigation(4);

  const { minValue, maxValue, handlePriceChange } = usePriceRange(0, 1000);
  const { selected: selectedApps, setSelected: setSelectedApps } = useSelection(
    []
  );
  const { selected: selectedChipBrand, setSelected: setSelectedChipBrand } =
    useSelection([]);

  const [showInfo, setShowInfo] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(
    "Architecture Engineering and Construction"
  );
  const [selectedCaseSize, setSelectedCaseSize] = useState(null);

  const currentApps =
    filtersWithApps.find((f) => f.label === selectedFilter)?.apps || [];

  const resultsLink = {
    pathname: "/results",
    query: {
      selectedApps: selectedApps.join(","),
      selectedFilter,
      selectedCaseSize: selectedCaseSize?.type,
      selectedChipBrand: selectedChipBrand.join(","),
      minValue,
      maxValue,
      type: "workstation",
    },
  };

  return (
    <div className="flex flex-col items-center space-y-12">
      <ProgressBar steps={steps2} currentStep={currentStep} />

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

      {/* Industry and Apps Section */}
      <PageSection
        title="Which Industry Best Describes Your Field of Work?"
        index={1}
        sectionsRef={sectionsRef}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      >
        <div className="w-full max-w-6xl flex flex-col justify-center items-center">
          <div className="w-full mb-6">
            <FilterOptions
              options={filtersWithApps}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
            <FilterOptions
              options={filtersWithApps}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              isMobile={true}
            />
          </div>

          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 pb-4">
              {currentApps.map((app) => (
                <AppCard
                  key={app.id}
                  item={app}
                  selected={selectedApps}
                  onClick={setSelectedApps}
                  multiple
                />
              ))}
            </div>
          </div>
        </div>
        <NavigationButtons
          index={1}
          totalSections={4}
          onPrevious={() => goToPreviousSection()}
          onNext={() => goToNextSection(steps2.length)}
        />
      </PageSection>

      {/* Form Factor Section */}
      <PageSection
        title="What Workstation Form Factor Would You Prefer?"
        index={2}
        sectionsRef={sectionsRef}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      >
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4">
          {case_sizes.map((item, index) => (
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
                size={50}
              />
            </div>
          ))}
        </div>
        <NavigationButtons
          index={2}
          totalSections={4}
          onPrevious={() => goToPreviousSection()}
          onNext={() => goToNextSection(steps2.length)}
        />
      </PageSection>

      {/* Brand Preferences Section */}
      <PageSection
        title="Do you have any preferred brands?"
        index={3}
        sectionsRef={sectionsRef}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      >
        <div className="flex flex-wrap justify-center gap-4">
          {chip_brands.map((item) => (
            <SmallCard
              key={item.id}
              item={item}
              selected={selectedChipBrand}
              onClick={setSelectedChipBrand}
              size={120}
              isChip
              multiple={true}
            />
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
