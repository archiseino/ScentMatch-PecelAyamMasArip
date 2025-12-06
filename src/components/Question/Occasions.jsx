export default function Occasions({ handleSelect, isSelected }) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {[
        'Sehari-Hari',
        'Kantor & Profesional',
        'Menjelang Malam',
        'Formal & Spesial',
        'Olahraga & Outdoor',
        'Kencan Malam',
      ].map((occasion) => (
        <button
          key={occasion}
          onClick={() => handleSelect('occasions', occasion, true)}
          className={`p-6 rounded-2xl border-2 transition-all shadow-md active:scale-[0.98] ${
            isSelected(occasion)
              ? 'border-rose-600 bg-rose-50 shadow-rose-300/50'
              : 'border-gray-200 hover:border-rose-300 bg-white'
          }`}
        >
          <div className='text-lg font-semibold text-rose-900'>{occasion}</div>
        </button>
      ))}
    </div>
  );
}
