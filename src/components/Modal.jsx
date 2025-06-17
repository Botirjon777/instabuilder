"use client";
import clsx from "clsx";
import SelectedCard from "./SelectedCard";
import InfoTooltip from "./InfoToolTip";
import { resolutions, filters } from "@/data/data";

import { IoMdClose } from "react-icons/io";

import {
  games,
  apps,
  case_sizes,
  caseSizes,
  caseTypes,
  chip_brands,
} from "@/data/data";

export default function Modal({
  open,
  onClose,
  modalType,
  tooltipState,
  selectedGames,
  setSelectedGames,
  selectedCaseSize,
  setSelectedCaseSize,
  selectedCaseType,
  setSelectedCaseType,
  selectedChipBrand,
  setSelectedChipBrand,
  selectedApps,
  setSelectedApps,
  selectedResolution,
  setSelectedResolution,
  selectedFilter,
  setSelectedFilter,
}) {
  if (!open) return null;

  let title = "";
  let data = [];
  let multiple = false;
  let state;
  let setter;
  let isChip = false;
  let resolution;
  let setResolution;

  switch (modalType) {
    case "Games":
      title = "Select games you play";
      data = games;
      multiple = true;
      state = selectedGames;
      setter = setSelectedGames;
      resolution = selectedResolution;
      setResolution = setSelectedResolution;
      break;
    case "Size":
      title = "Choose case size";
      data = caseSizes;
      state = selectedCaseSize;
      setter = setSelectedCaseSize;
      break;
    case "Type":
      title = "Choose case type";
      data = caseTypes;
      state = selectedCaseType;
      setter = setSelectedCaseType;
      break;
    case "Tasks":
      title = "Choose case type";
      data = apps;
      multiple = true;
      state = selectedApps;
      setter = setSelectedApps;
      break;
    case "FormFactor":
      title = "Choose case type";
      data = case_sizes;
      state = selectedCaseSize;
      setter = setSelectedCaseSize;
      break;
    case "Brands":
      title = "Choose case type";
      data = chip_brands;
      state = selectedChipBrand;
      setter = setSelectedChipBrand;
      break;
    default:
      break;
  }

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-h-screen p-6 overflow-auto">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-3">
            <InfoTooltip {...tooltipState} />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500"
            >
              <IoMdClose size={26} />
            </button>
          </div>
        </div>
        {modalType === "Games" && (
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
        )}

        {modalType === "Tasks" && (
          <div className="flex justify-center mb-6">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.label)}
                className={clsx(
                  "px-4 py-2 text-sm font-medium border first:rounded-l las:rounded-r transition-all",
                  selectedFilter === f.label
                    ? "bg-blue-500 text-white border-blue-500 scale-105"
                    : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* {modalType === "Tasks" && (
          <div className="flex justify-center mb-6">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.label)}
                className={clsx(
                  "px-4 py-2 text-sm font-medium border first:rounded-l las:rounded-r transition-all",
                  selectedFilter === f.label
                    ? "bg-blue-500 text-white border-blue-500 scale-105"
                    : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )} */}

        <div
          className={
            modalType === "Games"
              ? "grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4"
              : "flex flex-wrap gap-4 justify-center"
          }
        >
          {data.map((item) => (
            <SelectedCard
              key={item.id}
              item={item}
              selected={state}
              setSelected={setter}
              multiple={multiple}
              isChip={isChip}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
