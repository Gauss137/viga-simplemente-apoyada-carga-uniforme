# 🔄 Plan de Migración - Calculadoras de Ingeniería

## 🎯 Objetivo
Migrar la aplicación actual a la nueva arquitectura escalable para 97 calculadoras.

## 📊 Estado Actual vs Objetivo

### ❌ Estado Actual (Problemático)
```
├── components/
│   ├── BeamCalculator.tsx           # Calculadora mezclada
│   ├── SteelCalculator.tsx          # Calculadora específica
│   └── viga_simplementeapoyada_cargauniforme.tsx # Eliminado
├── lib/
│   ├── beam-constants.ts            # Constantes mezcladas
│   ├── steel-constants.ts           # Constantes específicas
│   └── beam-routes.ts               # Rutas incompletas
└── app/
    ├── beam-calculator/page.tsx     # Ruta genérica (legacy)
    └── vigas/simplemente-apoyadas/carga-uniforme/page.tsx # Nueva ruta
```

### ✅ Objetivo (Escalable)
```
├── components/
│   ├── shared/                      # Componentes reutilizables
│   │   ├── CalculatorLayout.tsx     # ✅ Creado
│   │   ├── ResultsPanel.tsx         # ✅ Creado
│   │   ├── DiagramDisplay.tsx       # ✅ Creado
│   │   └── FormulaDisplay.tsx       # ✅ Creado
│   └── calculators/
│       ├── vigas/                   # 43 calculadoras
│       ├── porticos/                # 33 calculadoras
│       ├── losas/                   # 21 calculadoras
│       └── acero/                   # 8 calculadoras
├── lib/
│   ├── calculator-registry.ts       # ✅ Creado - Registro central
│   ├── calculators/                 # Lógica de cálculo pura
│   │   ├── vigas/
│   │   ├── porticos/
│   │   ├── losas/
│   │   └── acero/
│   └── utils.ts                     # ✅ Actualizado
├── scripts/
│   └── generate-calculator.js       # ✅ Creado - CLI generator
└── app/calculadoras/               # Rutas organizadas
    ├── vigas/
    ├── porticos/
    ├── losas/
    └── acero/
```

## 🔄 Fases de Migración

### ✅ Fase 1: Arquitectura Base (COMPLETADA)
- [x] Crear registro central de calculadoras
- [x] Implementar componentes shared reutilizables  
- [x] Configurar generador automático de calculadoras
- [x] Actualizar documentación y README

### 🔄 Fase 2: Migración del Código Actual (EN PROGRESO)
- [ ] 2.1: Migrar BeamCalculator actual
- [ ] 2.2: Migrar SteelCalculator 
- [ ] 2.3: Limpiar archivos legacy
- [ ] 2.4: Actualizar navegación

### 🚀 Fase 3: Expansión (PENDIENTE)
- [ ] 3.1: Generar estructura para las 97 calculadoras
- [ ] 3.2: Implementar calculadoras prioritarias
- [ ] 3.3: Setupar testing framework
- [ ] 3.4: Optimizar CI/CD

## 📋 Tareas Específicas de Migración

### 2.1: Migrar BeamCalculator
```bash
# Crear estructura nueva
mkdir -p app/calculadoras/vigas/simplemente-apoyadas/carga-uniforme
mkdir -p components/calculators/vigas/SimplySupported
mkdir -p lib/calculators/vigas/simply-supported

# Migrar archivos
mv components/BeamCalculator.tsx components/calculators/vigas/SimplySupported/UniformLoadCalculator.tsx
# Refactor imports y exports
# Separar lógica de cálculo
# Actualizar rutas
```

### 2.2: Migrar SteelCalculator  
```bash
# Crear estructura
mkdir -p app/calculadoras/acero/barras-acero
mkdir -p components/calculators/acero/Basic

# Migrar
mv components/SteelCalculator.tsx components/calculators/acero/Basic/SteelBarsCalculator.tsx
# Refactor usando shared components
```

### 2.3: Limpiar Legacy
```bash
# Eliminar archivos obsoletos
rm app/beam-calculator/page.tsx
rm lib/beam-constants.ts
rm lib/steel-constants.ts

# Actualizar imports en toda la app
# Verificar que no hay referencias rotas
```

## 🎯 Criterios de Éxito

### ✅ Funcionalidad
- [ ] Todas las calculadoras actuales funcionan
- [ ] Navegación nueva funciona
- [ ] Legacy URLs redirigen correctamente
- [ ] Exportación CSV funciona

### ✅ Performance  
- [ ] Build time < 30 segundos
- [ ] Page load < 2 segundos
- [ ] No breaking changes

### ✅ Developer Experience
- [ ] Generator CLI funcional
- [ ] Tests pasan
- [ ] Linting sin errores
- [ ] TypeScript strict mode

## 🚧 Estado Actual de Migración

### ✅ Completado
- Arquitectura base definida
- Componentes shared creados
- Registro central implementado
- CLI generator funcional
- Documentación actualizada

### 🔄 En Progreso  
- Migración de BeamCalculator
- Resolución de dependencias UI
- Actualización de navegación

### ❌ Pendiente
- Migración de SteelCalculator
- Cleanup de archivos legacy
- Testing setup
- Performance optimization

## 🚀 Próximos Pasos Inmediatos

1. **Resolver problemas de deploy** actual
2. **Completar migración de BeamCalculator** a nueva estructura
3. **Crear componentes UI faltantes** (Card, etc.)
4. **Probar generador** con una calculadora nueva
5. **Setup testing framework** básico

## 📊 Métricas de Progreso

- **Arquitectura**: 85% completada
- **Migración**: 15% completada  
- **Testing**: 0% completada
- **Documentation**: 90% completada

**Tiempo estimado restante**: 2-3 días de desarrollo activo 