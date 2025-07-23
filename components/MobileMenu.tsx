"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import { BEAM_CATEGORIES } from '@/lib/beam-routes';
import { EXTERNAL_LINKS, ROUTES } from '@/lib/constants';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [showBeams, setShowBeams] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (categoryKey: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryKey) 
        ? prev.filter(key => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowBeams(false);
      setOpenCategories([]);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowBeams(false);
    setOpenCategories([]);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-700 hover:text-[#f1d475] transition-colors focus:outline-none"
        aria-label="Abrir menú"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu} />
      )}

      {/* Menú lateral */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header del menú */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Navegación</h2>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contenido del menú */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {/* Sección Vigas */}
              <div>
                <button
                  onClick={() => setShowBeams(!showBeams)}
                  className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="font-medium">Vigas</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${showBeams ? 'rotate-180' : ''}`}
                  />
                </button>

                {showBeams && (
                  <div className="mt-2 pl-4">
                    <div className="text-xs text-gray-500 mb-3 p-2 bg-gray-50 rounded">
                      43 calculadoras • 1 implementada • 42 en desarrollo
                    </div>
                    
                    {Object.entries(BEAM_CATEGORIES).map(([categoryKey, category]) => (
                      <div key={categoryKey} className="mb-2">
                        <button
                          onClick={() => toggleCategory(categoryKey)}
                          className="w-full flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                        >
                          <div className="flex items-center">
                            <ChevronRight 
                              size={14} 
                              className={`mr-2 transition-transform duration-200 ${
                                openCategories.includes(categoryKey) ? 'rotate-90' : ''
                              }`}
                            />
                            <span>{category.title}</span>
                          </div>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </button>

                        {openCategories.includes(categoryKey) && (
                          <div className="mt-1 ml-6 space-y-1">
                            {category.calculators.map((calculator) => (
                              <div key={calculator.id}>
                                                                 {calculator.implemented ? (
                                   <Link
                                     href={calculator.route}
                                     className="flex items-center p-2 text-xs text-gray-600 hover:text-[#f1d475] hover:bg-gray-50 rounded transition-colors"
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       closeMenu();
                                     }}
                                   >
                                    <CheckCircle size={12} className="mr-2 text-green-500 flex-shrink-0" />
                                    <span className="flex-1">{calculator.title}</span>
                                  </Link>
                                ) : (
                                  <div className="flex items-center p-2 text-xs text-gray-400">
                                    <Circle size={12} className="mr-2 text-gray-300 flex-shrink-0" />
                                    <span className="flex-1">{calculator.title}</span>
                                    <span className="text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-400">
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
                )}
              </div>

              {/* Acero */}
              <Link
                href={ROUTES.STEEL_CALCULATOR}
                className="flex items-center p-3 text-gray-700 hover:text-[#f1d475] hover:bg-gray-50 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                <span className="font-medium">Acero</span>
              </Link>

              {/* Contacto */}
              <a
                href={EXTERNAL_LINKS.CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 text-gray-700 hover:text-[#f1d475] hover:bg-gray-50 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                <span className="font-medium">Contacto</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 