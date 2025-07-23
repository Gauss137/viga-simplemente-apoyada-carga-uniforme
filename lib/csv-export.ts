import { BeamInputData, BeamResults } from '@/types';
import { BEAM_CSV_CONFIG as CSV_CONFIG, BEAM_DEFAULT_UNITS as DEFAULT_UNITS } from './beam-constants';

export function generateCSVContent(inputData: BeamInputData, results: BeamResults): string {
  const fecha = new Date().toLocaleDateString('es-ES');
  const hora = new Date().toLocaleTimeString('es-ES');
  
  return [
    CSV_CONFIG.HEADERS.TITLE,
    CSV_CONFIG.HEADERS.COMPANY,
    `Fecha: ${fecha}`,
    `Hora: ${hora}`,
    "",
    CSV_CONFIG.HEADERS.INPUT_DATA,
    "Parámetro,Valor,Unidad",
    `Longitud de la viga (L),${inputData.L},${DEFAULT_UNITS.LENGTH}`,
    `Carga uniforme (w),${inputData.w},${DEFAULT_UNITS.DISTRIBUTED_LOAD}`,
    `Módulo de elasticidad (E),${inputData.E},${DEFAULT_UNITS.ELASTIC_MODULUS}`,
    `Momento de inercia (I),${inputData.I},${DEFAULT_UNITS.MOMENT_INERTIA}`,
    `Sección analizada (x),${inputData.x},${DEFAULT_UNITS.LENGTH}`,
    "",
    CSV_CONFIG.HEADERS.RESULTS,
    "Concepto,Valor,Unidad",
    `Reacción en apoyos (R),${results.R},${DEFAULT_UNITS.FORCE}`,
    `Cortante máximo (Vmax),${results.Vmax},${DEFAULT_UNITS.FORCE}`,
    `Cortante en x (Vx),${results.Vx},${DEFAULT_UNITS.FORCE}`,
    `Momento máximo (Mmax),${results.Mmax},${DEFAULT_UNITS.MOMENT}`,
    `Momento en x (Mx),${results.Mx},${DEFAULT_UNITS.MOMENT}`,
    `Flecha máxima (Δmax),${results.Dmax},${DEFAULT_UNITS.DEFLECTION}`,
    `Flecha en x (Δx),${results.Dx},${DEFAULT_UNITS.DEFLECTION}`,
    "",
    CSV_CONFIG.HEADERS.NOTE,
    "Los resultados fueron calculados considerando una viga simplemente apoyada",
    "con carga uniforme distribuida. Verificar la aplicabilidad según las",
    "condiciones reales del proyecto."
  ].join('\n');
}

export function downloadCSV(inputData: BeamInputData, results: BeamResults): void {
  const csvContent = generateCSVContent(inputData, results);
  const fecha = new Date().toLocaleDateString('es-ES').replace(/\//g, '-');
  const filename = `${CSV_CONFIG.FILENAME_PREFIX}${fecha}.csv`;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
} 