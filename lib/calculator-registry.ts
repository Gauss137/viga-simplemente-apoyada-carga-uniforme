// 🏗️ Registro Central de Calculadoras de Ingeniería Estructural
// Sistema centralizado para 97 calculadoras especializadas

export type CalculatorStatus = 'implemented' | 'in_progress' | 'planned';
export type LoadType = 'udl' | 'point' | 'variable' | 'moment' | 'combined';
export type StructureType = 'vigas' | 'porticos' | 'losas';

export interface Calculator {
  id: string;
  title: string;
  description: string;
  route: string;
  status: CalculatorStatus;
  loadType: LoadType[];
  formulas: string[];
  diagram?: string;
  component?: () => Promise<any>;
}

export interface CalculatorCategory {
  title: string;
  description: string;
  count: number;
  calculators: Calculator[];
}

// 🏗️ VIGAS ESTRUCTURALES (43 calculadoras)
export const VIGAS_CATEGORIES: Record<string, CalculatorCategory> = {
  SIMPLY_SUPPORTED: {
    title: "Simplemente Apoyadas",
    description: "Vigas con apoyos articulados en ambos extremos",
    count: 13,
    calculators: [
      {
        id: "ss-udl",
        title: "Carga Uniformemente Distribuida",
        description: "Análisis de viga simplemente apoyada con carga uniforme",
        route: "/calculadoras/vigas/simplemente-apoyadas/carga-uniforme",
        status: "implemented",
        loadType: ["udl"],
        formulas: ["R = wL/2", "Mmax = wL²/8", "δmax = 5wL⁴/(384EI)"]
      },
      {
        id: "ss-uil-end",
        title: "Carga Uniformemente Creciente hacia un Extremo",
        description: "Carga triangular con máximo en un extremo",
        route: "/calculadoras/vigas/simplemente-apoyadas/carga-creciente-extremo",
        status: "planned",
        loadType: ["variable"],
        formulas: []
      },
      {
        id: "ss-uil-center",
        title: "Carga Uniformemente Creciente hacia el Centro",
        description: "Carga triangular con máximo en el centro",
        route: "/calculadoras/vigas/simplemente-apoyadas/carga-creciente-centro",
        status: "planned",
        loadType: ["variable"],
        formulas: []
      },
      // ... resto de simplemente apoyadas
    ]
  },
  FIXED_PINNED: {
    title: "Empotrada-Articulada",
    description: "Un extremo empotrado, otro articulado",
    count: 3,
    calculators: []
  },
  FIXED_FIXED: {
    title: "Empotrada en Ambos Extremos",
    description: "Ambos extremos empotrados",
    count: 3,
    calculators: []
  },
  CANTILEVER: {
    title: "Vigas en Voladizo",
    description: "Un extremo empotrado, otro libre",
    count: 6,
    calculators: []
  },
  WITH_OVERHANGS: {
    title: "Vigas con Voladizos",
    description: "Viga continua con extensiones en voladizo",
    count: 6,
    calculators: []
  },
  CONTINUOUS_2SPAN: {
    title: "Vigas Continuas - 2 Tramos",
    description: "Viga continua sobre tres apoyos",
    count: 7,
    calculators: []
  }
};

// 🏗️ PÓRTICOS ESTRUCTURALES (33 calculadoras)
export const PORTICOS_CATEGORIES: Record<string, CalculatorCategory> = {
  THREE_BAR_PIN_ROLLER: {
    title: "3 Barras - Articulado/Rodillo",
    description: "Pórtico de tres barras con apoyo articulado y rodillo",
    count: 8,
    calculators: [
      {
        id: "3b-pr-point-center",
        title: "Carga Puntual Central",
        description: "Pórtico con carga puntual en el centro del dintel",
        route: "/calculadoras/porticos/tres-barras-pin-roller/carga-puntual-central",
        status: "planned",
        loadType: ["point"],
        formulas: []
      },
      {
        id: "3b-pr-point-corner-top",
        title: "Carga Puntual en Esquina Superior",
        description: "Carga puntual aplicada en la esquina superior",
        route: "/calculadoras/porticos/tres-barras-pin-roller/carga-puntual-esquina-superior",
        status: "planned",
        loadType: ["point"],
        formulas: []
      },
      // ... resto de calculadoras
    ]
  },
  THREE_BAR_PIN_PIN: {
    title: "3 Barras - Articulado/Articulado",
    description: "Pórtico de tres barras con ambos apoyos articulados",
    count: 5,
    calculators: []
  },
  THREE_BAR_FIXED_FIXED: {
    title: "3 Barras - Empotrado/Empotrado",
    description: "Pórtico de tres barras con ambos apoyos empotrados",
    count: 3,
    calculators: []
  },
  THREE_BAR_FIXED_FREE: {
    title: "3 Barras - Empotrado/Libre",
    description: "Pórtico en voladizo con un extremo empotrado",
    count: 5,
    calculators: []
  },
  TWO_BAR_PIN_PIN: {
    title: "2 Barras - Articulado/Articulado",
    description: "Pórtico simple de dos barras articuladas",
    count: 2,
    calculators: []
  },
  TWO_BAR_FIXED_FIXED: {
    title: "2 Barras - Empotrado/Empotrado",
    description: "Pórtico simple de dos barras empotradas",
    count: 2,
    calculators: []
  },
  TWO_BAR_FIXED_PIN: {
    title: "2 Barras - Empotrado/Articulado",
    description: "Pórtico simple con un apoyo empotrado y otro articulado",
    count: 4,
    calculators: []
  },
  TWO_BAR_FIXED_FREE: {
    title: "2 Barras - Empotrado/Libre",
    description: "Pórtico simple en voladizo",
    count: 4,
    calculators: []
  }
};

