"use client";

import { useEffect, useState } from "react";

export function useUrlParams() {
  const [params, setParams] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const parsedParams = {};

    // Common parameters
    parsedParams.type = urlParams.get("type") || "gaming";
    parsedParams.minValue = urlParams.get("minValue") || 0;
    parsedParams.maxValue = urlParams.get("maxValue") || 7000;
    parsedParams.selectedResolution =
      urlParams.get("selectedResoliton") || "1080";

    // Parse chip brands
    const chipBrands = urlParams.get("selectedChipBrand");
    parsedParams.selectedChipBrand = chipBrands
      ? chipBrands.split(",").filter(Boolean).map(Number)
      : [];

    // Parse case size and type
    parsedParams.selectedCaseSize = urlParams.get("selectedCaseSize");
    parsedParams.selectedCaseType = urlParams.get("selectedCaseType");

    // Gaming specific
    const games = urlParams.get("selectedGames");
    parsedParams.selectedGames = games
      ? games.split(",").filter(Boolean).map(Number)
      : [];

    // Workstation specific
    const apps = urlParams.get("selectedApps");
    parsedParams.selectedApps = games
      ? apps.split(",").filter(Boolean).map(Number)
      : [];
    parsedParams.selectedFilter = urlParams.get("selectedFilter") || null;

    setParams(parsedParams);
  }, []);

  return params;
}
