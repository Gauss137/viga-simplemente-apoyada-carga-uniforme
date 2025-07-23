"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleSection } from "@/components/ui/ToggleSection";
import Image from "next/image";
import { Download } from "lucide-react";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import { useBeamCalculator } from '@/hooks/useBeamCalculator';
import { useModal } from '@/hooks/useModal';
import { downloadCSV } from '@/lib/csv-export';
import { BEAM_DEFAULT_UNITS as DEFAULT_UNITS, BEAM_APP_CONFIG as config } from '@/lib/beam-constants';
import { BeamInputData } from '@/types';

export function BeamCalculator() {
  const { inputData, results, isCalculated, isValidInput, updateInput, calculate } = useBeamCalculator();
  const { isOpen: showFormulas, toggleModal: toggleFormulas } = useModal(false);
  const { isOpen: showDiagram, toggleModal: toggleDiagram } = useModal(true);

  const handleInputChange = (field: keyof BeamInputData, value: string) => {
    updateInput(field, value);
  };

  const handleDownloadCSV = () => {
    if (!isCalculated) return;
    downloadCSV(inputData, results);
  };

  return (
    <div className={`${config.MAX_WIDTH} mx-auto px-4 space-y-6`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133] inline-block pb-1">
          {config.TITLE}
        </h1>
        <p className="text-gray-600 mt-3 font-light">
          {config.DESCRIPTION}
        </p>
      </div>

      {/* Diagram Section */}
      <ToggleSection 
        isOpen={showDiagram} 
        onToggle={toggleDiagram} 
        title="Esquema"
      >
        <div className="w-full flex justify-center items-center h-60 md:h-80 bg-gray-50 text-gray-500 relative overflow-hidden rounded-lg">
          <div className="relative w-full h-full flex justify-center items-center select-none">
            <Image
              src="/esquema.svg"
              alt="Esquema de la viga simplemente apoyada con carga uniforme"
              width={800}
              height={300}
              style={{ 
                objectFit: "contain", 
                maxWidth: "100%", 
                maxHeight: "100%",
                userSelect: 'none'
              }}
              draggable={false}
              priority
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400 opacity-50 pointer-events-none select-none">
              © {config.COMPANY}
            </div>
          </div>
        </div>
      </ToggleSection>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Datos de cálculo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="L">Longitud de la viga (L) [{DEFAULT_UNITS.LENGTH}]</Label>
            <Input
              id="L"
              type="number"
              step="0.01"
              value={inputData.L}
              onChange={(e) => handleInputChange('L', e.target.value)}
              placeholder="Ej: 6.0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="w">Carga uniforme (w) [{DEFAULT_UNITS.DISTRIBUTED_LOAD}]</Label>
            <Input
              id="w"
              type="number"
              step="0.01"
              value={inputData.w}
              onChange={(e) => handleInputChange('w', e.target.value)}
              placeholder="Ej: 10.0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="E">Módulo de elasticidad (E) [{DEFAULT_UNITS.ELASTIC_MODULUS}]</Label>
            <Input
              id="E"
              type="number"
              step="100"
              value={inputData.E}
              onChange={(e) => handleInputChange('E', e.target.value)}
              placeholder="Ej: 25000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="I">Momento de inercia (I) [{DEFAULT_UNITS.MOMENT_INERTIA}]</Label>
            <Input
              id="I"
              type="number"
              step="1000"
              value={inputData.I}
              onChange={(e) => handleInputChange('I', e.target.value)}
              placeholder="Ej: 50000000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="x">Sección analizada (x) [{DEFAULT_UNITS.LENGTH}]</Label>
            <Input
              id="x"
              type="number"
              step="0.01"
              value={inputData.x}
              onChange={(e) => handleInputChange('x', e.target.value)}
              placeholder="Ej: 3.0"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={calculate}
            disabled={!isValidInput}
            className="bg-[#f8b133] text-white px-6 py-2 rounded-full border border-gray-800 hover:bg-[#e6a030] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calcular
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Resultados del cálculo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Reacciones y Fuerzas:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Reacción en apoyos (R):</span>
                <span className="font-mono">{results.R} {DEFAULT_UNITS.FORCE}</span>
              </div>
              <div className="flex justify-between">
                <span>Cortante máximo (Vmax):</span>
                <span className="font-mono">{results.Vmax} {DEFAULT_UNITS.FORCE}</span>
              </div>
              <div className="flex justify-between">
                <span>Cortante en x (Vx):</span>
                <span className="font-mono">{results.Vx} {DEFAULT_UNITS.FORCE}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Momentos:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Momento máximo (Mmax):</span>
                <span className="font-mono">{results.Mmax} {DEFAULT_UNITS.MOMENT}</span>
              </div>
              <div className="flex justify-between">
                <span>Momento en x (Mx):</span>
                <span className="font-mono">{results.Mx} {DEFAULT_UNITS.MOMENT}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Deflexiones:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Flecha máxima (Δmax):</span>
                <span className="font-mono">{results.Dmax} {DEFAULT_UNITS.DEFLECTION}</span>
              </div>
              <div className="flex justify-between">
                <span>Flecha en x (Δx):</span>
                <span className="font-mono">{results.Dx} {DEFAULT_UNITS.DEFLECTION}</span>
              </div>
            </div>
          </div>
        </div>

        {isCalculated && (
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={handleDownloadCSV}
              className="bg-[#f8b133] text-white px-3 py-1 rounded-full text-xs border border-gray-800 hover:bg-[#e6a030] transition flex items-center gap-2"
            >
              <Download size={14} />
              Descargar resultados (CSV)
            </Button>
          </div>
        )}
      </div>

      {/* Formulas Section */}
      <ToggleSection 
        isOpen={showFormulas} 
        onToggle={toggleFormulas} 
        title="Fórmulas utilizadas"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Reacciones:</h3>
            <div className="bg-gray-50 p-3 rounded border">
              <div className="flex justify-center">
                <BlockMath math="R = \frac{wL}{2}" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Fuerzas cortantes:</h3>
            <div className="bg-gray-50 p-3 rounded border space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="mb-1 md:mb-0">Cortante máximo:</span>
                <div className="flex justify-center md:justify-end">
                  <BlockMath math="V_{max} = \frac{wL}{2}" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="mb-1 md:mb-0">Cortante en sección x:</span>
                <div className="flex justify-center md:justify-end">
                  <BlockMath math="V_x = w\left(\frac{L}{2}-x\right)" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Momentos flectores:</h3>
            <div className="bg-gray-50 p-3 rounded border space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="mb-1 md:mb-0">Momento máximo:</span>
                <div className="flex justify-center md:justify-end">
                  <BlockMath math="M_{max} = \frac{wL^2}{8}" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="mb-1 md:mb-0">Momento en sección x:</span>
                <div className="flex justify-center md:justify-end">
                  <BlockMath math="M_x = \frac{wx}{2}(L-x)" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Deflexiones:</h3>
            <div className="bg-gray-50 p-3 rounded border space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="mb-1 md:mb-0">Flecha máxima:</span>
                <div className="flex justify-center md:justify-end">
                  <BlockMath math="\Delta_{max} = \frac{5wL^4}{384EI}" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="mb-1 md:mb-0">Flecha en sección x:</span>
                <div className="flex justify-center md:justify-end">
                  <BlockMath math="\Delta_x = \frac{wx^2(L^3-2Lx^2+x^3)}{24EI}" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#f8b133]/10 border border-[#f8b133]/30 rounded">
            <p className="text-xs text-[#f8b133]">
              <strong>Donde:</strong> w = carga uniforme [{DEFAULT_UNITS.DISTRIBUTED_LOAD}], L = longitud [{DEFAULT_UNITS.LENGTH}], x = distancia desde apoyo izquierdo [{DEFAULT_UNITS.LENGTH}], 
              E = módulo de elasticidad [{DEFAULT_UNITS.ELASTIC_MODULUS}], I = momento de inercia [{DEFAULT_UNITS.MOMENT_INERTIA}]
            </p>
          </div>
        </div>
      </ToggleSection>
    </div>
  );
} 