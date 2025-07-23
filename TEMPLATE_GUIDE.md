# 🏗️ Template Guide - Arquitectura Escalable CSW

Esta estructura ha sido diseñada como **template profesional reutilizable** para desarrollar múltiples aplicaciones de ingeniería civil.

## 📋 Estructura del Template

### 🔧 **Componentes Genéricos (100% Reutilizables)**

```
/hooks/                 # ✅ Completamente reutilizables
├── useModal.ts        # Hook genérico para cualquier modal
└── useCalculator.ts   # Patrón para cualquier calculadora

/lib/                  # ✅ Estructura genérica
├── constants.ts      # Configuración por aplicación
├── utils.ts         # Utilidades generales
└── csv-export.ts    # Exportación genérica

/types/               # ✅ Patrón reutilizable
└── index.ts         # Interfaces específicas por app

/components/ui/       # ✅ 100% Reutilizables
├── ToggleSection.tsx # Componente genérico
├── Modal.tsx        # Modal base
└── Layout.tsx       # Layout base

/components/         # 🔄 Específicos por aplicación
├── Calculator.tsx   # Se adapta según tipo de calculadora
├── Header.tsx      # Se personaliza por marca/app
└── Footer.tsx      # Se personaliza por app
```

## 🚀 Cómo Crear Nueva Aplicación

### **Método 1: Clonación y Personalización**

```bash
# 1. Clonar el template
git clone <template-repo> nueva-calculadora-app
cd nueva-calculadora-app

# 2. Instalar dependencias
npm install

# 3. Personalizar configuración
# Editar lib/constants.ts con nueva configuración
```

### **Método 2: Template Automatizado**

```bash
# Crear script de generación
npx create-csw-calculator mi-nueva-app --type=columnas
```

## 📝 Personalización por Aplicación

### **1. Configuración (`lib/constants.ts`)**

```typescript
// Para Calculadora de Columnas
export const APP_CONFIG = {
  TITLE: 'Calculadora de Columnas de Hormigón',
  COMPANY: 'CSW Ingeniería Civil',
  DESCRIPTION: 'Calcula la capacidad de columnas de hormigón armado',
  // ... resto de configuración
} as const;

// Para Calculadora de Placas
export const APP_CONFIG = {
  TITLE: 'Calculadora de Placas de Fundación', 
  COMPANY: 'CSW Ingeniería Civil',
  DESCRIPTION: 'Dimensiona placas de fundación',
  // ... resto de configuración
} as const;
```

### **2. Tipos Específicos (`types/index.ts`)**

```typescript
// Para Calculadora de Columnas
export interface ColumnInputData {
  fc: string;      // Resistencia hormigón
  fy: string;      // Resistencia acero
  b: string;       // Ancho
  h: string;       // Alto
  P: string;       // Carga axial
  M: string;       // Momento
}

// Para Calculadora de Placas  
export interface SlabInputData {
  P: string;       // Carga total
  sigma: string;   // Tensión admisible suelo
  L: string;       // Lado mayor
  B: string;       // Lado menor
}
```

### **3. Hook de Cálculo (`hooks/useCalculator.ts`)**

```typescript
// Patrón genérico - se adapta a cualquier calculadora
export function useCalculator<TInput, TResults>() {
  const [inputData, setInputData] = useState<TInput>();
  const [results, setResults] = useState<TResults>();
  
  // Lógica genérica que se especializa por tipo
  const calculate = useCallback(() => {
    // Implementar cálculos específicos
  }, [inputData]);
  
  return { inputData, results, calculate, updateInput };
}
```

## 🎯 Casos de Uso Reales

### **Aplicaciones que se pueden crear:**

1. **📐 Calculadora de Columnas**
   - Input: fc, fy, b, h, P, M
   - Output: As requerido, verificaciones

2. **🏗️ Calculadora de Losas**
   - Input: cargas, luces, materiales
   - Output: momentos, armaduras, flechas

3. **🏠 Calculadora de Muros**
   - Input: altura, cargas, materiales
   - Output: verificación estabilidad, armaduras

4. **⚖️ Calculadora de Cimentaciones**
   - Input: cargas, propiedades suelo
   - Output: dimensiones, verificaciones

## 🔄 Proceso de Adaptación

### **Paso 1: Configuración Base**
```typescript
// lib/constants.ts - Personalizar
export const APP_CONFIG = {
  TITLE: 'Nueva Calculadora',
  ROUTE: '/nueva-calculadora',
  // ...
};
```

### **Paso 2: Definir Tipos**
```typescript
// types/index.ts - Crear interfaces
export interface NuevaInputData {
  campo1: string;
  campo2: string;
}
```

### **Paso 3: Lógica de Cálculo**
```typescript
// hooks/useNuevaCalculadora.ts
export function useNuevaCalculadora() {
  // Implementar lógica específica
}
```

### **Paso 4: Componente Principal**
```typescript
// components/NuevaCalculadora.tsx
export function NuevaCalculadora() {
  // Usar estructura base del template
}
```

### **Paso 5: Rutas**
```typescript
// app/nueva-calculadora/page.tsx
export default function Page() {
  return <NuevaCalculadora />;
}
```

## 🏭 Template Automatizado

### **Crear Generator CLI**

```typescript
// scripts/create-calculator.ts
export function createCalculator(config: {
  name: string;
  type: 'beam' | 'column' | 'slab' | 'wall';
  inputs: string[];
  outputs: string[];
}) {
  // Generar automáticamente:
  // - Tipos TypeScript
  // - Hook de cálculo
  // - Componente principal
  // - Rutas
  // - Constantes
}
```

### **Uso del Generator**

```bash
npm run create-calculator -- \
  --name="Calculadora de Zapatas" \
  --type="foundation" \
  --inputs="P,M,qa,B,L" \
  --outputs="sigma,FS,As"
```

## 📦 Template Package

### **Estructura como NPM Package**

```json
{
  "name": "@csw/calculator-template",
  "version": "1.0.0",
  "scripts": {
    "create": "node scripts/create-calculator.js"
  }
}
```

### **Uso del Template Package**

```bash
# Instalar template globalmente
npm install -g @csw/calculator-template

# Crear nueva aplicación
csw-create-calculator mi-calculadora --type=column
```

## 🎨 Ventajas del Template

### **Para Desarrollo:**
- ✅ **Consistencia** entre aplicaciones
- ✅ **Velocidad** de desarrollo (80% menos tiempo)
- ✅ **Calidad** garantizada (estructura probada)
- ✅ **Mantenibilidad** centralizada

### **Para Negocio:**
- ✅ **Escalabilidad** rápida del portfolio
- ✅ **Branding** consistente
- ✅ **Costos** reducidos de desarrollo
- ✅ **Time-to-market** acelerado

## 🔮 Roadmap de Escalabilidad

### **Fase 1: Template Base** ✅
- Arquitectura modular establecida
- Componentes genéricos creados
- Patrones de desarrollo definidos

### **Fase 2: Automatización**
- CLI generator para nuevas calculadoras
- Templates pre-configurados por tipo
- Scripts de deployment automatizado

### **Fase 3: Plataforma**
- Multi-tenant architecture
- Dashboard administrativo
- API común para todas las calculadoras

### **Fase 4: Ecosystem**
- Marketplace de calculadoras
- Plugin system
- Integración con software CAD

## 📚 Recursos Adicionales

- **Guía de Contribución**: Como agregar nuevos tipos
- **API Documentation**: Interfaces y contratos
- **Design System**: Componentes UI disponibles
- **Testing Guide**: Como testear nuevas calculadoras 