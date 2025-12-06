export default function PrefSummary({ preferences }) {
  return (
    <div className='mt-12 max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100'>
      <div className='text-xl font-bold text-rose-900 mb-4'>
        Your Profile Snapshot
      </div>
      <div className='flex flex-wrap gap-3'>
        {/* Gender, Intensity, Season - Primary */}
        {[
          preferences.gender,
          `${preferences.intensity} Intensity`,
          `Range Harga ${preferences.price}`,
          preferences.occasions,
        ].map((p, i) => (
          <span
            key={i}
            className='px-4 py-2 bg-rose-200 text-rose-800 rounded-full text-sm font-medium shadow-inner'
          >
            {p}
          </span>
        ))}
        {/* Notes - Secondary */}
        {preferences.notes.map((note) => (
          <span
            key={note}
            className='px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium shadow-inner'
          >
            {note}
          </span>
        ))}
        {/* Occasions - Tertiary */}
        {/* {preferences.occasions.map((occasion) => (
          <span
            key={occasion}
            className='px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium shadow-inner'
          >
            {occasion}
          </span>
        ))} */}
      </div>
    </div>
  );
}
