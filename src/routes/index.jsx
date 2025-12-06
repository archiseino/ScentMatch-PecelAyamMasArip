import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Onboarding from '../pages/OnBoading';
import RecommendationResults from '../pages/Recomendation';
import ChatbotCoCreation from '../pages/Chatbot';
import { createClient } from '@supabase/supabase-js';

// setup supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export default function AppRoutes() {
  const [appState, setAppState] = useState('landing'); // 'landing', 'onboarding', 'results', 'cocreation'
  const [recommendation, setRecommendation] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const handleGetStarted = () => setAppState('onboarding');

  const handleOnboardingComplete = async (preferences) => {
    console.log(preferences);
    setUserPreferences(preferences);

    const { data: perfume, error } = await supabase
      .from('perfumes')
      .select(
        'id, name, brand, gender, longevity, activity, price_tier, all_notes, description, main_accord, notes_structured'
      )
      .or(
        `gender.eq.${preferences.gender},longevity.eq.${preferences.intensity},activity.ilike.%${preferences.occasions}%,price_tier.eq.${preferences.price}`
      )
      .contains('all_notes', preferences.notes)
      .limit(3);

    if (error) {
      console.error('Error fetching perfumes from Supabase:', error);
    }

    console.log('Recommended Perfume:', perfume);

    setRecommendation(perfume);

    setAppState('results');
  };
  const handleBackToLanding = () => setAppState('landing');
  const handleStartOver = () => {
    setRecommendation(null);
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

      {appState === 'results' && recommendation && (
        <RecommendationResults
          recommendation={recommendation}
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
