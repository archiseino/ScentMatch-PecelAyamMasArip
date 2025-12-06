import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userPreferences, setUserPreferences] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  return (
    <AppContext.Provider
      value={{
        userPreferences,
        recommendation,
        selectedPerfume,
        setUserPreferences,
        setRecommendation,
        setSelectedPerfume,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
