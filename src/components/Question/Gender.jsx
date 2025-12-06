export default function Gender({ handleSelect, isSelected }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {['Laki-Laki', 'Perempuan', 'Unisex'].map((option) => (
        <button
          key={option}
          onClick={() => handleSelect('gender', option, false)}
          className={`p-6 rounded-2xl border-2 transition-all shadow-md active:scale-[0.98] ${
            isSelected(option)
              ? 'border-rose-600 bg-rose-50 shadow-rose-300/50'
              : 'border-gray-200 hover:border-rose-300 bg-white'
          }`}
        >
          <div className='text-lg font-semibold text-rose-900'>{option}</div>
        </button>
      ))}
    </div>
  );
}
