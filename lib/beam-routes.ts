// Catálogo completo de calculadoras de vigas estructurales
export const BEAM_CATEGORIES = {
  SIMPLY_SUPPORTED: {
    title: "Vigas Simplemente Apoyadas",
    count: 13,
    calculators: [
      {
        id: "ss-udl",
        title: "Carga uniformemente distribuida (UDL)",
        route: "/vigas/simplemente-apoyadas/carga-uniforme",
        implemented: true
      },
      {
        id: "ss-uil-end",
        title: "Carga uniformemente creciente hacia un extremo",
        route: "/vigas/simplemente-apoyadas/carga-creciente-extremo",
        implemented: false
      },
      {
        id: "ss-uil-center",
        title: "Carga uniformemente creciente hacia el centro",
        route: "/vigas/simplemente-apoyadas/carga-creciente-centro",
        implemented: false
      },
      {
        id: "ss-pdl",
        title: "Carga parcialmente distribuida",
        route: "/vigas/simplemente-apoyadas/carga-parcial",
        implemented: false
      },
      {
        id: "ss-pdl-end",
        title: "Carga parcialmente distribuida en un extremo",
        route: "/vigas/simplemente-apoyadas/carga-parcial-extremo",
        implemented: false
      },
      {
        id: "ss-pdl-both",
        title: "Carga parcialmente distribuida en ambos extremos",
        route: "/vigas/simplemente-apoyadas/carga-parcial-ambos",
        implemented: false
      },
      {
        id: "ss-point-center",
        title: "Carga puntual en el centro",
        route: "/vigas/simplemente-apoyadas/carga-puntual-centro",
        implemented: false
      },
      {
        id: "ss-point-any",
        title: "Carga puntual en cualquier punto",
        route: "/vigas/simplemente-apoyadas/carga-puntual-cualquier",
        implemented: false
      },
      {
        id: "ss-two-equal",
        title: "Dos cargas puntuales equidistantes",
        route: "/vigas/simplemente-apoyadas/dos-cargas-equidistantes",
        implemented: false
      },
      {
        id: "ss-two-unequal",
        title: "Dos cargas puntuales desiguales",
        route: "/vigas/simplemente-apoyadas/dos-cargas-desiguales",
        implemented: false
      },
      {
        id: "ss-two-equal-noneq",
        title: "Dos cargas puntuales iguales, no equidistantes",
        route: "/vigas/simplemente-apoyadas/dos-cargas-iguales-no-equi",
        implemented: false
      },
      {
        id: "ss-udl-moments",
        title: "Carga uniforme y momentos en extremos",
        route: "/vigas/simplemente-apoyadas/carga-uniforme-momentos",
        implemented: false
      },
      {
        id: "ss-point-moments",
        title: "Carga puntual central y momentos en extremos",
        route: "/vigas/simplemente-apoyadas/carga-puntual-momentos",
        implemented: false
      }
    ]
  },
  
  FIXED_PINNED: {
    title: "Empotrada-Articulada",
    count: 3,
    calculators: [
      {
        id: "fp-udl",
        title: "Carga uniformemente distribuida",
        route: "/vigas/empotrada-articulada/carga-uniforme",
        implemented: false
      },
      {
        id: "fp-point-center",
        title: "Carga puntual central",
        route: "/vigas/empotrada-articulada/carga-puntual-centro",
        implemented: false
      },
      {
        id: "fp-point-any",
        title: "Carga puntual en cualquier punto",
        route: "/vigas/empotrada-articulada/carga-puntual-cualquier",
        implemented: false
      }
    ]
  },
  
  FIXED_BOTH: {
    title: "Empotrada en Ambos Extremos",
    count: 3,
    calculators: [
      {
        id: "ff-udl",
        title: "Carga uniformemente distribuida",
        route: "/vigas/empotrada-ambos/carga-uniforme",
        implemented: false
      },
      {
        id: "ff-point-center",
        title: "Carga puntual central",
        route: "/vigas/empotrada-ambos/carga-puntual-centro",
        implemented: false
      },
      {
        id: "ff-point-any",
        title: "Carga puntual en cualquier punto",
        route: "/vigas/empotrada-ambos/carga-puntual-cualquier",
        implemented: false
      }
    ]
  },
  
  CANTILEVER: {
    title: "Vigas en Voladizo",
    count: 6,
    calculators: [
      {
        id: "cant-uil",
        title: "Carga uniformemente creciente",
        route: "/vigas/voladizo/carga-creciente",
        implemented: false
      },
      {
        id: "cant-udl",
        title: "Carga uniformemente distribuida",
        route: "/vigas/voladizo/carga-uniforme",
        implemented: false
      },
      {
        id: "cant-udl-moment",
        title: "Carga uniforme y momento en extremo libre",
        route: "/vigas/voladizo/carga-uniforme-momento",
        implemented: false
      },
      {
        id: "cant-point-any",
        title: "Carga puntual en cualquier punto",
        route: "/vigas/voladizo/carga-puntual-cualquier",
        implemented: false
      },
      {
        id: "cant-point-end",
        title: "Carga puntual en extremo libre",
        route: "/vigas/voladizo/carga-puntual-extremo",
        implemented: false
      },
      {
        id: "cant-point-moment",
        title: "Carga puntual y momento en extremo libre",
        route: "/vigas/voladizo/carga-puntual-momento",
        implemented: false
      }
    ]
  },
  
  OVERHANG: {
    title: "Vigas con Voladizos",
    count: 6,
    calculators: [
      {
        id: "over-udl-all",
        title: "Carga uniforme en toda la viga",
        route: "/vigas/voladizos/carga-uniforme-total",
        implemented: false
      },
      {
        id: "over-udl-overhang",
        title: "Carga uniforme solo en voladizo",
        route: "/vigas/voladizos/carga-uniforme-voladizo",
        implemented: false
      },
      {
        id: "over-point-end",
        title: "Carga puntual en extremo de voladizo",
        route: "/vigas/voladizos/carga-puntual-extremo",
        implemented: false
      },
      {
        id: "over-udl-span",
        title: "Carga uniforme solo entre apoyos",
        route: "/vigas/voladizos/carga-uniforme-tramo",
        implemented: false
      },
      {
        id: "over-point-span",
        title: "Carga puntual entre apoyos",
        route: "/vigas/voladizos/carga-puntual-tramo",
        implemented: false
      },
      {
        id: "over-both-udl",
        title: "Voladizo en ambos extremos con carga uniforme",
        route: "/vigas/voladizos/ambos-extremos-uniforme",
        implemented: false
      }
    ]
  },
  
  CONTINUOUS_2: {
    title: "Vigas Continuas - 2 Tramos",
    count: 7,
    calculators: [
      {
        id: "cont2-udl-one",
        title: "Carga uniforme en un solo tramo",
        route: "/vigas/continuas-2/carga-uniforme-un-tramo",
        implemented: false
      },
      {
        id: "cont2-point-one",
        title: "Carga puntual central en un solo tramo",
        route: "/vigas/continuas-2/carga-puntual-un-tramo",
        implemented: false
      },
      {
        id: "cont2-point-any-one",
        title: "Carga puntual en cualquier punto de un tramo",
        route: "/vigas/continuas-2/carga-puntual-cualquier-un-tramo",
        implemented: false
      },
      {
        id: "cont2-equal-udl",
        title: "Tramos iguales con carga uniforme",
        route: "/vigas/continuas-2/tramos-iguales-uniforme",
        implemented: false
      },
      {
        id: "cont2-equal-points",
        title: "Tramos iguales con cargas puntuales centradas",
        route: "/vigas/continuas-2/tramos-iguales-puntuales",
        implemented: false
      },
      {
        id: "cont2-unequal-udl",
        title: "Tramos desiguales con carga uniforme",
        route: "/vigas/continuas-2/tramos-desiguales-uniforme",
        implemented: false
      },
      {
        id: "cont2-unequal-points",
        title: "Tramos desiguales con cargas puntuales",
        route: "/vigas/continuas-2/tramos-desiguales-puntuales",
        implemented: false
      }
    ]
  },
  
  CONTINUOUS_3: {
    title: "Vigas Continuas - 3 Tramos",
    count: 3,
    calculators: [
      {
        id: "cont3-two-spans",
        title: "Carga uniforme en dos tramos",
        route: "/vigas/continuas-3/dos-tramos-uniforme",
        implemented: false
      },
      {
        id: "cont3-end-spans",
        title: "Carga uniforme en tramos extremos",
        route: "/vigas/continuas-3/extremos-uniforme",
        implemented: false
      },
      {
        id: "cont3-all-spans",
        title: "Carga uniforme en toda la viga",
        route: "/vigas/continuas-3/toda-viga-uniforme",
        implemented: false
      }
    ]
  },
  
  CONTINUOUS_4: {
    title: "Vigas Continuas - 4 Tramos",
    count: 3,
    calculators: [
      {
        id: "cont4-one-empty",
        title: "Un tramo sin carga",
        route: "/vigas/continuas-4/un-tramo-sin-carga",
        implemented: false
      },
      {
        id: "cont4-two-empty",
        title: "Dos tramos sin carga",
        route: "/vigas/continuas-4/dos-tramos-sin-carga",
        implemented: false
      },
      {
        id: "cont4-all-loaded",
        title: "Carga uniforme en todos los tramos",
        route: "/vigas/continuas-4/todos-tramos-uniforme",
        implemented: false
      }
    ]
  }
};

// Tipo para una calculadora individual
export type BeamCalculator = {
  id: string;
  title: string;
  route: string;
  implemented: boolean;
};

// Generar rutas planas para fácil acceso
export const ALL_BEAM_CALCULATORS: BeamCalculator[] = Object.values(BEAM_CATEGORIES)
  .flatMap(category => category.calculators);

// Contador total
export const TOTAL_BEAM_CALCULATORS = ALL_BEAM_CALCULATORS.length;

// Calculadoras implementadas
export const IMPLEMENTED_CALCULATORS = ALL_BEAM_CALCULATORS
  .filter((calc: BeamCalculator) => calc.implemented);

// Calculadoras por implementar
export const PENDING_CALCULATORS = ALL_BEAM_CALCULATORS
  .filter((calc: BeamCalculator) => !calc.implemented); 