import { handleExport } from '../utils/exportFormula';
import { ArrowLeft, Beaker, Download } from 'lucide-react';

export default function HeaderChatbot({ onBack, customBlend }) {
  return (
    <header className='container mx-auto px-6 py-6 border-b border-rose-100'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button
            onClick={onBack}
            className='p-2 hover:bg-rose-100 rounded-full transition-colors'
          >
            <ArrowLeft className='w-5 h-5 text-rose-700' />
          </button>
          <div className='flex items-center gap-2'>
            <Beaker className='w-8 h-8 text-rose-600' />
            <div>
              <div className='text-rose-900'>Co-Creation Studio</div>
              <div className='text-rose-700/70'>
                Customize your perfect scent
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleExport(customBlend)}
          className='px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-colors flex items-center gap-2'
        >
          <Download className='w-4 h-4' />
          Export Brief
        </button>
      </div>
    </header>
  );
}
