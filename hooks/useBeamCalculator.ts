import { useState, useCallback } from 'react';
import { BeamInputData, BeamResults, BeamCalculationParams } from '@/types';
import { BEAM_VALIDATION_LIMITS as VALIDATION_LIMITS } from '@/lib/beam-constants';

export function useBeamCalculator() {
  const [inputData, setInputData] = useState<BeamInputData>({
    x: "",
    L: "",
    w: "",
    E: "",
    I: ""
  });

  const [results, setResults] = useState<BeamResults>({
    R: "-",
    Vmax: "-", 
    Vx: "-",
    Mmax: "-",
    Mx: "-",
    Dmax: "-",
    Dx: "-"
  });

  const [isCalculated, setIsCalculated] = useState(false);

  // Validar si todos los datos son válidos
  const isValidInput = useCallback(() => {
    return Object.values(inputData).every(value => 
      value !== "" && !isNaN(Number(value)) && Number(value) > 0
    );
  }, [inputData]);

  // Actualizar datos de entrada
  const updateInput = useCallback((field: keyof BeamInputData, value: string) => {
    setInputData(prev => ({ ...prev, [field]: value }));
    setIsCalculated(false);
    setResults({
      R: "-",
      Vmax: "-", 
      Vx: "-",
      Mmax: "-",
      Mx: "-",
      Dmax: "-",
      Dx: "-"
    });
  }, []);

  // Realizar cálculos
  const calculate = useCallback(() => {
    if (!isValidInput()) return;

    const params: BeamCalculationParams = {
      x: parseFloat(inputData.x),
      L: Math.max(parseFloat(inputData.L), VALIDATION_LIMITS.MIN_VALUE),
      w: Math.max(parseFloat(inputData.w), VALIDATION_LIMITS.MIN_VALUE),
      E: Math.max(parseFloat(inputData.E), VALIDATION_LIMITS.MIN_VALUE),
      I: Math.max(parseFloat(inputData.I), VALIDATION_LIMITS.MIN_VALUE)
    };

    // Conversiones para deflexión
    const wN = params.w * 1000; // kN/m a N/m
    const Em2 = params.E * 1e6; // MPa a N/m²
    const Im4 = params.I / 1e12; // mm⁴ a m⁴

    // Cálculos
    const R_calc = ((params.w * params.L) / 2).toFixed(1);
    const Vmax_calc = R_calc;
    const Vx_calc = (params.w * ((params.L / 2) - params.x)).toFixed(1);
    const Mmax_calc = ((params.w * params.L * params.L) / 8).toFixed(VALIDATION_LIMITS.MAX_DECIMAL_PLACES);
    const Mx_calc = ((params.w * params.x / 2) * (params.L - params.x)).toFixed(VALIDATION_LIMITS.MAX_DECIMAL_PLACES);

    // Deflexión máxima (en mm)
    const Dmax_m = (5 * wN * Math.pow(params.L, 4)) / (384 * Em2 * Im4);
    const Dmax_calc = isNaN(Dmax_m) ? "-" : (Dmax_m * 1000).toFixed(VALIDATION_LIMITS.MAX_DECIMAL_PLACES);

    // Deflexión en x (en mm)
    const Dx_m = (wN * Math.pow(params.x, 2) * (Math.pow(params.L, 3) - 2 * params.L * Math.pow(params.x, 2) + Math.pow(params.x, 3))) / (24 * Em2 * Im4);
    const Dx_calc = isNaN(Dx_m) ? "-" : (Dx_m * 1000).toFixed(VALIDATION_LIMITS.MAX_DECIMAL_PLACES);

    setResults({
      R: R_calc,
      Vmax: Vmax_calc,
      Vx: Vx_calc,
      Mmax: Mmax_calc,
      Mx: Mx_calc,
      Dmax: Dmax_calc,
      Dx: Dx_calc
    });

    setIsCalculated(true);
  }, [inputData, isValidInput]);

  return {
    inputData,
    results,
    isCalculated,
    isValidInput: isValidInput(),
    updateInput,
    calculate
  };
} 