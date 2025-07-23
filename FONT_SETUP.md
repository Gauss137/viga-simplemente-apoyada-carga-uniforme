# Configuración de Fuente Dosis

## 📁 Estructura de Archivos

Coloca los siguientes archivos TTF en el directorio `public/fonts/`:

```
public/fonts/
├── Dosis-Bold.ttf
├── Dosis-SemiBold.ttf
├── Dosis-ExtraBold.ttf
├── Dosis-ExtraLight.ttf
├── Dosis-Light.ttf
├── Dosis-Medium.ttf
└── Dosis-Regular.ttf
```

## 🎨 Jerarquías Tipográficas Implementadas

### **Títulos Principales** - `font-extrabold` (800)
- Título principal de la calculadora
- Elementos de máxima importancia visual

### **Títulos de Sección** - `font-semibold` (600)
- "Datos de cálculo"
- "Resultados del cálculo"
- Enlaces de navegación

### **Labels y Elementos Destacados** - `font-medium` (500)
- Labels de los campos de entrada
- Información importante en el footer

### **Texto Base** - `font-normal` (400)
- Contenido de los inputs
- Texto de los resultados
- Contenido principal

### **Texto Secundario** - `font-light` (300)
- Descripción del subtítulo
- Texto secundario en el footer

## 🔧 Configuración Técnica

### CSS Global (`app/globals.css`)
- Declaraciones `@font-face` para todas las variantes
- Configuración de `font-display: swap` para mejor performance
- Variables CSS para la familia de fuentes

### Componentes Actualizados
- **FlexionForm**: Jerarquías optimizadas para cada elemento
- **Header**: Navegación con peso semibold
- **Footer**: Texto con pesos light y medium

## 🚀 Beneficios de la Implementación

1. **Performance Optimizada**: `font-display: swap` para carga rápida
2. **Jerarquía Visual Clara**: Pesos de fuente bien definidos
3. **Consistencia**: Uso uniforme en toda la aplicación
4. **Accesibilidad**: Contraste y legibilidad mejorados
5. **Responsive**: Funciona perfectamente en todos los dispositivos

## 📱 Uso en Tailwind CSS

Las clases de fuente están disponibles automáticamente:

```css
.font-extralight  /* 200 */
.font-light       /* 300 */
.font-normal      /* 400 */
.font-medium      /* 500 */
.font-semibold    /* 600 */
.font-bold        /* 700 */
.font-extrabold   /* 800 */
```

## ✅ Verificación

Después de agregar los archivos TTF:

1. Ejecuta `npm run build` - debe compilar sin errores
2. Ejecuta `npm run dev` - la aplicación debe cargar correctamente
3. Verifica que las fuentes se carguen en el navegador (DevTools > Network)

## 🎯 Resultado Final

Una interfaz moderna y profesional con:
- Tipografía Dosis completamente implementada
- Jerarquías visuales claras y consistentes
- Performance optimizada
- Diseño responsive y accesible 