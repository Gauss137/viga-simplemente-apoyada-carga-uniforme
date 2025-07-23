# 🏗️ Calculadoras de Ingeniería Civil

> Suite completa de calculadoras especializadas para análisis estructural de vigas y diseño de acero de refuerzo.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Descripción

Sistema integral de **97 calculadoras especializadas** para ingeniería estructural, enfocado en:

- **🏗️ Análisis de Vigas**: 43 calculadoras para diferentes tipos de apoyo y cargas
- **🏢 Análisis de Pórticos**: 33 calculadoras para estructuras aporticadas
- **🧱 Análisis de Losas**: 21 calculadoras para placas rectangulares
- **🔩 Diseño de Acero**: 8 calculadoras para refuerzo estructural
- **📊 Resultados Profesionales**: Exportación a CSV, fórmulas detalladas, diagramas

## 🚀 Demo en Vivo

**🌐 [Visita la Aplicación](https://viga-simplemente-apoyada-carga-uniforme.vercel.app/)**

## ⚡ Nueva Arquitectura v2.0

### 🏗️ **Estructura Escalable**
```
📁 97 Calculadoras Organizadas:
├── 🏗️ Vigas (43) - Simplemente apoyadas, empotradas, voladizos
├── 🏢 Pórticos (33) - Diferentes configuraciones de apoyo
├── 🧱 Losas (21) - Cargas uniformes, variables y puntuales  
└── 🔩 Acero (8) - Barras, cuantías y dimensionamiento
```

### 🛠️ **Generador Automático**
```bash
# Crear nueva calculadora automáticamente
npm run generate:calculator vigas simplemente-apoyadas carga-puntual "Carga Puntual Central"
```

### 🎨 **Componentes Reutilizables**
- **Layout unificado** para todas las calculadoras
- **Panel de resultados** configurable por secciones
- **Diagramas dinámicos** con Canvas 2D
- **Renderizado de fórmulas** con KaTeX
- **Exportación CSV** profesional

## 📋 Calculadoras Disponibles

### 🏗️ **Vigas Estructurales (43 total)**

#### **1. Simplemente Apoyadas (13)**
- ✅ **Carga Uniformemente Distribuida** - `/calculadoras/vigas/simplemente-apoyadas/carga-uniforme`
- 🔄 Carga Uniformemente Creciente hacia un Extremo
- 🔄 Carga Uniformemente Creciente hacia el Centro
- 🔄 Carga Puntual en el Centro
- 🔄 Carga Puntual Excéntrica
- 🔄 Dos Cargas Puntuales Simétricas
- 🔄 Dos Cargas Puntuales Asimétricas
- 🔄 Tres Cargas Puntuales Equidistantes
- 🔄 Momento Puntual en el Centro
- 🔄 Momento Puntual Excéntrico
- 🔄 Carga Distribuida Parcial
- 🔄 Carga Triangular Completa
- 🔄 Combinación de Cargas

#### **2. Empotrada-Articulada (3)**
- 🔄 Carga Uniformemente Distribuida
- 🔄 Carga Puntual en el Centro
- 🔄 Momento en el Extremo Articulado

#### **3. Empotrada en Ambos Extremos (3)**
- 🔄 Carga Uniformemente Distribuida  
- 🔄 Carga Puntual en el Centro
- 🔄 Momento Aplicado en un Extremo

#### **4. Vigas en Voladizo (6)**
- 🔄 Carga Uniformemente Distribuida
- 🔄 Carga Puntual en el Extremo Libre
- 🔄 Carga Puntual Intermedia
- 🔄 Momento en el Extremo Libre
- 🔄 Carga Triangular
- 🔄 Carga Distribuida Parcial

#### **5. Vigas con Voladizos (6)**
- 🔄 Carga Uniformemente Distribuida en Todo el Tramo
- 🔄 Carga Uniformemente Distribuida Solo en el Tramo Central
- 🔄 Carga Uniformemente Distribuida Solo en los Voladizos
- 🔄 Carga Puntual en el Centro del Tramo
- 🔄 Carga Puntual en los Extremos de los Voladizos
- 🔄 Combinación de Cargas Distribuidas y Puntuales

#### **6. Vigas Continuas - 2 Tramos (7)**
- 🔄 Carga Uniformemente Distribuida en Ambos Tramos
- 🔄 Carga Uniformemente Distribuida Solo en el Primer Tramo
- 🔄 Carga Uniformemente Distribuida Solo en el Segundo Tramo
- 🔄 Carga Puntual en el Centro del Primer Tramo
- 🔄 Carga Puntual en el Centro del Segundo Tramo
- 🔄 Carga Puntual en el Apoyo Central
- 🔄 Diferentes Cargas en Cada Tramo

### 🏢 **Pórticos Estructurales (33 total)**

#### **1. Tres Barras - Articulado/Rodillo (8)**
- 🔄 Carga Puntual Central
- 🔄 Carga Puntual en Esquina Superior
- 🔄 Carga Puntual en Esquina Inferior
- 🔄 Momento en Esquina Superior
- 🔄 Momento Flector Central
- 🔄 Carga Distribuida Superior (UDL)
- 🔄 Carga Distribuida Lateral
- 🔄 Carga Distribuida Lateral hacia Fuera

#### **2-8. Otras Configuraciones (25)**
- 🔄 Tres Barras - Articulado/Articulado (5)
- 🔄 Tres Barras - Empotrado/Empotrado (3)
- 🔄 Tres Barras - Empotrado/Libre (5)
- 🔄 Dos Barras - Articulado/Articulado (2)
- 🔄 Dos Barras - Empotrado/Empotrado (2)
- 🔄 Dos Barras - Empotrado/Articulado (4)
- 🔄 Dos Barras - Empotrado/Libre (4)

### 🧱 **Losas Rectangulares (21 total)**

#### **1. Carga Uniformemente Distribuida (14)**
- 🔄 AAAA - Apoyada en Cuatro Bordes
- 🔄 AAAE - Tres Bordes Apoyados, Uno Empotrado
- 🔄 EAAA - Un Borde Empotrado, Tres Apoyados
- 🔄 EAEA - Bordes Opuestos Empotrados
- 🔄 AEAE - Bordes Alternados Empotrado-Apoyado
- 🔄 EAAE - Dos Bordes Empotrados Contiguos
- 🔄 EEAE - Tres Bordes Empotrados, Uno Apoyado
- 🔄 EAEE - Un Borde Apoyado, Tres Empotrados
- 🔄 ELEE - Un Borde Libre y Tres Empotrados
- 🔄 EELE - Dos Bordes Empotrados, Uno Libre
- 🔄 EEEE - Empotrada en Cuatro Bordes
- 🔄 PPPP - Apoyada Solo en Esquinas
- 🔄 LALA - Libre-Apoyado-Libre-Apoyado
- 🔄 ALAL - Apoyado-Libre-Apoyado-Libre

#### **2. Carga Distribuida Variable (5)**
- 🔄 EAEE, EEAE, ELEE, EELE, EEEE con CDV

#### **3. Carga Puntual (2)**
- 🔄 AAAA - Losa Apoyada con Carga Puntual
- 🔄 EEEE - Losa Empotrada con Carga Puntual

### 🔩 **Acero de Refuerzo (8 total)**
- ✅ **Calculadora de Barras de Acero** - `/calculadoras/acero/barras-acero`
- 🔄 Cuantía Mínima de Refuerzo
- 🔄 Cuantía Balanceada
- 🔄 Separación de Barras
- 🔄 Longitud de Desarrollo
- 🔄 Longitud de Anclaje
- 🔄 Empalmes de Barras
- 🔄 Cortante en Vigas

## 🚀 Inicio Rápido

### **Instalación**
```bash
git clone https://github.com/Gauss137/viga-simplemente-apoyada-carga-uniforme.git
cd viga-simplemente-apoyada-carga-uniforme
npm install
npm run dev
```

### **Generar Nueva Calculadora**
```bash
# Sintaxis: npm run generate:calculator <tipo> <categoria> <nombre> <"Título">
npm run generate:calculator vigas simplemente-apoyadas carga-puntual "Carga Puntual en el Centro"
npm run generate:calculator porticos tres-barras-pin-pin momento-esquina "Momento en Esquina Superior"
npm run generate:calculator losas carga-uniforme aaaa-apoyada "AAAA - Apoyada en Cuatro Bordes"
```

### **Build y Deploy**
```bash
npm run build    # Compilar para producción
npm run start    # Servidor de producción
npm test         # Ejecutar tests
```

## 🛠️ Tecnologías

- **Framework**: Next.js 15.4.1 con App Router
- **Frontend**: React 19.1.0 + TypeScript
- **Styling**: Tailwind CSS con componentes custom
- **Math**: KaTeX para renderizado de fórmulas
- **Diagramas**: HTML5 Canvas para visualizaciones
- **Icons**: Lucide React
- **Deploy**: Vercel con CI/CD automático

## 📊 Características Técnicas

- **⚡ Performance**: Build optimizado < 30 segundos
- **📱 Responsive**: Diseño mobile-first
- **♿ Accessible**: WCAG 2.1 AA compliance
- **🔒 Type Safety**: TypeScript strict mode
- **🧪 Testing**: Jest + React Testing Library
- **📈 SEO**: Metadata optimizada por calculadora
- **💾 Export**: CSV con resultados profesionales

## 🏗️ Arquitectura

```
📁 Proyecto/
├── 📱 app/calculadoras/          # Rutas organizadas por tipo
├── 🎨 components/
│   ├── shared/                   # Componentes reutilizables
│   ├── calculators/              # Calculadoras específicas
│   └── ui/                       # Componentes base
├── 📚 lib/
│   ├── calculator-registry.ts    # Registro central
│   ├── calculators/              # Lógica de cálculo
│   └── utils.ts                  # Utilidades compartidas
└── 🛠️ scripts/
    └── generate-calculator.js    # CLI generator
```

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crea** una nueva calculadora: `npm run generate:calculator`
3. **Implementa** los cálculos específicos
4. **Añade** tests unitarios
5. **Envía** un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 🎯 Roadmap

- [x] **v2.0**: Nueva arquitectura escalable ✅
- [x] **v2.0**: Generador automático de calculadoras ✅
- [x] **v2.0**: Componentes shared reutilizables ✅
- [ ] **v2.1**: Migración completa de calculadoras existentes
- [ ] **v2.2**: Implementación de 10 calculadoras prioritarias
- [ ] **v2.3**: Testing framework y CI/CD mejorado
- [ ] **v3.0**: Calculadoras avanzadas (análisis dinámico, no lineal)

---

**Desarrollado con ❤️ por [CSW Ingeniería Civil](https://www.cswingenieriacivil.com)**

*Las calculadoras son herramientas de apoyo educativo e informativo. No constituyen asesoramiento técnico profesional.*
