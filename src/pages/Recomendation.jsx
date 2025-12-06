import React from 'react';
import { Sparkles } from 'lucide-react';
import Header from '../components/Header';
import PrefSummary from '../components/PrefSummary';
import Recomendation from '../components/Recomendation';
import mockRecommendations from '../utils/mockRec';

/**
 * @typedef {object} UserPreferences
 * @property {string} gender
 * @property {string} intensity
 * @property {string[]} notes
 * @property {string[]} occasions
 * @property {string} season
 */

/**
 * @typedef {object} RecommendationResultsProps
 * @property {UserPreferences} preferences - User preferences used for display.
 * @property {() => void} onStartOver - Handler to restart the onboarding.
 * @property {(perfume: any) => void} onCustomize - Handler to customize a perfume.
 */

/**
 * Display component for the final fragrance recommendations.
 * This component is exported as 'App' for standalone runnability.
 */

export default function RecommendationResults({
  recommendation,
  preferences,
  onStartOver,
  onCustomize,
}) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 font-sans p-4 sm:p-8'>
      {/* Header */}
      <Header
        Title='ScentMatch Finder'
        Action={onStartOver}
        ActionLabel='Start Over'
      />

      {/* Results Header */}
      <section className='container mx-auto px-2 py-8'>
        <div className='text-center max-w-2xl mx-auto'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-full mb-4 font-semibold text-sm'>
            <Sparkles className='w-4 h-4 fill-rose-600 text-rose-600' />
            Rekomendasi untuk kamu
          </div>
          <h1 className='text-3xl sm:text-4xl font-extrabold text-rose-900 mb-4'>
            We Found Your Signature Scents
          </h1>
          <p className='text-lg text-rose-700/80'>
            Berdasarkan preferensi yang kamu pilih, berikut adalah rekomendasi
            parfum yang paling sesuai untukmu.
          </p>
        </div>

        {/* Preferences Summary */}
        <PrefSummary preferences={preferences} />
      </section>

      {/* Recommendations */}
      <Recomendation
        recomendations={recommendation}
        onCustomize={onCustomize}
      />
      <section className='container mx-auto px-2 pb-16'></section>
    </div>
  );
}
