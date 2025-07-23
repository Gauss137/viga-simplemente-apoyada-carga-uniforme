"use client";

// components/Footer.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LegalModal, { useLegalModal } from './LegalModal';

export default function Footer() {
    const [currentYear, setCurrentYear] = useState('');
    const { isOpen, openModal, closeModal } = useLegalModal();

    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString());
    }, []);

    return (
      <>
        <footer className="w-full bg-white py-4 mt-8 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 text-center text-sm text-gray-600">
            <p className="mt-4 text-xs text-gray-500">
              Todo el contenido de esta página es de acceso libre y gratuito. Si las herramientas, artículos o recursos ofrecidos resultan útiles, es posible colaborar con una pequeña contribución voluntaria a través de los siguientes medios. Estos aportes ayudan a mantener y mejorar el desarrollo de nuevos contenidos abiertos para la comunidad técnica.
            </p>
            <div className="flex justify-center items-center space-x-4 mt-2">
              <a href="#" className="bg-[#f8b133] text-white px-3 py-1 rounded-full text-xs border border-gray-800 hover:bg-[#e6a030] transition">Cafecito</a>
              <a href="#" className="bg-[#f8b133] text-white px-3 py-1 rounded-full text-xs border border-gray-800 hover:bg-[#e6a030] transition">PayPal</a>
            </div>
            
            {/* Aviso Legal discreto */}
            <div className="mt-3 border-t border-gray-100 pt-3">
              <button
                onClick={openModal}
                className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
              >
                Aviso Legal y Términos de Uso
              </button>
            </div>
            
            <p className="font-semibold mt-4">Desarrollado por cswingenieriacivil.com – {currentYear}</p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/cswingenieriacivil/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/naranjalinktij.png"
                  alt="LinkedIn"
                  width={35}
                  height={35}
                  style={{ objectFit: "contain" }}
                />
              </a>
              
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/csw_ingenieriacivil/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/naranjainsttij.png"
                  alt="Instagram"
                  width={35}
                  height={35}
                  style={{ objectFit: "contain" }}
                />
              </a>
            </div>
          </div>
        </footer>
        
        <LegalModal isOpen={isOpen} onClose={closeModal} />
      </>
    )
  }
  