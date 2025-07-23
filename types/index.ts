// Tipos para Calculadora de Vigas (existente)
export interface BeamInputData {
  x: string;
  L: string;
  w: string;
  E: string;
  I: string;
}

export interface BeamResults {
  R: string;
  Vmax: string;
  Vx: string;
  Mmax: string;
  Mx: string;
  Dmax: string;
  Dx: string;
}

export interface BeamCalculationParams {
  x: number;
  L: number;
  w: number;
  E: number;
  I: number;
}

// Tipos para Calculadoras de Acero Estructural

// TABLA 1: Cantidades → Área Total
export interface Table1InputData {
  quantities: {
    [key: string]: number; // key será el diámetro, value la cantidad
  };
}

export interface Table1Results {
  totalArea: number; // cm²
}

// TABLA 2: Área Total → Cantidades
export interface Table2InputData {
  targetArea: number; // cm²
}

export interface Table2Results {
  suggestedQuantities: {
    [key: string]: number; // key será el diámetro, value la cantidad sugerida
  };
}

// TABLA 3: Cuantías ↔ Separaciones
export interface Table3InputData {
  selectedBars: {
    [key: string]: boolean; // qué barras están activas
  };
  quantities: {
    [key: string]: number; // cantidad de cada barra activa
  };
  steelRatio?: number; // cm²/m (opcional)
  spacing?: number; // cm (opcional)
}

export interface Table3Results {
  steelRatio?: number; // cm²/m
  spacing?: number; // cm
}

// Tipo combinado para toda la calculadora
export interface SteelCalculatorData {
  table1: Table1InputData;
  table2: Table2InputData;
  table3: Table3InputData;
}

export interface SteelCalculatorResults {
  table1: Table1Results;
  table2: Table2Results;
  table3: Table3Results;
}

// Definición de una barra de acero
export interface RebarSpec {
  diameter: number; // mm
  area: number; // cm²
  label: string;
}

// Tipos para componentes UI
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ToggleSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  children: React.ReactNode;
}

export interface TabProps {
  activeTab: 'table1' | 'table2' | 'table3';
  onTabChange: (tab: 'table1' | 'table2' | 'table3') => void;
}