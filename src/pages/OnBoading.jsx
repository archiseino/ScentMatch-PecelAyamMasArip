import React, { useState } from 'react';
import slides from '../utils/slider';
import Gender from '../components/Question/Gender';
import Intensity from '../components/Question/Intensity';
import Notes from '../components/Question/Notes';
import Occasions from '../components/Question/Occasions';
import Price from '../components/Question/Price';
import Slider from '../components/Slider';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { getRecommendations } from '../utils/SupabaseClient';
import { useAppContext } from '../context/AppContext';

export default function Onboarding() {
  // Use State For Slider
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { setUserPreferences, setRecommendation } = useAppContext();
  const [preferences, setPreferences] = useState({
    gender: '',
    intensity: '',
    notes: [],
    occasions: '',
    price: '',
  });

  // State slides checker
  const currentSlide = slides[currentStep];
  const isLastStep = currentStep === slides.length - 1;

  const handleSelect = (question, value, isMultiple = false) => {
    setPreferences((prev) => {
      if (isMultiple) {
        // Get current multiple values from pref object (Notes, Occasions)
        const currentValues = prev[question];
        if (!Array.isArray(currentValues)) return prev; // Safety check in the value is not array

        // Append or remove value from array / Filtering
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        return { ...prev, [question]: newValues };
      }

      // Singular question
      return { ...prev, [question]: value };
    });
  };

  /**
   * Checks if the user has selected an option for the current step.
   * @returns {boolean}
   */
  const canProceed = () => {
    const value = preferences[currentSlide.question];
    // Handle for notes, occasions (arrays)
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    // Handle for singular values
    return value !== '';
  };

  /**
   * Moves to the next step or completes the onboarding.
   */
  const handleNext = async () => {
    if (!canProceed()) return;

    if (isLastStep) {
      try {
        setUserPreferences(preferences);
        const { data: perfumes } = await getRecommendations(preferences);
        console.log('Fetched perfumes:', perfumes);

        if (perfumes) {
          setRecommendation(perfumes);
          navigate('/results'); // navigate AFTER state updates
        } else {
          console.error('No perfumes returned');
        }
      } catch (error) {
        console.error('Error in handleNext:', error);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  /**
   * Moves to the previous step or calls the external onBack handler.
   */
  const handlePrevious = () => {
    if (currentStep === 0) {
      navigate('/');
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderOptions = () => {
    const currentValue = preferences[currentSlide.question];

    const isSelected = (option) => {
      // If array
      if (Array.isArray(currentValue)) {
        return currentValue.includes(option);
      }
      // If singular value
      return currentValue === option;
    };

    switch (currentSlide.question) {
      case 'gender':
        return <Gender handleSelect={handleSelect} isSelected={isSelected} />;

      case 'intensity':
        return (
          <Intensity handleSelect={handleSelect} isSelected={isSelected} />
        );

      case 'notes':
        return <Notes handleSelect={handleSelect} isSelected={isSelected} />;

      case 'occasions':
        return (
          <Occasions handleSelect={handleSelect} isSelected={isSelected} />
        );

      case 'price':
        return <Price handleSelect={handleSelect} isSelected={isSelected} />;

      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 font-sans p-4 sm:p-8'>
      {/* Header */}
      <Header Title='ScentMatch Finder' />

      {/* Progress Bar */}
      <Slider slides={slides} currentStep={currentStep} />

      {/* Content */}
      <div className='container mx-auto px-2 pb-8'>
        <div className='max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-2xl'>
          <div className='text-center mb-10'>
            <h2 className='text-3xl font-extrabold text-rose-900 mb-2'>
              {currentSlide.title}
            </h2>
            <p className='text-lg text-rose-700/80'>{currentSlide.subtitle}</p>
          </div>

          <div className='mb-12'>{renderOptions()}</div>

          {/* Navigation Buttons */}
          <Navigation
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            canProceed={canProceed}
            currentStep={currentStep}
            isLastStep={isLastStep}
          />
        </div>
      </div>
    </div>
  );
}
