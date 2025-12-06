import { Sparkles } from 'lucide-react';

export default function Header({ Title, Action, ActionLabel }) {
  return (
    <header className='container mx-auto px-6 py-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Sparkles className='w-8 h-8 text-rose-600' />
          <span className='text-rose-900'>{Title}</span>
        </div>
        {/* Safe guard */}
        {Action && ActionLabel && (
          <button
            className='px-6 py-2 text-rose-700 hover:text-rose-900 transition-colors'
            onClick={Action}
          >
            {ActionLabel}
          </button>
        )}
      </div>
    </header>
  );
}
