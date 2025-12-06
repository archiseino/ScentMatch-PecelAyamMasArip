import { Heart, ShoppingCart, Star, Wand2 } from 'lucide-react';
import React from 'react';

const ImageWithFallback = ({ src, alt, className }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleError = () => {
    setImageError(true);
  };

  if (imageError || !src) {
    return (
      <div
        className={`${className} flex items-center justify-center text-gray-500 bg-gray-100/50`}
      >
        <Sparkles className='w-8 h-8 text-rose-400' />
      </div>
    );
  }

  return (
    <img src={src} alt={alt} onError={handleError} className={className} />
  );
};

export default function Recomendation({ recomendations, onCustomize }) {
  return (
    <div className='max-w-5xl mx-auto space-y-8'>
      {recomendations.map((perfume, index) => (
        <div
          key={perfume.id}
          className='bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border border-gray-100'
        >
          <div className='grid grid-cols-1 md:grid-cols-5 gap-6 p-6 sm:p-8 items-center'>
            {/* Image & Match */}

            <div className='relative col-span-1 md:col-span-2 aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-amber-100 shadow-md'>
              <ImageWithFallback
                src={
                  index === 0
                    ? 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2NDgxMzgzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                    : index === 1
                    ? 'https://images.unsplash.com/photo-1655500061669-1f8ac338a319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwZXJmdW1lJTIwY29sbGVjdGlvbiUyMGVsZWdhbnR8ZW58MXx8fHwxNzY0OTMwNDkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                    : 'https://images.unsplash.com/photo-1763970586856-0c71ab0e5c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmcmFncmFuY2UlMjBpbmdyZWRpZW50cyUyMGZsb3dlcnN8ZW58MXx8fHwxNzY0ODU2MzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                }
                alt={perfume.name}
                className='w-full h-full object-cover transition-opacity duration-500'
              />
              <div className='absolute top-4 right-4 px-4 py-1.5 bg-rose-600 text-white rounded-full flex items-center gap-1 font-semibold'>
                {/* <Star className='w-4 h-4 fill-amber-300 text-amber-300' /> */}
                <span> Match</span>
              </div>
            </div>

            {/* Details & Actions */}
            <div className='md:col-span-3 flex flex-col justify-between h-full'>
              <div>
                <div className='text-sm font-semibold text-rose-700/70 mb-1'>
                  {perfume.brand}
                </div>
                <h3 className='text-2xl font-bold text-rose-900 mb-2'>
                  {perfume.name}
                </h3>
                <p className='text-rose-700/80 mb-4'>{perfume.description}</p>

                {/* Main Accord */}
                <div className='text-sm text-rose-700/70 mb-1'>
                  Main Accord: {perfume.main_accord}
                </div>

                {/* Notes */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {perfume.all_notes.map((note) => (
                    <span
                      key={note}
                      className='px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-medium'
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                {/* <div className='flex items-center gap-3 mb-6'>
                  <div className='flex items-center gap-0.5'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-colors ${
                          i < Math.floor(perfume.rating)
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-sm text-rose-700/70 font-semibold'>
                    {perfume.rating} Rating
                  </span>
                </div> */}
              </div>

              {/* Actions */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100'>
                <div className='text-2xl font-extrabold text-rose-900'>
                  {perfume.price_tier}
                </div>

                <div className='flex gap-2 flex-wrap'>
                  {/* Customize Button (Primary Action) */}
                  <button
                    onClick={() => onCustomize(perfume)}
                    className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1 font-medium shadow-lg shadow-purple-400/50 text-sm'
                  >
                    <Wand2 className='w-4 h-4' />
                    Customize
                  </button>

                  {/* Add to Cart Button */}
                  <button className='px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1 font-medium shadow-lg shadow-rose-400/50 text-sm'>
                    <ShoppingCart className='w-4 h-4' />
                    Buy Now
                  </button>

                  {/* Wishlist Button */}
                  <button className='p-2 rounded-full border-2 border-gray-200 hover:border-rose-600 hover:text-rose-600 transition-colors bg-white shadow-sm text-gray-500'>
                    <Heart className='w-5 h-5' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
