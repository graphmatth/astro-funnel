import React from "react";
import { useAstrologyData } from "@/context/AstrologyContext";
import { Button } from "../common/Button";

export const IphoneStep = () => {
  const { currentStep, updateUserData } = useAstrologyData();

  const handleNextStep = React.useCallback(() => {
    updateUserData({ currentStep: currentStep + 1 });
  }, [currentStep, updateUserData]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold">Do you own an iPhone? 👀</h2>
      <div className="mt-4 flex justify-center gap-4">
        <Button onClick={handleNextStep} className="rounded-lg px-4 py-2 text-white">
          Yes
        </Button>
        <Button variant="outline" className="rounded-lg px-4 py-2">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdCjLvk05TYaZm_GCiBbIlvQxcvqgTp_arMdwmDVTj-BT-PmQ/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
          >
            No
          </a>
        </Button>
      </div>
    </div>
  );
};