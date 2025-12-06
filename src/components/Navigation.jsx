import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Navigation({
  handlePrevious,
  handleNext,
  canProceed,
  currentStep,
  isLastStep,
}) {
  return (
    <div className='flex items-center justify-between gap-4 pt-4'>
      <button
        onClick={handlePrevious}
        // Hide "Back" button on the first step, show "Back" text on others
        className={`px-4 py-2 text-rose-700 hover:text-rose-900 transition-colors flex items-center gap-1 ${
          currentStep === 0 ? 'invisible' : 'visible'
        }`}
      >
        <ChevronLeft className='w-5 h-5' />
        Back
      </button>

      <button
        onClick={handleNext}
        disabled={!canProceed()}
        className={`px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.99] flex items-center gap-2 ${
          canProceed()
            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-400/60'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isLastStep ? 'Get My Recommendations' : 'Next Step'}
        {!isLastStep && <ChevronRight className='w-5 h-5' />}
      </button>
    </div>
  );
}
