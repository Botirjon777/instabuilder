"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";
import clsx from "clsx";

import pcCatalog from "@/data/pc_catalog.json";
import { caseSizes, caseTypes, chipBrands, case_sizes } from "@/data/data";

import { useUrlParams } from "@/hooks/use-url-params";
import { usePriceRange } from "@/hooks/use-price-range";

import Modal from "@/components/Modal";
import PcCard from "@/components/PcCard";
import PriceRangeSlider from "@/components/PriceRangeSlider";

export default function ResultsPage() {
  const urlParams = useUrlParams();
  const { minValue, maxValue, handlePriceChange, setMinValue, setMaxValue } =
    usePriceRange();

  const [pageType, setPageType] = useState("gaming");
  const [selectedResolution, setSelectedResolution] = useState("1080");
  const [selectedChipBrand, setSelectedChipBrand] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedCaseSize, setSelectedCaseSize] = useState(null);
  const [selectedCaseType, setSelectedCaseType] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [filteredPcs, setFilteredPcs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize state from URL parameters
  useEffect(() => {
    if (Object.keys(urlParams).length > 0) {
      const effectivePageType =
        urlParams.type === "workstation" ? "workstation" : "gaming";
      setPageType(effectivePageType);
      setMinValue(urlParams.minValue);
      setMaxValue(urlParams.maxValue);
      setSelectedResolution(urlParams.selectedResolution);
      setSelectedChipBrand(urlParams.selectedChipBrand);
      setSelectedGames(urlParams.selectedGames);
      setSelectedApps(urlParams.selectedApps);
      setSelectedFilter(urlParams.selectedFilter);

      // Set case size based on page type
      const source = effectivePageType === "gaming" ? caseSizes : case_sizes;
      setSelectedCaseSize(
        urlParams.selectedCaseSize
          ? source.find(
              (c) =>
                c.type.toLowerCase() ===
                urlParams.selectedCaseSize.toLowerCase()
            )
          : null
      );

      setSelectedCaseType(
        urlParams.selectedCaseType
          ? caseTypes.find(
              (c) =>
                c.type.toLowerCase() ===
                urlParams.selectedCaseType.toLowerCase()
            )
          : null
      );
    }
  }, [urlParams, setMinValue, setMaxValue]);

  // Filter PCs based on criteria
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = pcCatalog.filter((pc) => {
        if (pc.price < minValue || pc.price > maxValue) return false;

        if (
          pageType === "gaming" &&
          selectedResolution &&
          pc.resolutions?.length &&
          !pc.resolutions.includes(selectedResolution)
        )
          return false;

        if (
          selectedChipBrand.length > 0 &&
          !selectedChipBrand.some((id) => {
            const brandObj = chipBrands.find((b) => b.id === id);
            return (
              brandObj &&
              pc.chipBrand?.toLowerCase() === brandObj.type.toLowerCase()
            );
          })
        )
          return false;

        if (
          selectedCaseSize?.type &&
          pc.caseSize?.toLowerCase() !== selectedCaseSize.type.toLowerCase()
        )
          return false;

        if (
          selectedCaseType?.type &&
          pc.caseType?.toLowerCase() !== selectedCaseType.type.toLowerCase()
        )
          return false;

        if (
          pageType === "workstation" &&
          selectedApps.length > 0 &&
          (!pc.apps || !pc.apps.some((app) => selectedApps.includes(app)))
        )
          return false;

        if (
          pageType === "workstation" &&
          selectedFilter &&
          pc.industry?.toLowerCase() !== selectedFilter.toLowerCase()
        )
          return false;

        return true;
      });

      setFilteredPcs(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [
    pageType,
    minValue,
    maxValue,
    selectedResolution,
    selectedChipBrand,
    selectedCaseSize,
    selectedCaseType,
    selectedApps,
    selectedFilter,
  ]);

  const filterOptions =
    pageType === "gaming"
      ? [
          { l: "Games", t: "Games" },
          { l: "Type", t: "Type" },
          { l: "Brands", t: "Brands" },
        ]
      : [
          { l: "Tasks", t: "Tasks" },
          { l: "Form Factor", t: "FormFactor" },
          { l: "Brands", t: "Brands" },
        ];

  const openModal = (t) => {
    setModalType(t);
    setModalOpen(true);
  };

  const FilterButton = ({ label, type }) => (
    <div
      className={clsx(
        type === "FormFactor" ? "w-[110px] md:w-[148px]" : "w-[75px]",
        "flex flex-col justify-center items-center border rounded-[8px] h-[50px] md:w-[98px] md:h-[62px] p-3 border-[#2198F3] hover:border-blue-400"
      )}
    >
      <span className="font-bold text-[13px] md:text-[18px]">{label}</span>
      <span
        className="text-[#2198F3] cursor-pointer text-[13px] md:text-[14px]"
        onClick={() => openModal(type)}
      >
        Change
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="w-full flex justify-end p-4">
        <Link href="/">
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition-all duration-200">
            Go Main Page
            <RiArrowGoBackFill size={18} />
          </button>
        </Link>
      </div>

      <h1 className="font-bold text-[35px]">Results</h1>

      {/* Desktop Filter Controls */}
      <div className="hidden md:flex flex-col md:flex-row items-center justify-center p-6 bg-white shadow rounded w-full gap-5 md:gap-10">
        <PriceRangeSlider
          defaultValue={minValue}
          onChange={handlePriceChange}
          variant="summary"
        />
        <div className="flex gap-2 pt-2 md:gap-6 text-sm w-auto">
          {filterOptions.map(({ l, t }) => (
            <FilterButton key={l} label={l} type={t} />
          ))}
        </div>
      </div>

      {/* Mobile Filter Controls */}
      <div className="md:hidden">
        <div className="flex flex-col md:flex-row items-center justify-center p-6 bg-white shadow rounded w-full gap-5 md:gap-10">
          <PriceRangeSlider
            value={minValue}
            onChange={handlePriceChange}
            variant="summary"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="flex gap-2 pt-2 md:gap-6 text-sm w-auto">
            {filterOptions.map(({ l, t }) => (
              <FilterButton key={l} label={l} type={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Results Display */}
      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredPcs.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredPcs.map((pc) => (
            <PcCard pc={pc} key={pc.id} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-12">No PCs match those filters.</p>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        modalType={modalType}
        tooltipState={{ show: showInfo, setShow: setShowInfo }}
        selectedGames={selectedGames}
        setSelectedGames={setSelectedGames}
        selectedCaseSize={selectedCaseSize}
        setSelectedCaseSize={setSelectedCaseSize}
        selectedCaseType={selectedCaseType}
        setSelectedCaseType={setSelectedCaseType}
        selectedApps={selectedApps}
        setSelectedApps={setSelectedApps}
        selectedChipBrand={selectedChipBrand}
        setSelectedChipBrand={setSelectedChipBrand}
        selectedResolution={selectedResolution}
        setSelectedResolution={setSelectedResolution}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        pageType={pageType}
      />
    </div>
  );
}
