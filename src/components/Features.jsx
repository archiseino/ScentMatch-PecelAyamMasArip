export default function Features() {
  return (
    <section className='container mx-auto px-6 py-20'>
      <div className='text-center mb-12'>
        <h2 className='text-rose-900 mb-4'>Bagaimana caranya bekerja</h2>
        <p className='text-rose-700/80 max-w-2xl mx-auto'>
          Tiga langkah sederhana untuk menemukan aroma khas Anda
        </p>
      </div>

      <div className='grid md:grid-cols-3 gap-8'>
        <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow'>
          <div className='w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4'>
            <span className='text-rose-600'>1</span>
          </div>
          <h3 className='text-rose-900 mb-3'>Bagikan Preferensi Anda</h3>
          <p className='text-rose-700/70'>
            Beritahu kami tentang gaya Anda, aroma favorit, dan kesempatan di
            mana Anda akan menggunakan parfum Anda.
          </p>
        </div>

        <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow'>
          <div className='w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4'>
            <span className='text-rose-600'>2</span>
          </div>
          <h3 className='text-rose-900 mb-3'>Analisis AI</h3>
          <p className='text-rose-700/70'>
            Algoritma kami menganalisis jawaban Anda untuk menemukan kecocokan
            sempurna dari koleksi pilihan kami.
          </p>
        </div>

        <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow'>
          <div className='w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4'>
            <span className='text-rose-600'>3</span>
          </div>
          <h3 className='text-rose-900 mb-3'>Dapatkan Rekomendasi</h3>
          <p className='text-rose-700/70'>
            Terima rekomendasi parfum yang dipersonalisasi yang sesuai dengan
            profil unik Anda.
          </p>
        </div>
      </div>
    </section>
  );
}