// 🧱 LOSAS RECTANGULARES (21 calculadoras)
export const LOSAS_CATEGORIES: Record<string, CalculatorCategory> = {
  CUD_SLABS: {
    title: "Carga Uniformemente Distribuida",
    description: "Losas rectangulares con carga uniforme",
    count: 14,
    calculators: [
      {
        id: "slab-aaaa-cud",
        title: "AAAA - Apoyada en Cuatro Bordes",
        description: "Losa simplemente apoyada en sus cuatro bordes",
        route: "/calculadoras/losas/carga-uniforme/aaaa-apoyada-cuatro-bordes",
        status: "planned",
        loadType: ["udl"],
        formulas: []
      },
      {
        id: "slab-aaae-cud",
        title: "AAAE - Tres Bordes Apoyados, Uno Empotrado",
        description: "Tres bordes apoyados y un borde empotrado",
        route: "/calculadoras/losas/carga-uniforme/aaae-tres-apoyados-uno-empotrado",
        status: "planned",
        loadType: ["udl"],
        formulas: []
      },
      // ... resto de losas CUD
    ]
  },
  CDV_SLABS: {
    title: "Carga Distribuida Variable",
    description: "Losas rectangulares con carga variable",
    count: 5,
    calculators: []
  },
  CP_SLABS: {
    title: "Carga Puntual",
    description: "Losas rectangulares con cargas puntuales",
    count: 2,
    calculators: []
  }
};

// 🔩 ACERO DE REFUERZO (8 calculadoras) - Ya existente
export const ACERO_CATEGORIES: Record<string, CalculatorCategory> = {
  BASIC_STEEL: {
    title: "Cálculos Básicos",
    description: "Calculadoras fundamentales de acero de refuerzo",
    count: 8,
    calculators: [
      {
        id: "steel-bars",
        title: "Calculadora de Barras de Acero",
        description: "Cálculo de áreas, cantidades y cuantías de barras",
        route: "/calculadoras/acero/barras-acero",
        status: "implemented",
        loadType: [],
        formulas: ["A = π × (d/2)²", "ρ = As / (b × d)"]
      }
    ]
  }
};

// 🎯 REGISTRO PRINCIPAL
export const CALCULATOR_REGISTRY = {
  vigas: VIGAS_CATEGORIES,
  porticos: PORTICOS_CATEGORIES,
  losas: LOSAS_CATEGORIES,
  acero: ACERO_CATEGORIES
};

// 📊 ESTADÍSTICAS GLOBALES
export const CALCULATOR_STATS = {
  total: 97,
  implemented: 2,
  in_progress: 0,
  planned: 95,
  by_type: {
    vigas: 43,
    porticos: 33,
    losas: 21,
    acero: 8
  }
};

// 🔍 UTILIDADES DE BÚSQUEDA
export function findCalculatorById(id: string): Calculator | undefined {
  for (const structureType of Object.values(CALCULATOR_REGISTRY)) {
    for (const category of Object.values(structureType)) {
      const calculator = category.calculators.find(calc => calc.id === id);
      if (calculator) return calculator;
    }
  }
  return undefined;
}

export function getCalculatorsByStatus(status: CalculatorStatus): Calculator[] {
  const result: Calculator[] = [];
  for (const structureType of Object.values(CALCULATOR_REGISTRY)) {
    for (const category of Object.values(structureType)) {
      result.push(...category.calculators.filter(calc => calc.status === status));
    }
  }
  return result;
}

export function getCalculatorsByType(type: StructureType): CalculatorCategory[] {
  return Object.values(CALCULATOR_REGISTRY[type]);
} 