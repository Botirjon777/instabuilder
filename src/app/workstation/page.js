"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { apps, chip_brands, case_sizes, filters, steps2 } from "@/data/data";

import ProgressBar from "@/components/ProgressBar";

import AppCard from "@/components/AppCard";
import InfoTooltip from "@/components/InfoToolTip";
import SmallCard from "@/components/SmallCard";
import PriceRangeSlider from "@/components/PriceRangeSlider";

export default function WorkStationPage() {
  const sectionsRef = [useRef(), useRef(), useRef(), useRef()];
  const [currentSection, setCurrentSection] = useState(0);

  const pathname = usePathname();

  const [showInfo, setShowInfo] = useState(false);

  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedCaseSize, setSelectedCaseSize] = useState(null);
  const [selectedChipBrand, setSelectedChipBrand] = useState([]);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    if (pathname === "/workstation") {
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

  const handlePriceChange = useCallback(({ minValue, maxValue }) => {
    setMinValue(minValue);
    setMaxValue(maxValue);
  }, []);

  const Section = ({ title, children, index }) => (
    <div
      ref={sectionsRef[index]}
      className="w-full min-h-screen flex flex-col justify-center items-center px-4"
    >
      <div className="flex items-center justify-center gap-4 text-center mb-4">
        <h3 className="text-lg md:text-[22px] font-bold">{title}</h3>
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
            className="border border-blue-500 text-blue-500 py-2 px-4 rounded"
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
              if (currentStep < steps2.length) {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next Step
          </button>
        )}
        {index === 3 && (
          <Link
            href={{
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
      <ProgressBar steps={steps2} currentStep={currentStep} />
      <div
        ref={sectionsRef[0]}
        className="w-full min-h-screen flex flex-col justify-center items-center px-4"
      >
        <div className="flex items-center justify-center gap-4 text-center mb-4">
          <h3 className="text-lg md:text-[22px] font-bold">
            Choose your PC Builder
          </h3>
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
      <Section
        title="Which Industry Best Describes Your Field of Work?"
        index={1}
      >
        <div className="w-full max-w-6xl flex flex-col justify-center items-center">
          <div className="w-full mb-6">
            <div className="hidden md:flex flex-wrap justify-center bg-white rounded-lg border border-gray-200 p-2 gap-2 w-full">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.label)}
                  className={clsx(
                    "flex-1 min-w-[120px] max-w-[220px] text-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-md break-words whitespace-normal",
                    selectedFilter === f.label
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="md:hidden flex flex-col gap-2 w-full">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.label)}
                  className={clsx(
                    "w-full px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg break-words whitespace-normal text-left",
                    selectedFilter === f.label
                      ? "bg-blue-500 text-white shadow-sm"
                      : "bg-white text-gray-700 border border-gray-200 hover:text-blue-600 hover:bg-gray-50"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="hidden md:block">
              <div className="grid grid-cols-4 gap-6 px-4">
                {apps.slice(0, 12).map((app) => (
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

            <div className="md:hidden max-h-[400px] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4 px-4 pb-4">
                {apps.map((app) => (
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
        </div>
      </Section>
      <Section title="What Workstation Form Factor Would You Prefer?" index={2}>
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4">
          {case_sizes.map((item) => (
            <SmallCard
              key={item.id}
              item={item}
              selected={selectedCaseSize}
              onClick={setSelectedCaseSize}
            />
          ))}
        </div>
      </Section>
      <Section title="Do you have any preferred brands?" index={3}>
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
      </Section>
    </div>
  );
}
