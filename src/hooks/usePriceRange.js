"use client";

import { useState, useCallback } from "react";

export function usePriceRange(initialMin = 0, initialMax = 1000) {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handlePriceChange = useCallback(({ minValue, maxValue }) => {
    setMinValue(minValue);
    setMaxValue(maxValue);
  }, []);

  return {
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    handlePriceChange,
  };
}
