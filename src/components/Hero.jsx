import { Sparkles, ChevronRight } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className='container mx-auto px-6 py-20'>
      <div className='grid md:grid-cols-2 gap-12 items-center'>
        <div className='space-y-6'>
          <div className='inline-block px-4 py-2 bg-rose-100 text-rose-700 rounded-full'>
            Rekomendasi Wewangian Kamu
          </div>
          <h1 className='text-rose-900'>
            Temukan Parfum Yang Sesuai Dengan Dirikamu
          </h1>
          <p className='text-rose-700/80'>
            Jawab beberapa pertanyaan sederhana dan biarkan sistem rekomendasi
            berbasis AI kami menemukan wewangian yang sempurna sesuai dengan
            preferensi dan kepribadian unikmu.
          </p>
          <button
            onClick={onGetStarted}
            className='group px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl'
          >
            Mulai
            <ChevronRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </button>
          <div className='flex items-center gap-8 pt-6'>
            {/* <div>
              <div className='text-rose-900'>10,000+</div>
              <div className='text-rose-700/70'>Happy Users</div>
            </div> */}
            <div>
              <div className='text-rose-900'>200+</div>
              <div className='text-rose-700/70'>Parfum</div>
            </div>
            {/* <div>
              <div className='text-rose-900'>98%</div>
              <div className='text-rose-700/70'>Match Rate</div>
            </div> */}
          </div>
        </div>

        <div className='relative'>
          <div className='aspect-square rounded-3xl overflow-hidden shadow-2xl'>
            {/* Replaced ImageWithFallback with standard img tag */}
            <img
              src='https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2NDgxMzgzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              alt='Luxury perfume bottle'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full flex items-center justify-center'>
                <Sparkles className='w-6 h-6 text-white' />
              </div>
              <div>
                <div className='text-rose-900'>AI-Powered</div>
                <div className='text-rose-700/70'>Smart Matching</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
