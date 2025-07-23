"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import { BEAM_CATEGORIES } from '@/lib/beam-routes';

export function BeamDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (categoryKey: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpenCategories(prev => 
      prev.includes(categoryKey) 
        ? prev.filter(key => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setOpenCategories([]);
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Prevenir que clics dentro del dropdown lo cierren
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const handleCategoryClick = (categoryKey: string) => {
    toggleCategory(categoryKey);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 hover:text-[#f1d475] transition-colors focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Vigas</span>
        <ChevronDown 
          size={16} 
          className={`ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden"
          onClick={handleDropdownClick}
          onMouseDown={handleDropdownClick}
          onMouseUp={handleDropdownClick}
        >
                        <div className="p-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">Calculadoras de Vigas</h3>
                <p className="text-xs text-gray-500 mt-1">
                  43 calculadoras disponibles
                </p>
              </div>

          <div className="max-h-80 overflow-y-auto">
            {Object.entries(BEAM_CATEGORIES).map(([categoryKey, category]) => (
              <div key={categoryKey} className="border-b border-gray-50 last:border-b-0">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    handleCategoryClick(categoryKey);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <ChevronRight 
                      size={16} 
                      className={`transition-transform duration-200 ${
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
                </div>

                {openCategories.includes(categoryKey) && (
                  <div className="pl-8 pb-2 bg-gray-50">
                    {category.calculators.map((calculator) => (
                      <div key={calculator.id} className="mb-1">
                        {calculator.implemented ? (
                          <Link
                            href={calculator.route}
                            className="flex items-center justify-between p-2 text-sm text-gray-600 hover:text-[#f1d475] hover:bg-white rounded transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              closeDropdown();
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <CheckCircle size={14} className="text-green-500" />
                              <span>{calculator.title}</span>
                            </div>
                          </Link>
                        ) : (
                          <div 
                            className="flex items-center justify-between p-2 text-sm text-gray-400 cursor-not-allowed"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <Circle size={14} className="text-gray-300" />
                              <span>{calculator.title}</span>
                            </div>
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-500">
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
              <span>✅ 1 Implementada</span>
              <span>🔄 42 En desarrollo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 