// Configuración específica para Calculadora de Vigas
export const BEAM_APP_CONFIG = {
  TITLE: 'Calculadora de Viga Simplemente Apoyada con Carga Uniforme',
  COMPANY: 'CSW Ingeniería Civil',
  DESCRIPTION: 'Ingresa los datos de la viga para calcular reacciones, cortantes, momentos y flechas.',
  MAX_WIDTH: 'max-w-3xl',
  COPYRIGHT_MESSAGE: 'Desarrollado por cswingenieriacivil.com',
  BRAND_COLORS: {
    PRIMARY: '#f8b133',
    PRIMARY_HOVER: '#e6a030',
    SECONDARY: '#f1d475'
  }
} as const;

// Unidades específicas para vigas
export const BEAM_DEFAULT_UNITS = {
  LENGTH: 'm',
  DISTRIBUTED_LOAD: 'kN/m',
  ELASTIC_MODULUS: 'MPa',
  MOMENT_INERTIA: 'mm⁴',
  FORCE: 'kN',
  MOMENT: 'kNm',
  DEFLECTION: 'mm'
} as const;

// Límites de validación para vigas
export const BEAM_VALIDATION_LIMITS = {
  MIN_VALUE: 0.001,
  MAX_DECIMAL_PLACES: 3
} as const;

// Configuración CSV específica para vigas
export const BEAM_CSV_CONFIG = {
  FILENAME_PREFIX: 'viga_simplemente_apoyada_',
  HEADERS: {
    TITLE: 'CALCULADORA DE VIGA SIMPLEMENTE APOYADA CON CARGA UNIFORME',
    COMPANY: 'CSW Ingeniería Civil',
    INPUT_DATA: 'DATOS DE ENTRADA',
    RESULTS: 'RESULTADOS DEL CÁLCULO',
    NOTE: 'NOTA:'
  }
} as const; 