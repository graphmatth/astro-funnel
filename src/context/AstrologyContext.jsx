"use client";
import React from "react";

import { createContext, useContext, useState } from "react";

const AstrologyContext = createContext(undefined);

export function AstrologyProvider({ children }) {
  const [userData, setUserData] = useState({
    currentStep: 1,
    birthDate: "",
    birthLocation: "",

    birthTime: "",
    interestArea: "",

    hasPaid: false,
    paymentSessionId: null,
  });

  const updateUserData = (newData) => {
    setUserData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      return updatedData;
    });
  };

  React.useEffect(() => {
    setUserData(userData);
  }, []);

  return (
    <AstrologyContext.Provider
      value={{
        userData,
        updateUserData,
        currentStep: userData.currentStep,
      }}
    >
      {children}
    </AstrologyContext.Provider>
  );
}

export function useAstrologyData() {
  const context = useContext(AstrologyContext);
  if (context === undefined) {
    throw new Error(
      "useAstrologyData must be used within an AstrologyProvider",
    );
  }
  return context;
}
