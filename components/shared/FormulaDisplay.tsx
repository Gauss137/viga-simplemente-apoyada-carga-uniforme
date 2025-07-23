"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import 'katex/dist/katex.min.css';

// Lazy load KaTeX para mejor performance
import dynamic from 'next/dynamic';

const InlineMath = dynamic(
  () => import('react-katex').then(mod => mod.InlineMath),
  { ssr: false }
);

const BlockMath = dynamic(
  () => import('react-katex').then(mod => mod.BlockMath),
  { ssr: false }
);

interface FormulaDisplayProps {
  title?: string;
  description?: string;
  formulas: string[];
  type?: 'inline' | 'block';
  showLabels?: boolean;
}

export function FormulaDisplay({
  title = "Fórmulas Utilizadas",
  description = "Ecuaciones matemáticas aplicadas en el análisis",
  formulas,
  type = 'block',
  showLabels = true
}: FormulaDisplayProps) {
  const formulaLabels = [
    'Reacciones en los apoyos',
    'Momento flector máximo',
    'Deflexión máxima',
    'Cortante máximo',
    'Momento en sección x',
    'Deflexión en sección x'
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-[#f8b133]" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {formulas.map((formula, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {showLabels && formulaLabels[index] && (
                <div className="flex-shrink-0 w-48">
                  <span className="text-sm font-medium text-gray-700">
                    {formulaLabels[index]}:
                  </span>
                </div>
              )}
              <div className="flex-1">
                {type === 'block' ? (
                  <div className="text-center">
                    <BlockMath math={formula} />
                  </div>
                ) : (
                  <InlineMath math={formula} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p>
              <strong>Nomenclatura:</strong>
            </p>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              <span>w = Carga uniforme</span>
              <span>L = Longitud de viga</span>
              <span>E = Módulo de elasticidad</span>
              <span>I = Momento de inercia</span>
              <span>x = Distancia desde apoyo</span>
              <span>R = Reacción en apoyo</span>
              <span>M = Momento flector</span>
              <span>δ = Deflexión</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 