"use client";

import { useState, useCallback } from "react";

export function useSelection(initialValue = []) {
  const [selected, setSelected] = useState(initialValue);

  const handleSelect = useCallback((itemId) => {
    setSelected((prev) => {
      if (Array.isArray(prev)) {
        if (prev.includes(itemId)) {
          return prev.filter((id) => id !== itemId);
        } else {
          return [...prev, itemId];
        }
      } else {
        return itemId;
      }
    });
  }, []);

  const handleMultipleSelect = useCallback((items) => {
    setSelected(items);
  }, []);

  return { selected, setSelected, handleSelect, handleMultipleSelect };
}
