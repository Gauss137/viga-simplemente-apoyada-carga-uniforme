import { ChevronDown, ChevronUp } from 'lucide-react';
import { ToggleSectionProps } from '@/types';

export function ToggleSection({ isOpen, onToggle, title, children }: ToggleSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-lg"
        aria-expanded={isOpen}
        aria-controls={`${title.toLowerCase().replace(/\s+/g, '-')}-content`}
      >
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <div className="flex items-center text-gray-600">
          <span className="text-sm mr-2">
            {isOpen ? 'Ocultar' : 'Mostrar'}
          </span>
          {isOpen ? (
            <ChevronUp size={20} aria-hidden="true" />
          ) : (
            <ChevronDown size={20} aria-hidden="true" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div
          id={`${title.toLowerCase().replace(/\s+/g, '-')}-content`}
          className="px-4 pb-4 md:px-6 md:pb-6 border-t border-gray-100"
        >
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
} 