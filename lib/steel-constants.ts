// Configuración específica para Calculadoras de Acero
export const STEEL_APP_CONFIG = {
  TITLE: 'Calculadoras de Acero Estructural',
  COMPANY: 'CSW Ingeniería Civil',
  DESCRIPTION: 'Calcula áreas, cantidades y cuantías de barras de acero estructural',
  MAX_WIDTH: 'max-w-5xl',
  COPYRIGHT_MESSAGE: 'Desarrollado por cswingenieriacivil.com',
  BRAND_COLORS: {
    PRIMARY: '#f8b133',
    PRIMARY_HOVER: '#e6a030',
    SECONDARY: '#f1d475'
  }
} as const;

// Diámetros estándar de barras de acero en mm
export const STANDARD_REBAR_DIAMETERS = {
  '6': 6,
  '8': 8, 
  '10': 10,
  '12': 12,
  '16': 16,
  '20': 20,
  '25': 25
} as const;

// Labels para cada diámetro
export const REBAR_LABELS = {
  '6': 'Ø6mm',
  '8': 'Ø8mm',
  '10': 'Ø10mm', 
  '12': 'Ø12mm',
  '16': 'Ø16mm',
  '20': 'Ø20mm',
  '25': 'Ø25mm'
} as const;

// Unidades específicas para acero
export const STEEL_DEFAULT_UNITS = {
  DIAMETER: 'mm',
  AREA: 'cm²',
  QUANTITY: 'barras',
  STEEL_RATIO: 'cm²/m',
  SPACING: 'cm'
} as const;

// Límites de validación para acero
export const STEEL_VALIDATION_LIMITS = {
  MIN_VALUE: 0,
  MAX_DECIMAL_PLACES: 2,
  MIN_QUANTITY: 0,
  MAX_QUANTITY: 999,
  MIN_SPACING: 5, // cm
  MAX_SPACING: 100 // cm
} as const;

// Configuración CSV específica para acero
export const STEEL_CSV_CONFIG = {
  FILENAME_PREFIX: 'acero_estructural_',
  HEADERS: {
    TITLE: 'CALCULADORAS DE ACERO ESTRUCTURAL',
    COMPANY: 'CSW Ingeniería Civil',
    INPUT_DATA: 'DATOS DE ENTRADA',
    RESULTS: 'RESULTADOS DEL CÁLCULO',
    NOTE: 'NOTA:'
  }
} as const; 