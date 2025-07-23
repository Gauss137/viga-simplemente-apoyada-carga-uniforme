# 🏗️ Arquitectura Mejorada - Calculadoras de Ingeniería

## 📁 Estructura de Directorios Propuesta

```
viga-calculadoras-ingenieria/
├── README.md                          # Documentación principal
├── CONTRIBUTING.md                     # Guía para contribuidores
├── docs/                              # Documentación técnica
│   ├── architecture.md
│   ├── calculators/                   # Docs por calculadora
│   │   ├── vigas/
│   │   └── acero/
│   └── deployment.md
│
├── app/                               # Next.js 15 App Router
│   ├── layout.tsx                     # Layout principal
│   ├── page.tsx                       # Homepage
│   ├── not-found.tsx                  # 404 page
│   │
│   ├── calculadoras/                  # Todas las calculadoras
│   │   ├── vigas/
│   │   │   ├── simplemente-apoyadas/
│   │   │   │   ├── carga-uniforme/
│   │   │   │   │   ├── page.tsx       # Calculadora específica
│   │   │   │   │   └── components/    # Componentes específicos
│   │   │   │   ├── carga-puntual/
│   │   │   │   ├── cargas-multiples/
│   │   │   │   └── layout.tsx         # Layout compartido
│   │   │   │
│   │   │   ├── empotradas/
│   │   │   │   ├── carga-uniforme/
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── voladizo/
│   │   │   └── layout.tsx             # Layout para todas las vigas
│   │   │
│   │   ├── acero/
│   │   │   ├── page.tsx               # Calculadora actual
│   │   │   └── components/
│   │   │
│   │   └── layout.tsx                 # Layout para calculadoras
│   │
│   └── api/                           # API routes si necesario
│       ├── export/
│       └── validate/
│
├── components/                        # Componentes reutilizables
│   ├── ui/                           # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   ├── layout/                       # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation/
│   │   │   ├── BeamDropdown.tsx
│   │   │   └── MobileMenu.tsx
│   │   └── SEO/
│   │
│   ├── calculators/                  # Calculadora components
│   │   ├── shared/                   # Shared entre todas
│   │   │   ├── CalculatorLayout.tsx
│   │   │   ├── FormulaDisplay.tsx
│   │   │   ├── ResultsPanel.tsx
│   │   │   ├── DiagramDisplay.tsx
│   │   │   └── ExportButton.tsx
│   │   │
│   │   ├── vigas/                    # Specific to vigas
│   │   │   ├── shared/               # Shared entre vigas
│   │   │   │   ├── BeamDiagram.tsx
│   │   │   │   ├── LoadInput.tsx
│   │   │   │   └── BeamProperties.tsx
│   │   │   │
│   │   │   ├── SimplySupported/      # Simplemente apoyadas
│   │   │   │   ├── UniformLoadCalculator.tsx
│   │   │   │   ├── PointLoadCalculator.tsx
│   │   │   │   ├── MultipleLoadsCalculator.tsx
│   │   │   │   └── shared/
│   │   │   │
│   │   │   ├── FixedEnds/            # Empotradas
│   │   │   ├── Cantilever/           # Voladizo
│   │   │   └── Continuous/           # Continuas
│   │   │
│   │   └── acero/                    # Steel calculators
│   │       ├── SteelCalculator.tsx
│   │       └── shared/
│   │
│   └── forms/                        # Form components
│       ├── CalculatorForm.tsx
│       ├── ValidationMessages.tsx
│       └── InputGroups/
│
├── lib/                              # Utilities y lógica
│   ├── calculators/                  # Calculation logic
│   │   ├── vigas/
│   │   │   ├── simply-supported/
│   │   │   │   ├── uniform-load.ts
│   │   │   │   ├── point-load.ts
│   │   │   │   └── shared.ts
│   │   │   ├── fixed-ends/
│   │   │   ├── cantilever/
│   │   │   └── shared/
│   │   │       ├── beam-formulas.ts
│   │   │       ├── validation.ts
│   │   │       └── constants.ts
│   │   │
│   │   └── acero/
│   │       ├── steel-calculations.ts
│   │       ├── constants.ts
│   │       └── validation.ts
│   │
│   ├── utils/                        # General utilities
│   │   ├── cn.ts                     # className utility
│   │   ├── validation.ts             # General validation
│   │   ├── formatting.ts             # Number formatting
│   │   └── export.ts                 # CSV/PDF export
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useCalculator.ts
│   │   ├── useFormValidation.ts
│   │   └── useLocalStorage.ts
│   │
│   └── constants/                    # Global constants
│       ├── routes.ts
│       ├── calculator-registry.ts
│       └── app-config.ts
│
├── types/                            # TypeScript definitions
│   ├── calculators/
│   │   ├── vigas.ts
│   │   ├── acero.ts
│   │   └── shared.ts
│   ├── common/
│   │   ├── api.ts
│   │   └── ui.ts
│   └── index.ts
│
├── public/                           # Static assets
│   ├── docs/                         # PDF manuals, guides
│   ├── images/
│   │   ├── diagrams/
│   │   │   ├── vigas/
│   │   │   └── acero/
│   │   └── logos/
│   └── favicon.ico
│
├── scripts/                          # Build/dev scripts
│   ├── generate-calculator.js        # CLI para nueva calculadora
│   ├── validate-routes.js
│   └── build-docs.js
│
├── tests/                            # Tests
│   ├── calculators/
│   ├── components/
│   └── utils/
│
├── .github/                          # GitHub workflows
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy.yml
│   │   └── test.yml
│   └── ISSUE_TEMPLATE/
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── vercel.json
```

## 🎯 Beneficios de Esta Estructura

### 📦 **Modularidad**
- Cada calculadora tiene su propio directorio
- Shared components evitan duplicación
- Easy to find y maintain code

### 🔧 **Escalabilidad** 
- Add new calculators siguiendo el pattern
- Shared logic en `/lib/calculators/`
- Component reuse maximizado

### 🧪 **Testabilidad**
- Tests organizados por feature
- Easy to test individual calculators
- Shared test utilities

### 📚 **Documentación**
- README por cada calculadora
- Architecture docs centralizados
- API documentation auto-generada

### 🚀 **Development Experience**
- CLI para generar nueva calculadora
- Hot reload por calculadora específica
- TypeScript support completo

## 🛠️ Generador de Calculadoras

```bash
npm run generate:calculator vigas empotradas carga-uniforme
# Crea toda la estructura necesaria automáticamente
```

## 📊 Calculator Registry

Sistema centralizado para registrar y descobrir calculadoras:

```typescript
// lib/constants/calculator-registry.ts
export const CALCULATOR_REGISTRY = {
  vigas: {
    'simplemente-apoyadas': {
      'carga-uniforme': {
        implemented: true,
        component: () => import('@/components/calculators/vigas/SimplySupported/UniformLoadCalculator'),
        route: '/calculadoras/vigas/simplemente-apoyadas/carga-uniforme',
        title: 'Carga Uniformemente Distribuida',
        description: '...',
        formulas: ['...'],
        diagram: '/images/diagrams/vigas/ss-udl.svg'
      }
    }
  }
}
```

## 🎯 Próximos Pasos

1. **🔄 Refactor Current Code** siguiendo esta estructura
2. **📝 Create Generator Script** para nuevas calculadoras  
3. **🧪 Add Testing Setup** con Jest/Vitest
4. **📚 Create Documentation** system
5. **🚀 Setup CI/CD** optimizado para monorepo 