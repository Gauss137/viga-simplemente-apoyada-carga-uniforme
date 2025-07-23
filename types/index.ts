// Tipos para la calculadora de viga
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