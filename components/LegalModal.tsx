"use client";

import { X } from 'lucide-react';
import { ModalProps } from '@/types';
import { APP_CONFIG } from '@/lib/constants';

export function LegalModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Aviso Legal</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p>
              Las calculadoras fueron desarrolladas con fines educativos e informativos, y no constituyen 
              asesoramiento técnico profesional. Si bien se basan en criterios, fórmulas y normativas 
              comúnmente aceptadas, parten de supuestos simplificados y pueden no ser aplicables a todos los casos.
            </p>
            
            <p>
              La información proviene de fuentes técnicas y públicas, pero su exactitud, vigencia o 
              aplicabilidad no está garantizada. El uso de estas herramientas es responsabilidad exclusiva 
              del usuario, quien debe validar los resultados con otras fuentes y consultar a profesionales 
              habilitados antes de tomar decisiones constructivas o económicas.
            </p>
            
            <p>
              <strong>{APP_CONFIG.COMPANY}</strong> no asume responsabilidad por errores, omisiones ni 
              consecuencias derivadas de su uso.
            </p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#f8b133] text-white px-4 py-2 rounded-full border border-gray-800 hover:bg-[#e6a030] transition"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 