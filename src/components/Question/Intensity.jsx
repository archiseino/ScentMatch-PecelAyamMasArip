export default function Intensity({ handleSelect, isSelected }) {
  return (
    <div className='space-y-4'>
      {[
        {
          value: 'Ringan',
          desc: 'Aroma ringan dan halus untuk penggunaan sehari-hari',
        },
        {
          value: 'Sedang',
          desc: 'Seimbang dan serbaguna untuk sebagian besar kondisi',
        },
        {
          value: 'Kuat',
          desc: 'Aroma tegas dan tahan lama jika kamu menginginkan kehadiran yang kuat',
        },
      ].map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect('intensity', option.value, false)}
          className={`w-full p-6 rounded-2xl border-2 transition-all text-left shadow-md active:scale-[0.99] ${
            isSelected(option.value)
              ? 'border-rose-600 bg-rose-50 shadow-rose-300/50'
              : 'border-gray-200 hover:border-rose-300 bg-white'
          }`}
        >
          <div className='text-lg font-semibold text-rose-900'>
            {option.value}
          </div>
          <div className='text-sm text-rose-700/70'>{option.desc}</div>
        </button>
      ))}
    </div>
  );
}
