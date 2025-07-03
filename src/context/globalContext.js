import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [updatedPortfolio, setUpdatedPortfolio] = useState([]);
  const [analysisIA, setAnalysisIA] = useState(null);
  const [recommendationsIA, setRecommendationsIA] = useState([]);
  const [alertsIA, setAlertsIA] = useState([]);
  const [insightsIA, setInsightsIA] = useState([]);
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        updatedPortfolio,
        setUpdatedPortfolio,
        analysisIA,
        setAnalysisIA,
        recommendationsIA,
        setRecommendationsIA,
        alertsIA,
        setAlertsIA,
        insightsIA,
        setInsightsIA,
        loggedInEmail,
        setLoggedInEmail,
        onboardingCompleted,
        setOnboardingCompleted,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);