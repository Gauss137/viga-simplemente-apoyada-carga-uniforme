"use client";

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info, FileDown, RotateCcw } from 'lucide-react';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  category: string;
  status?: 'implemented' | 'in_progress' | 'planned';
  children: ReactNode;
  inputPanel: ReactNode;
  resultsPanel?: ReactNode;
  diagramPanel?: ReactNode;
  formulasPanel?: ReactNode;
  onReset?: () => void;
  onExport?: () => void;
}

export function CalculatorLayout({
  title,
  description,
  category,
  status = 'implemented',
  children,
  inputPanel,
  resultsPanel,
  diagramPanel,
  formulasPanel,
  onReset,
  onExport
}: CalculatorLayoutProps) {
  const statusColors = {
    implemented: 'bg-green-100 text-green-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    planned: 'bg-gray-100 text-gray-800'
  };

  const statusLabels = {
    implemented: 'Implementada',
    in_progress: 'En Desarrollo',
    planned: 'Planificada'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="h-8 w-8 text-[#f8b133]" />
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <Badge className={statusColors[status]}>
              {statusLabels[status]}
            </Badge>
          </div>
          <p className="text-gray-600 text-lg">{description}</p>
          <div className="text-sm text-gray-500 mt-1">
            Categoría: {category}
          </div>
        </div>

        {status === 'planned' && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-yellow-800">
                <Info className="h-5 w-5" />
                <span className="font-medium">Calculadora en Desarrollo</span>
              </div>
              <p className="text-yellow-700 mt-2">
                Esta calculadora está siendo desarrollada. Los cálculos y resultados mostrados son preliminares.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="xl:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Datos de Entrada
                </CardTitle>
                <CardDescription>
                  Ingrese los parámetros de análisis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {inputPanel}
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-6 pt-4 border-t">
                  {onReset && (
                    <button
                      onClick={onReset}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                      title="Restablecer valores"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </button>
                  )}
                  {onExport && (
                    <button
                      onClick={onExport}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                      title="Exportar resultados"
                    >
                      <FileDown className="h-4 w-4" />
                      Exportar
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results and Content Panel */}
          <div className="xl:col-span-2 space-y-8">
            {/* Results Panel */}
            {resultsPanel && (
              <div>{resultsPanel}</div>
            )}

            {/* Diagram Panel */}
            {diagramPanel && (
              <Card>
                <CardHeader>
                  <CardTitle>Diagrama Estructural</CardTitle>
                  <CardDescription>
                    Representación visual del elemento analizado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {diagramPanel}
                </CardContent>
              </Card>
            )}

            {/* Formulas Panel */}
            {formulasPanel && (
              <Card>
                <CardHeader>
                  <CardTitle>Fórmulas Utilizadas</CardTitle>
                  <CardDescription>
                    Ecuaciones y métodos de cálculo aplicados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formulasPanel}
                </CardContent>
              </Card>
            )}

            {/* Custom Content */}
            {children}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-sm text-gray-500 text-center">
            <p>
              Desarrollado por{' '}
              <a 
                href="https://www.cswingenieriacivil.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#f8b133] hover:underline"
              >
                CSW Ingeniería Civil
              </a>
            </p>
            <p className="mt-1">
              Las calculadoras son herramientas de apoyo educativo e informativo.
              No constituyen asesoramiento técnico profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 