'use client';

import { createContext, useContext, useState } from 'react';

const AstrologyContext = createContext(undefined);

export function AstrologyProvider({ children }) {
  const [userData, setUserData] = useState({
    birthDate: '',
    birthLocation: '',
    
    birthTime: '',
    interestArea: '',
    

    hasPaid: false,
    paymentSessionId: null,
  });

  const updateUserData = (newData) => {
    setUserData(prevData => {
      const updatedData = { ...prevData, ...newData };
      return updatedData;
    });
  };

  const getCurrentStep = (data) => {
    if (!data.birthDate || !data.birthLocation) return 1;
    if (!data.birthTime || !data.interestArea) return 2;
    return 3;
  };


  return (
    <AstrologyContext.Provider value={{ 
      userData, 
      updateUserData,
      currentStep: getCurrentStep(userData)
    }}>
      {children}
    </AstrologyContext.Provider>
  );
}

export function useAstrologyData() {
  const context = useContext(AstrologyContext);
  if (context === undefined) {
    throw new Error('useAstrologyData must be used within an AstrologyProvider');
  }
  return context;
}