"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function usePageNavigation(totalSections, initialStep = 1) {
  const sectionsRef = Array.from({ length: totalSections }, () => useRef());
  const [currentSection, setCurrentSection] = useState(0);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const pathname = usePathname();

  const scrollToSection = (index) => {
    setCurrentSection(index);
    sectionsRef[index].current?.scrollIntoView({ behavior: "smooth" });
  };

  const goToNextSection = (maxSteps) => {
    if (currentSection < sectionsRef.length - 1) {
      scrollToSection(currentSection + 1);
      if (currentStep < maxSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1);
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    if (pathname) {
      setTimeout(() => {
        sectionsRef[0].current?.scrollIntoView({ behavior: "auto" });
        setCurrentSection(0);
        setCurrentStep(initialStep);
      }, 10);
    }
  }, [pathname, initialStep]);

  return {
    sectionsRef,
    currentSection,
    currentStep,
    setCurrentStep,
    scrollToSection,
    goToNextSection,
    goToPreviousSection,
  };
}
