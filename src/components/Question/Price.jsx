export default function Price({ handleSelect, isSelected }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {[
        {
          value: 'Low',
          desc: 'Harga terjangkau untuk penggunaan sehari-hari (50k - 200k)',
        },
        {
          value: 'Medium',
          desc: 'Kualitas baik dengan harga menengah (200k - 500k)',
        },
        {
          value: 'High',
          desc: 'Parfum premium untuk momen spesial (500k - 1jt)',
        },
        {
          value: 'Luxury',
          desc: 'Parfum eksklusif dengan kualitas terbaik (1jt ke atas)',
        },
      ].map((price) => (
        <button
          key={price.value}
          onClick={() => handleSelect('price', price.value, false)}
          className={`p-6 rounded-2xl border-2 transition-all shadow-md active:scale-[0.98] ${
            isSelected(price.value)
              ? 'border-rose-600 bg-rose-50 shadow-rose-300/50'
              : 'border-gray-200 hover:border-rose-300 bg-white'
          }`}
        >
          <div className='text-lg font-semibold text-rose-900'>
            {price.value}
          </div>
          <div className='text-xs text-rose-700/70 mt-1'>{price.desc}</div>
        </button>
      ))}
    </div>
  );
}
