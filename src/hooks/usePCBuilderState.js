"use client";

import { useState } from "react";

export default function usePCBuilderState(initial = {}) {
  const [state, setState] = useState({
    selectedGames: [],
    selectedApps: [],
    selectedResolution: "1080",
    selectedCaseSize: null,
    selectedCaseType: null,
    selectedChipBrand: null,
    minValue: 0,
    maxValue: 1000,
    showInfo: false,
    ...initial,
  });

  const update = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), state.minValue + 500);
    update("minValue", value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), state.minValue - 500);
    update("maxValue", value);
  };

  return {
    state,
    update,
    handleMinChange,
    handleMaxChange,
  };
}
