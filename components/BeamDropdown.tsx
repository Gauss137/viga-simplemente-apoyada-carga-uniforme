"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import { BEAM_CATEGORIES } from '@/lib/beam-routes';

export function BeamDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (categoryKey: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryKey) 
        ? prev.filter(key => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-700 hover:text-[#f1d475] transition-colors"
        onBlur={(e) => {
          // Cerrar dropdown si se hace clic fuera
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setTimeout(() => setIsOpen(false), 150);
          }
        }}
      >
        <span>Vigas</span>
        <ChevronDown 
          size={16} 
          className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Calculadoras de Vigas</h3>
            <p className="text-xs text-gray-500">
              {Object.values(BEAM_CATEGORIES).reduce((acc, cat) => acc + cat.count, 0)} calculadoras disponibles
            </p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {Object.entries(BEAM_CATEGORIES).map(([categoryKey, category]) => (
              <div key={categoryKey} className="border-b border-gray-50 last:border-b-0">
                <button
                  onClick={() => toggleCategory(categoryKey)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <ChevronRight 
                      size={16} 
                      className={`mr-2 transition-transform ${
                        openCategories.includes(categoryKey) ? 'rotate-90' : ''
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {category.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>

                {openCategories.includes(categoryKey) && (
                  <div className="pl-6 pb-2">
                    {category.calculators.map((calculator) => (
                      <div key={calculator.id} className="mb-1">
                        {calculator.implemented ? (
                          <Link
                            href={calculator.route}
                            className="flex items-center p-2 text-sm text-gray-600 hover:text-[#f1d475] hover:bg-gray-50 rounded transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <CheckCircle size={14} className="mr-2 text-green-500" />
                            <span className="flex-1">{calculator.title}</span>
                          </Link>
                        ) : (
                          <div className="flex items-center p-2 text-sm text-gray-400 cursor-not-allowed">
                            <Circle size={14} className="mr-2 text-gray-300" />
                            <span className="flex-1">{calculator.title}</span>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                              Próximamente
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

                     <div className="p-3 border-t border-gray-100 bg-gray-50">
             <div className="flex items-center justify-between text-xs text-gray-500">
               <span>
                 ✅ 1 Implementada
               </span>
               <span>
                 🔄 42 En desarrollo
               </span>
             </div>
           </div>
        </div>
      )}
    </div>
  );
} 