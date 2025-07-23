"use client";

import { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleSection } from "@/components/ui/ToggleSection";
import { RotateCcw } from "lucide-react";

import { useSteelCalculator } from '@/hooks/useSteelCalculator';
import { useModal } from '@/hooks/useModal';
import { STEEL_APP_CONFIG as APP_CONFIG, STEEL_DEFAULT_UNITS as DEFAULT_UNITS } from '@/lib/steel-constants';

export function SteelCalculator() {
  const {
    inputData,
    results,
    rebarSpecs,
    calculateTable1,
    calculateTable2,
    calculateTable3,
    updateTable1Quantity,
    updateTable2TargetArea,
    updateTable3,
    resetTable1,
    resetTable2,
    resetTable3
  } = useSteelCalculator();

  const { isOpen: showTable1, toggleModal: toggleTable1 } = useModal(true);
  const { isOpen: showTable2, toggleModal: toggleTable2 } = useModal(false);
  const { isOpen: showTable3, toggleModal: toggleTable3 } = useModal(false);

  // Auto-calcular cuando cambien los datos
  useEffect(() => {
    calculateTable1();
  }, [calculateTable1]);

  useEffect(() => {
    calculateTable2();
  }, [calculateTable2]);

  useEffect(() => {
    calculateTable3();
  }, [calculateTable3]);

  return (
    <div className={`${APP_CONFIG.MAX_WIDTH} mx-auto px-4 space-y-6`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133] inline-block pb-1">
          {APP_CONFIG.TITLE}
        </h1>
        <p className="text-gray-600 mt-3 font-light">
          {APP_CONFIG.DESCRIPTION}
        </p>
      </div>

      {/* TABLA 1: Cantidades → Área Total */}
      <ToggleSection 
        isOpen={showTable1} 
        onToggle={toggleTable1} 
        title="TABLA 1: Cálculo de Área Total de Acero"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Descripción:</h3>
            <p className="text-sm text-blue-700">
              Ingresa las cantidades de barras para calcular el área total de acero.
              La calculadora sumará automáticamente las áreas según el diámetro y cantidad de cada barra.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rebarSpecs.map((spec) => (
              <div key={spec.diameter} className="space-y-2">
                <Label htmlFor={`table1-${spec.diameter}`}>
                  {spec.label} ({spec.area.toFixed(2)} {DEFAULT_UNITS.AREA})
                </Label>
                <Input
                  id={`table1-${spec.diameter}`}
                  type="number"
                  min="0"
                  max="999"
                  value={inputData.table1.quantities[spec.diameter.toString()] || 0}
                  onChange={(e) => updateTable1Quantity(spec.diameter.toString(), parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-green-800">Área Total de Acero:</span>
              <span className="text-2xl font-bold text-green-900">
                {results.table1.totalArea.toFixed(2)} {DEFAULT_UNITS.AREA}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={resetTable1}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Resetear TABLA 1
            </Button>
          </div>
        </div>
      </ToggleSection>

      {/* TABLA 2: Área Total → Cantidades */}
      <ToggleSection 
        isOpen={showTable2} 
        onToggle={toggleTable2} 
        title="TABLA 2: Cálculo de Cantidades de Barras"
      >
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Descripción:</h3>
            <p className="text-sm text-purple-700">
              Ingresa el área total de acero deseada y la calculadora te sugerirá 
              las cantidades necesarias para cada diámetro de barra.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label htmlFor="target-area">Área Total Deseada ({DEFAULT_UNITS.AREA})</Label>
            <Input
              id="target-area"
              type="number"
              step="0.01"
              min="0"
              value={inputData.table2.targetArea || ''}
              onChange={(e) => updateTable2TargetArea(parseFloat(e.target.value) || 0)}
              placeholder="Ej: 10.5"
              className="mt-2"
            />
          </div>

          {inputData.table2.targetArea > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Cantidades Sugeridas:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {rebarSpecs.map((spec) => (
                  <div key={spec.diameter} className="bg-gray-50 p-3 rounded border">
                    <div className="text-center">
                      <div className="font-semibold text-gray-700">{spec.label}</div>
                      <div className="text-lg font-bold text-gray-900">
                        {results.table2.suggestedQuantities[spec.diameter.toString()]?.toFixed(2) || '0.00'}
                      </div>
                      <div className="text-xs text-gray-500">{DEFAULT_UNITS.QUANTITY}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Button 
              onClick={resetTable2}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Resetear TABLA 2
            </Button>
          </div>
        </div>
      </ToggleSection>

      {/* TABLA 3: Cuantías ↔ Separaciones */}
      <ToggleSection 
        isOpen={showTable3} 
        onToggle={toggleTable3} 
        title="TABLA 3: Cálculo de Cuantías y Separaciones"
      >
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-2">Descripción:</h3>
            <p className="text-sm text-orange-700">
              Selecciona las barras de interés y sus cantidades. Luego ingresa OPCIÓN 1 (cuantía) 
              para calcular separación, o OPCIÓN 2 (separación) para calcular cuantía.
            </p>
          </div>

          {/* Selección de barras */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">1. Seleccionar Barras y Cantidades:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rebarSpecs.map((spec) => (
                <div key={spec.diameter} className="flex items-center space-x-3 p-3 border rounded">
                  <input
                    type="checkbox"
                    id={`table3-check-${spec.diameter}`}
                    checked={inputData.table3.selectedBars[spec.diameter.toString()] || false}
                    onChange={(e) => updateTable3({
                      selectedBars: {
                        ...inputData.table3.selectedBars,
                        [spec.diameter.toString()]: e.target.checked
                      }
                    })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor={`table3-check-${spec.diameter}`} className="flex-1">
                    {spec.label}
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="99"
                    value={inputData.table3.quantities[spec.diameter.toString()] || 1}
                    onChange={(e) => updateTable3({
                      quantities: {
                        ...inputData.table3.quantities,
                        [spec.diameter.toString()]: parseInt(e.target.value) || 1
                      }
                    })}
                    className="w-16"
                    disabled={!inputData.table3.selectedBars[spec.diameter.toString()]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Opciones de cálculo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">OPCIÓN 1: Cuantía → Separación</h3>
              <div>
                <Label htmlFor="steel-ratio">Cuantía de Acero ({DEFAULT_UNITS.STEEL_RATIO})</Label>
                <Input
                  id="steel-ratio"
                  type="number"
                  step="0.01"
                  min="0"
                  value={inputData.table3.steelRatio || ''}
                  onChange={(e) => updateTable3({
                    steelRatio: parseFloat(e.target.value) || undefined,
                    spacing: undefined // Limpiar el otro campo
                  })}
                  placeholder="Ej: 5.0"
                />
              </div>
              {results.table3.spacing !== undefined && (
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <span className="font-semibold text-green-800">Separación Calculada:</span>
                  <span className="ml-2 text-lg font-bold text-green-900">
                    {results.table3.spacing.toFixed(2)} {DEFAULT_UNITS.SPACING}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">OPCIÓN 2: Separación → Cuantía</h3>
              <div>
                <Label htmlFor="spacing">Separación de Barras ({DEFAULT_UNITS.SPACING})</Label>
                <Input
                  id="spacing"
                  type="number"
                  step="0.1"
                  min="0"
                  value={inputData.table3.spacing || ''}
                  onChange={(e) => updateTable3({
                    spacing: parseFloat(e.target.value) || undefined,
                    steelRatio: undefined // Limpiar el otro campo
                  })}
                  placeholder="Ej: 20.0"
                />
              </div>
              {results.table3.steelRatio !== undefined && (
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <span className="font-semibold text-blue-800">Cuantía Calculada:</span>
                  <span className="ml-2 text-lg font-bold text-blue-900">
                    {results.table3.steelRatio.toFixed(2)} {DEFAULT_UNITS.STEEL_RATIO}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={resetTable3}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Resetear TABLA 3
            </Button>
          </div>
        </div>
      </ToggleSection>

      {/* Información adicional */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Especificaciones de Barras de Acero:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rebarSpecs.map((spec) => (
            <div key={spec.diameter} className="text-center">
              <div className="font-semibold text-gray-700">{spec.label}</div>
              <div className="text-sm text-gray-600">
                Área: {spec.area.toFixed(2)} {DEFAULT_UNITS.AREA}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 