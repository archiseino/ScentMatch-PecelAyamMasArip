export default function Notes({ handleSelect, isSelected }) {
  return (
    <div className='grid grid-cols-3 md:grid-cols-4 gap-4'>
      {[
        {
          value: 'Floral',
          desc: 'Aroma bunga yang feminin dan segar',
        },
        {
          value: 'Citrus',
          desc: 'Aroma buah-buahan segar yang energik',
        },
        {
          value: 'Woody',
          desc: 'Aroma kayu yang hangat dan maskulin',
        },
        {
          value: 'Oriental',
          desc: 'Aroma eksotis dengan sentuhan rempah-rempah',
        },
        {
          value: 'Fresh',
          desc: 'Aroma bersih dan menyegarkan untuk penggunaan sehari-hari',
        },
        {
          value: 'Vanilla',
          desc: 'Aroma manis dan lembut yang menggoda',
        },
        {
          value: 'Musk',
          desc: 'Aroma sensual dan tahan lama yang memikat',
        },
        {
          value: 'Spicy',
          desc: 'Aroma hangat dengan sentuhan rempah-rempah yang berani',
        },
        {
          value: 'Aquatic',
          desc: 'Aroma segar dengan nuansa laut dan air',
        },
        {
          value: 'Gourmand',
          desc: 'Aroma lezat yang mengingatkan pada makanan manis dan gurih',
        },
      ].map((note) => (
        <button
          key={note.value}
          onClick={() => handleSelect('notes', note.value, true)}
          className={`p-4 rounded-2xl border-2 transition-all text-center shadow-sm active:scale-[0.98] ${
            isSelected(note.value)
              ? 'border-rose-600 bg-rose-50 shadow-rose-300/50'
              : 'border-gray-200 hover:border-rose-300 bg-white'
          }`}
        >
          <div className='text-sm font-medium'>{note.value}</div>
          <div className='text-xs text-rose-700/70 mt-1'>{note.desc}</div>
        </button>
      ))}
    </div>
  );
}
