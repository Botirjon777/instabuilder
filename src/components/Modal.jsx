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
  chipBrands,
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
  pageType,
}) {
  if (!open) return null;

  let title = "";
  let data = [];
  let multiple = false;
  let state;
  let setter;
  let isChip = false;

  switch (modalType) {
    case "Games":
      title = "Select games you play";
      data = games;
      multiple = true;
      state = selectedGames;
      setter = setSelectedGames;
      break;

    case "Size":
      title = "Choose case size";
      data = caseSizes;
      state = selectedCaseSize;
      setter = setSelectedCaseSize;
      break;

    case "Type":
      title = "Choose case configuration";
      if (pageType === "gaming") {
        data = [
          ...caseSizes.map((item) => ({ ...item, group: "Size" })),
          ...caseTypes.map((item) => ({ ...item, group: "Type" })),
        ];
      } else {
        data = caseTypes;
        state = selectedCaseType;
        setter = setSelectedCaseType;
      }
      multiple = false;
      break;

    case "Tasks":
      if (pageType === "workstation") {
        title = "Which Industry Best Describes Your Field of Work?";
      } else {
        title = "Choose case type";
      }
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
      title = "Choose chip brand";
      data = pageType === "gaming" ? chipBrands : chip_brands;
      state = selectedChipBrand;
      setter = setSelectedChipBrand;
      isChip = true;
      multiple = true;
      break;

    default:
      break;
  }

  const isWorkstationTasks =
    pageType === "workstation" && modalType === "Tasks";

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div
        className={clsx(
          "relative bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden",
          isWorkstationTasks ? "p-6" : "p-6"
        )}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="flex justify-center items-center gap-3 pr-5">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <InfoTooltip {...tooltipState} />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {modalType === "Games" && (
            <div className="flex justify-center mb-6">
              {resolutions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedResolution(r.id)}
                  className={clsx(
                    "px-4 py-2 text-sm font-medium border first:rounded-l last:rounded-r transition-all",
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
            <div className="mb-8">
              <div className="hidden md:flex justify-center">
                <div className="inline-flex bg-gray-100 rounded-lg p-1">
                  {filters.map((f, index) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFilter(f.label)}
                      className={clsx(
                        "px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-md",
                        selectedFilter === f.label
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-gray-700 hover:text-blue-600 hover:bg-white/50"
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full mb-6">
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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.map((item) => (
                  <SelectedCard
                    key={item.id}
                    item={item}
                    selected={state}
                    setSelected={setter}
                    multiple={multiple}
                    size={40}
                    aspect="tasks"
                  />
                ))}
              </div>
            </div>
          )}

          {modalType === "Type" && pageType === "gaming" ? (
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-lg font-semibold text-center mb-8">
                  Case Sizes
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {data
                    .filter((item) => item.group === "Size")
                    .map((item) => (
                      <SelectedCard
                        key={`size-${item.id}`}
                        item={item}
                        selected={selectedCaseSize}
                        setSelected={setSelectedCaseSize}
                        multiple={false}
                        size={50}
                      />
                    ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-center mb-2">
                  Case Types
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {data
                    .filter((item) => item.group === "Type")
                    .map((item) => (
                      <SelectedCard
                        key={`type-${item.id}`}
                        item={item}
                        selected={selectedCaseType}
                        setSelected={setSelectedCaseType}
                        multiple={false}
                      />
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {modalType === "Games" && (
                <div className="grid grid-cols-7 gap-4 justify-items-center">
                  {data.map((item) => (
                    <SelectedCard
                      key={item.id}
                      item={item}
                      selected={state}
                      setSelected={setter}
                      multiple={multiple}
                      isChip={isChip}
                      size={60}
                      isGameCard={true}
                    />
                  ))}
                </div>
              )}
              {modalType !== "Games" && modalType !== "Tasks" && (
                <div
                  className={clsx(
                    isWorkstationTasks
                      ? "grid grid-cols-4 gap-6 justify-items-center"
                      : "flex flex-wrap gap-4 justify-center"
                  )}
                >
                  {(isWorkstationTasks ? data.slice(0, 12) : data).map(
                    (item) => (
                      <SelectedCard
                        key={item.id}
                        item={item}
                        selected={state}
                        setSelected={setter}
                        multiple={multiple}
                        isChip={isChip}
                        size={isWorkstationTasks ? 40 : undefined}
                      />
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-center mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg font-medium transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
