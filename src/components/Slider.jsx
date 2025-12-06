export default function Slider({ slides, currentStep }) {
  return (
    <div className='container mx-auto px-2 mt-4 mb-10'>
      <div className='flex items-center gap-2'>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              index <= currentStep ? 'bg-rose-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <div className='mt-3 text-sm font-medium text-rose-700/80'>
        Step {currentStep + 1} of {slides.length}
      </div>
    </div>
  );
}
