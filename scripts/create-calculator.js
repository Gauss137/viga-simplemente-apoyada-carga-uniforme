#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuraciones predefinidas por tipo de calculadora
const CALCULATOR_TEMPLATES = {
  column: {
    title: 'Calculadora de Columnas de Hormigón',
    description: 'Calcula la capacidad de columnas de hormigón armado',
    route: 'column-calculator',
    inputs: {
      fc: { label: 'Resistencia del hormigón (fc)', unit: 'MPa', type: 'number' },
      fy: { label: 'Resistencia del acero (fy)', unit: 'MPa', type: 'number' },
      b: { label: 'Ancho de la columna (b)', unit: 'cm', type: 'number' },
      h: { label: 'Alto de la columna (h)', unit: 'cm', type: 'number' },
      P: { label: 'Carga axial (P)', unit: 'kN', type: 'number' },
      M: { label: 'Momento flector (M)', unit: 'kNm', type: 'number' }
    },
    outputs: {
      AsReq: { label: 'Acero requerido', unit: 'cm²' },
      AsMin: { label: 'Acero mínimo', unit: 'cm²' },
      Pn: { label: 'Capacidad nominal', unit: 'kN' },
      Status: { label: 'Verificación', unit: '-' }
    }
  },
  
  slab: {
    title: 'Calculadora de Losas de Hormigón',
    description: 'Calcula armaduras y verificaciones de losas',
    route: 'slab-calculator',
    inputs: {
      Lx: { label: 'Luz en X (Lx)', unit: 'm', type: 'number' },
      Ly: { label: 'Luz en Y (Ly)', unit: 'm', type: 'number' },
      q: { label: 'Carga distribuida (q)', unit: 'kN/m²', type: 'number' },
      fc: { label: 'Resistencia del hormigón (fc)', unit: 'MPa', type: 'number' },
      fy: { label: 'Resistencia del acero (fy)', unit: 'MPa', type: 'number' },
      h: { label: 'Espesor de losa (h)', unit: 'cm', type: 'number' }
    },
    outputs: {
      Mx: { label: 'Momento en X', unit: 'kNm/m' },
      My: { label: 'Momento en Y', unit: 'kNm/m' },
      AsFx: { label: 'Armadura flexión X', unit: 'cm²/m' },
      AsFy: { label: 'Armadura flexión Y', unit: 'cm²/m' }
    }
  },

  foundation: {
    title: 'Calculadora de Cimentaciones',
    description: 'Dimensiona zapatas y verifica capacidad portante',
    route: 'foundation-calculator',
    inputs: {
      P: { label: 'Carga vertical (P)', unit: 'kN', type: 'number' },
      M: { label: 'Momento (M)', unit: 'kNm', type: 'number' },
      qa: { label: 'Capacidad portante (qa)', unit: 'kN/m²', type: 'number' },
      gamma: { label: 'Peso específico suelo', unit: 'kN/m³', type: 'number' },
      Df: { label: 'Profundidad desplante', unit: 'm', type: 'number' }
    },
    outputs: {
      B: { label: 'Ancho de zapata', unit: 'm' },
      L: { label: 'Largo de zapata', unit: 'm' },
      sigma: { label: 'Presión en suelo', unit: 'kN/m²' },
      FS: { label: 'Factor de seguridad', unit: '-' }
    }
  }
};

function generateConstants(config) {
  return `// Configuración de ${config.title}
export const APP_CONFIG = {
  TITLE: '${config.title}',
  COMPANY: 'CSW Ingeniería Civil',
  DESCRIPTION: '${config.description}',
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
${Object.entries(config.inputs).map(([key, field]) => 
  `  ${key.toUpperCase()}: '${field.unit}'`
).join(',\n')}
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
  CALCULATOR: '/${config.route}',
} as const;

// Configuración CSV export
export const CSV_CONFIG = {
  FILENAME_PREFIX: '${config.route.replace('-', '_')}_',
  HEADERS: {
    TITLE: '${config.title.toUpperCase()}',
    COMPANY: 'CSW Ingeniería Civil',
    INPUT_DATA: 'DATOS DE ENTRADA',
    RESULTS: 'RESULTADOS DEL CÁLCULO',
    NOTE: 'NOTA:'
  }
} as const;`;
}

function generateTypes(config) {
  const inputFields = Object.keys(config.inputs).map(key => `  ${key}: string;`).join('\n');
  const outputFields = Object.keys(config.outputs).map(key => `  ${key}: string;`).join('\n');
  
  return `// Tipos para ${config.title}
export interface CalculatorInputData {
${inputFields}
}

export interface CalculatorResults {
${outputFields}
}

export interface CalculationParams {
${Object.keys(config.inputs).map(key => `  ${key}: number;`).join('\n')}
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
}`;
}

function createCalculatorFromTemplate(calculatorType, outputDir = '.') {
  const config = CALCULATOR_TEMPLATES[calculatorType];
  
  if (!config) {
    console.error(`❌ Tipo de calculadora '${calculatorType}' no soportado.`);
    console.log('✅ Tipos disponibles:', Object.keys(CALCULATOR_TEMPLATES).join(', '));
    return;
  }

  console.log(`🚀 Creando ${config.title}...`);
  
  // Crear estructura básica
  const dirs = ['lib', 'types', 'hooks', 'components', 'app'];
  dirs.forEach(dir => {
    const dirPath = path.join(outputDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  // Generar archivos
  const constants = generateConstants(config);
  const types = generateTypes(config);
  
  fs.writeFileSync(path.join(outputDir, 'lib/constants.ts'), constants);
  fs.writeFileSync(path.join(outputDir, 'types/index.ts'), types);
  
  console.log('✅ Archivos generados:');
  console.log('  📄 lib/constants.ts');
  console.log('  📄 types/index.ts');
  console.log('');
  console.log('🎯 Próximos pasos:');
  console.log('  1. Implementar lógica de cálculo en hooks/');
  console.log('  2. Crear componente principal en components/');
  console.log('  3. Configurar rutas en app/');
  console.log('  4. Personalizar estilos según necesidad');
}

// CLI
const args = process.argv.slice(2);
const calculatorType = args[0];

if (!calculatorType) {
  console.log('📖 Uso: node create-calculator.js <tipo>');
  console.log('');
  console.log('🎯 Tipos disponibles:');
  Object.entries(CALCULATOR_TEMPLATES).forEach(([key, config]) => {
    console.log(`  ${key.padEnd(12)} - ${config.title}`);
  });
} else {
  createCalculatorFromTemplate(calculatorType);
}

module.exports = { createCalculatorFromTemplate, CALCULATOR_TEMPLATES }; 