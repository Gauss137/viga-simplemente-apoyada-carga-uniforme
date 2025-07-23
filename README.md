# 🏗️ Calculadora de Viga Simplemente Apoyada con Carga Uniforme

Aplicación web desarrollada por **CSW Ingeniería Civil** para el cálculo de vigas simplemente apoyadas con carga uniforme distribuida.

## 📋 Descripción

Esta calculadora permite calcular:
- ⚖️ **Reacciones** en los apoyos
- ✂️ **Fuerzas cortantes** (máxima y en cualquier sección)
- 🔄 **Momentos flectores** (máximo y en cualquier sección)  
- 📏 **Deflexiones** (máxima y en cualquier sección)

## 🚀 Características

- ✅ **Interfaz intuitiva** y responsive
- ✅ **Cálculos en tiempo real**
- ✅ **Esquema gráfico** de la viga
- ✅ **Fórmulas matemáticas** con notación LaTeX
- ✅ **Exportación de resultados** en formato CSV
- ✅ **Diseño profesional** con identidad visual de CSW

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15.4.1
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Fuentes**: Poppins (Google Fonts)
- **Íconos**: Lucide React
- **Matemáticas**: KaTeX para renderizado de fórmulas
- **Despliegue**: Vercel

## 🧮 Fórmulas Implementadas

### Reacciones en los Apoyos
```
R = wL/2
```

### Cortante Máximo
```
Vmax = wL/2
```

### Cortante en Sección x
```
Vx = w(L/2 - x)
```

### Momento Máximo
```
Mmax = wL²/8
```

### Momento en Sección x
```
Mx = (wx/2)(L - x)
```

### Deflexión Máxima
```
Δmax = 5wL⁴/(384EI)
```

### Deflexión en Sección x
```
Δx = wx²(L³ - 2Lx² + x³)/(24EI)
```

## 🔧 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📱 Uso

1. **Ingresa los datos** de la viga:
   - Longitud (L) en metros
   - Carga uniforme (w) en kN/m
   - Módulo de elasticidad (E) en MPa
   - Momento de inercia (I) en mm⁴
   - Sección de análisis (x) en metros

2. **Haz clic en "Calcular"** para obtener los resultados

3. **Descarga los resultados** en formato CSV si lo necesitas

## ⚖️ Aviso Legal

Las calculadoras fueron desarrolladas con fines educativos e informativos, y no constituyen asesoramiento técnico profesional. Si bien se basan en criterios, fórmulas y normativas comúnmente aceptadas, parten de supuestos simplificados y pueden no ser aplicables a todos los casos.

**CSW Ingeniería Civil** no asume responsabilidad por errores, omisiones ni consecuencias derivadas de su uso.

## 📞 Contacto

- **Web**: [cswingenieriacivil.com](https://www.cswingenieriacivil.com)
- **LinkedIn**: [CSW Ingeniería Civil](https://www.linkedin.com/company/cswingenieriacivil/)
- **Instagram**: [@csw_ingenieriacivil](https://www.instagram.com/csw_ingenieriacivil/)

---

**Desarrollado con ❤️ por CSW Ingeniería Civil** - Haciendo la ingeniería accesible para todos.
