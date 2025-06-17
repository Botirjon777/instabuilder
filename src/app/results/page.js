"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

import pcCatalog from "@/data/pc_catalog.json";
import { caseSizes } from "@/data/data";

import Modal from "@/components/Modal";
import PcCard from "@/components/PcCard";
import PriceRangeSlider from "@/components/PriceRangeSlider";

export default function ResultsPage() {
  const [pageType, setPageType] = useState("gaming");

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(7000);
  const [selectedResolution, setSelectedResolution] = useState("1080");
  const [selectedChipBrand, setSelectedChipBrand] = useState(null);
  const [selectedGames, setSelectedGames] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedCaseSize, setSelectedCaseSize] = useState(null);
  const [selectedCaseType, setSelectedCaseType] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMinValue(Number(params.get("minValue")) || 0);
    setMaxValue(Number(params.get("maxValue")) || 7000);
    setSelectedResolution(params.get("selectedResolution") || "1080");
    setSelectedChipBrand(params.get("selectedChipBrand") || null);
    setSelectedCaseSize(
      caseSizes.find((c) => c.type === params.get("selectedCaseSize")) || null
    );
    setSelectedGames(
      (params.get("selectedGames") || "").split(",").filter(Boolean).map(Number)
    );
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeFromParams = params.get("type");
    if (typeFromParams === "workstation") {
      setPageType("workstation");
    } else {
      setPageType("gaming");
    }
  }, []);

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

  const filterPcs = useMemo(() => {
    return pcCatalog.filter((pc) => {
      if (pc.price < minValue || pc.price > maxValue) return false;

      if (
        pageType === "gaming" &&
        selectedResolution &&
        pc.resolutions?.length > 0 &&
        !pc.resolutions.includes(selectedResolution)
      )
        return false;

      if (
        selectedChipBrand?.type &&
        pc.chipBrand?.toLowerCase() !== selectedChipBrand.type.toLowerCase()
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

  return (
    <div className="flex flex-col items-center space-y-12">
      <Link href="/">
        <h4 className="flex justify-center items-center gap-4 border bg-green-400 rounded-sm p-2 hover:text-blue-400 hover:underline cursor-pointer">
          Go Main Page <RiArrowGoBackFill />
        </h4>
      </Link>

      <h1 className="font-bold text-[35px]">Results</h1>

      <div className="flex flex-col md:flex-row items-center justify-center p-6 bg-white shadow rounded w-full gap-5 md:gap-10">
        <PriceRangeSlider
          defaultValue={minValue}
          onChange={({ minValue, maxValue }) => {
            setMinValue(minValue);
            setMaxValue(maxValue);
          }}
          variant="summary"
        />

        <div className="flex gap-2 pt-2 md:gap-6 text-sm w-auto">
          {filterOptions.map(({ l, t }) => (
            <div
              key={l}
              className={
                t === "FormFactor"
                  ? "flex flex-col justify-center items-center border rounded-[8px] w-[148px] h-[62px] p-3 border-[#2198F3] hover:border-blue-400"
                  : "flex flex-col justify-center items-center border rounded-[8px] w-auto h-[62px] p-3 border-[#2198F3] hover:border-blue-400"
              }
            >
              <span className="font-bold text-[18px]">{l}</span>
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => openModal(t)}
              >
                Change
              </span>
            </div>
          ))}
        </div>
      </div>

      {filterPcs.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterPcs.map((pc) => (
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
      />
    </div>
  );
}
