// Configuración de la aplicación
export const APP_CONFIG = {
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

// Unidades por defecto
export const DEFAULT_UNITS = {
  LENGTH: 'm',
  FORCE: 'kN',
  DISTRIBUTED_LOAD: 'kN/m',
  MOMENT: 'kNm',
  ELASTIC_MODULUS: 'MPa',
  MOMENT_INERTIA: 'mm⁴',
  DEFLECTION: 'mm'
} as const;

// Límites de validación
export const VALIDATION_LIMITS = {
  MIN_VALUE: 0.001,
  MAX_DECIMAL_PLACES: 3
} as const;

// Enlaces externos
export const EXTERNAL_LINKS = {
  WEBSITE: 'https://www.cswingenieriacivil.com',
  CONTACT: 'https://www.cswingenieriacivil.com/contacto',
  LINKEDIN: 'https://www.linkedin.com/company/cswingenieriacivil/',
  INSTAGRAM: 'https://www.instagram.com/csw_ingenieriacivil/'
} as const;

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  BEAM_CALCULATOR: '/beam-calculator',
  FLEXION: '/flexion'
} as const;

// Configuración CSV export
export const CSV_CONFIG = {
  FILENAME_PREFIX: 'viga_calculo_',
  HEADERS: {
    TITLE: 'CALCULADORA DE VIGA SIMPLEMENTE APOYADA CON CARGA UNIFORME',
    COMPANY: 'CSW Ingeniería Civil',
    INPUT_DATA: 'DATOS DE ENTRADA',
    RESULTS: 'RESULTADOS DEL CÁLCULO',
    NOTE: 'NOTA:'
  }
} as const; 