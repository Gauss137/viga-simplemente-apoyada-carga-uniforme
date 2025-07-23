import { useState, useCallback } from 'react';
import { 
  SteelCalculatorData, 
  SteelCalculatorResults, 
  Table1InputData,
  Table2InputData,
  Table3InputData,
  RebarSpec 
} from '@/types';
import { STANDARD_REBAR_DIAMETERS, REBAR_LABELS, STEEL_VALIDATION_LIMITS as VALIDATION_LIMITS } from '@/lib/steel-constants';

// Especificaciones de barras estándar
const REBAR_SPECS: RebarSpec[] = Object.entries(STANDARD_REBAR_DIAMETERS).map(([key, diameter]) => ({
  diameter,
  area: Math.PI * Math.pow(diameter, 2) / 4 / 100, // Área en cm²
  label: REBAR_LABELS[key as keyof typeof REBAR_LABELS]
}));

export function useSteelCalculator() {
  const [inputData, setInputData] = useState<SteelCalculatorData>({
    table1: {
      quantities: Object.keys(STANDARD_REBAR_DIAMETERS).reduce((acc, diameter) => {
        acc[diameter] = 0;
        return acc;
      }, {} as { [key: string]: number })
    },
    table2: {
      targetArea: 0
    },
    table3: {
      selectedBars: Object.keys(STANDARD_REBAR_DIAMETERS).reduce((acc, diameter) => {
        acc[diameter] = false;
        return acc;
      }, {} as { [key: string]: boolean }),
      quantities: Object.keys(STANDARD_REBAR_DIAMETERS).reduce((acc, diameter) => {
        acc[diameter] = 1;
        return acc;
      }, {} as { [key: string]: number }),
      steelRatio: undefined,
      spacing: undefined
    }
  });

  const [results, setResults] = useState<SteelCalculatorResults>({
    table1: { totalArea: 0 },
    table2: { suggestedQuantities: {} },
    table3: { steelRatio: undefined, spacing: undefined }
  });

  // TABLA 1: Calcular área total basada en cantidades
  const calculateTable1 = useCallback(() => {
    let totalArea = 0;
    
    Object.entries(inputData.table1.quantities).forEach(([diameter, quantity]) => {
      const spec = REBAR_SPECS.find(s => s.diameter === parseInt(diameter));
      if (spec && quantity > 0) {
        totalArea += spec.area * quantity;
      }
    });

    setResults(prev => ({
      ...prev,
      table1: { totalArea: Math.round(totalArea * 100) / 100 }
    }));
  }, [inputData.table1.quantities]);

  // TABLA 2: Calcular cantidades sugeridas basadas en área objetivo
  const calculateTable2 = useCallback(() => {
    const targetArea = inputData.table2.targetArea;
    if (targetArea <= 0) {
      setResults(prev => ({
        ...prev,
        table2: { suggestedQuantities: {} }
      }));
      return;
    }

    const suggestedQuantities: { [key: string]: number } = {};
    
    // Lógica similar al Google Sheets: (targetArea * 4) / (π * (diameter/10)²)
    REBAR_SPECS.forEach(spec => {
      const quantity = (targetArea * 4) / (Math.PI * Math.pow(spec.diameter / 10, 2));
      suggestedQuantities[spec.diameter.toString()] = Math.round(quantity * 100) / 100;
    });

    setResults(prev => ({
      ...prev,
      table2: { suggestedQuantities }
    }));
  }, [inputData.table2.targetArea]);

  // TABLA 3: Calcular cuantía ↔ separación
  const calculateTable3 = useCallback(() => {
    const { selectedBars, quantities, steelRatio, spacing } = inputData.table3;
    
    // Calcular área total de barras seleccionadas
    let totalSelectedArea = 0;
    Object.entries(selectedBars).forEach(([diameter, isSelected]) => {
      if (isSelected) {
        const spec = REBAR_SPECS.find(s => s.diameter === parseInt(diameter));
        const quantity = quantities[diameter] || 1;
        if (spec) {
          totalSelectedArea += spec.area * quantity;
        }
      }
    });

    if (totalSelectedArea === 0) {
      setResults(prev => ({
        ...prev,
        table3: { steelRatio: undefined, spacing: undefined }
      }));
      return;
    }

    let newResults: { steelRatio?: number; spacing?: number } = {};

    // Si se ingresó cuantía, calcular separación
    if (steelRatio !== undefined && steelRatio > 0) {
      const calculatedSpacing = (totalSelectedArea / steelRatio) * 100; // convertir a cm
      newResults.spacing = Math.round(calculatedSpacing * 100) / 100;
    }

    // Si se ingresó separación, calcular cuantía
    if (spacing !== undefined && spacing > 0) {
      const calculatedSteelRatio = (totalSelectedArea / spacing) * 100; // convertir a cm²/m
      newResults.steelRatio = Math.round(calculatedSteelRatio * 100) / 100;
    }

    setResults(prev => ({
      ...prev,
      table3: newResults
    }));
  }, [inputData.table3]);

  // Actualizar datos de entrada para TABLA 1
  const updateTable1Quantity = useCallback((diameter: string, quantity: number) => {
    const validQuantity = Math.max(0, Math.min(quantity, VALIDATION_LIMITS.MAX_QUANTITY));
    setInputData(prev => ({
      ...prev,
      table1: {
        ...prev.table1,
        quantities: {
          ...prev.table1.quantities,
          [diameter]: validQuantity
        }
      }
    }));
  }, []);

  // Actualizar datos de entrada para TABLA 2
  const updateTable2TargetArea = useCallback((area: number) => {
    const validArea = Math.max(0, area);
    setInputData(prev => ({
      ...prev,
      table2: { targetArea: validArea }
    }));
  }, []);

  // Actualizar datos de entrada para TABLA 3
  const updateTable3 = useCallback((updates: Partial<Table3InputData>) => {
    setInputData(prev => ({
      ...prev,
      table3: { ...prev.table3, ...updates }
    }));
  }, []);

  // Reset específico por tabla
  const resetTable1 = useCallback(() => {
    setInputData(prev => ({
      ...prev,
      table1: {
        quantities: Object.keys(STANDARD_REBAR_DIAMETERS).reduce((acc, diameter) => {
          acc[diameter] = 0;
          return acc;
        }, {} as { [key: string]: number })
      }
    }));
    setResults(prev => ({ ...prev, table1: { totalArea: 0 } }));
  }, []);

  const resetTable2 = useCallback(() => {
    setInputData(prev => ({
      ...prev,
      table2: { targetArea: 0 }
    }));
    setResults(prev => ({ ...prev, table2: { suggestedQuantities: {} } }));
  }, []);

  const resetTable3 = useCallback(() => {
    setInputData(prev => ({
      ...prev,
      table3: {
        selectedBars: Object.keys(STANDARD_REBAR_DIAMETERS).reduce((acc, diameter) => {
          acc[diameter] = false;
          return acc;
        }, {} as { [key: string]: boolean }),
        quantities: Object.keys(STANDARD_REBAR_DIAMETERS).reduce((acc, diameter) => {
          acc[diameter] = 1;
          return acc;
        }, {} as { [key: string]: number }),
        steelRatio: undefined,
        spacing: undefined
      }
    }));
    setResults(prev => ({ ...prev, table3: { steelRatio: undefined, spacing: undefined } }));
  }, []);

  return {
    inputData,
    results,
    rebarSpecs: REBAR_SPECS,
    calculateTable1,
    calculateTable2,
    calculateTable3,
    updateTable1Quantity,
    updateTable2TargetArea,
    updateTable3,
    resetTable1,
    resetTable2,
    resetTable3
  };
} 