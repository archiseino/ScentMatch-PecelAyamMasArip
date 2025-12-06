import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Onboarding from '../pages/OnBoading';
import RecommendationResults from '../pages/Recomendation';
import ChatbotCoCreation from '../pages/Chatbot';

// const AppRoutes = () => {
//   // return (
//   //   // <BrowserRouter>
//   //   //   <Routes>
//   //   //     <Route path='/' element={<LandingPage />} />
//   //   //     {/* <Route path="/onboarding" element={<Onboarding />} /> */}
//   //   //   </Routes>
//   //   // </BrowserRouter>
//   // );
// };

export default function AppRoutes() {
  const [appState, setAppState] = useState('landing'); // 'landing', 'onboarding', 'results', 'cocreation'
  const [userPreferences, setUserPreferences] = useState(null);
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const handleGetStarted = () => setAppState('onboarding');
  const handleOnboardingComplete = (preferences) => {
    setUserPreferences(preferences);
    setAppState('results');
  };
  const handleBackToLanding = () => setAppState('landing');
  const handleStartOver = () => {
    setUserPreferences(null);
    setSelectedPerfume(null);
    setAppState('landing');
  };
  const handleCustomize = (perfume) => {
    console.log(perfume);
    setSelectedPerfume(perfume);
    setAppState('cocreation');
  };
  const handleBackToResults = () => setAppState('results');

  return (
    <>
      {appState === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {appState === 'onboarding' && (
        <Onboarding
          onComplete={handleOnboardingComplete}
          onBack={handleBackToLanding}
        />
      )}

      {appState === 'results' && userPreferences && (
        <RecommendationResults
          preferences={userPreferences}
          onStartOver={handleStartOver}
          onCustomize={handleCustomize}
        />
      )}

      {appState === 'cocreation' && selectedPerfume && (
        <ChatbotCoCreation
          basePerfume={selectedPerfume}
          onBack={handleBackToResults}
        />
      )}
    </>
  );
}
