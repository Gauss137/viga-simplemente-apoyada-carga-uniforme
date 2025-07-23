"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Download } from "lucide-react";

export default function VigaSimplementeApoyadaCargaUniforme() {
  const [datos, setDatos] = useState({
    x: "0.5",
    L: "1",
    w: "1",
    E: "200000",
    I: "180000"
  });

  // Cálculo automático en cada render
  const x = parseFloat(datos.x);
  const L = Math.max(parseFloat(datos.L), 0.001);
  const w = Math.max(parseFloat(datos.w), 0.001);
  const E = Math.max(parseFloat(datos.E), 0.001);
  const I = Math.max(parseFloat(datos.I), 0.001);

  // Determinar si hay datos válidos
  const hayDatos = [datos.x, datos.L, datos.w, datos.E, datos.I].every(v => v !== "" && !isNaN(Number(v)));

  // Cálculos
  let R = "-", Vmax = "-", Vx = "-", Mmax = "-", Mx = "-", Dmax = "-", Dx = "-";
  if (hayDatos) {
    // Conversiones correctas para deflexión
    const wN = w * 1000; // kN/m a N/m
    const Em2 = E * 1e6; // MPa a N/m²
    const Im4 = I / 1e12; // mm⁴ a m⁴

    R = ((w * L) / 2).toFixed(1);
    Vmax = R;
    Vx = (w * ((L / 2) - x)).toFixed(1);
    Mmax = ((w * L * L) / 8).toFixed(3);
    Mx = ((w * x / 2) * (L - x)).toFixed(3);

    // Deflexión máxima (en mm)
    const Dmax_m = (5 * wN * Math.pow(L, 4)) / (384 * Em2 * Im4);
    Dmax = isNaN(Dmax_m) ? "-" : (Dmax_m * 1000).toFixed(3);

    // Deflexión en x (en mm)
    const Dx_m = (wN * Math.pow(x, 2) * (Math.pow(L, 3) - 2 * L * Math.pow(x, 2) + Math.pow(x, 3))) / (24 * Em2 * Im4);
    Dx = isNaN(Dx_m) ? "-" : (Dx_m * 1000).toFixed(3);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  // Función para generar y descargar CSV
  const descargarCSV = () => {
    if (!hayDatos) return;

    const fecha = new Date().toLocaleDateString('es-ES');
    const hora = new Date().toLocaleTimeString('es-ES');
    
    const csvContent = [
      "CALCULADORA DE VIGA SIMPLEMENTE APOYADA CON CARGA UNIFORME",
      "CSW Ingeniería Civil",
      `Fecha: ${fecha}`,
      `Hora: ${hora}`,
      "",
      "DATOS DE ENTRADA",
      "Parámetro,Valor,Unidad",
      `Longitud de la viga (L),${datos.L},m`,
      `Carga uniforme (w),${datos.w},kN/m`,
      `Módulo de elasticidad (E),${datos.E},MPa`,
      `Momento de inercia (I),${datos.I},mm⁴`,
      `Sección analizada (x),${datos.x},m`,
      "",
      "RESULTADOS DEL CÁLCULO",
      "Concepto,Valor,Unidad",
      `Reacción en apoyos (R),${R},kN`,
      `Cortante máximo (Vmax),${Vmax},kN`,
      `Cortante en x (Vx),${Vx},kN`,
      `Momento máximo (Mmax),${Mmax},kNm`,
      `Momento en x (Mx),${Mx},kNm`,
      `Flecha máxima (Δmax),${Dmax},mm`,
      `Flecha en x (Δx),${Dx},mm`,
      "",
      "NOTA:",
      "Los resultados fueron calculados considerando una viga simplemente apoyada",
      "con carga uniforme distribuida. Verificar la aplicabilidad según las",
      "condiciones reales del proyecto."
    ].join('\n');

    // Crear y descargar el archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `viga_calculo_${fecha.replace(/\//g, '-')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 space-y-10">
      {/* Encabezado principal */}
      <div className="w-full flex justify-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133] w-fit pb-1 text-center">
          Calculadora de Viga Simplemente Apoyada con Carga Uniforme
        </h1>
      </div>
      <p className="text-gray-600 mt-2 font-light text-center">
        Ingresa los datos de la viga para calcular reacciones, cortantes, momentos y flechas.
      </p>

      {/* Esquema gráfico */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Esquema</h2>
        <div className="w-full flex justify-center items-center h-60 md:h-80 border border-gray-200 rounded bg-white text-gray-500">
          <Image
            src="/esquema.svg"
            alt="Esquema de la viga simplemente apoyada con carga uniforme"
            width={800}
            height={300}
            style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      </div>

      {/* Bloque de Inputs */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Datos de cálculo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-gray-700 font-medium">Longitud de la viga L [m]</Label>
            <Input 
              name="L" 
              value={datos.L}
              onChange={handleChange}
              className="mt-1 font-normal"
              type="number"
              step="0.1"
              min="0"
              placeholder="Ej: 5.0"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-700 font-medium">Carga uniforme w [kN/m]</Label>
            <Input 
              name="w" 
              value={datos.w}
              onChange={handleChange}
              className="mt-1 font-normal"
              type="number"
              step="0.1"
              min="0"
              placeholder="Ej: 5.0"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-700 font-medium">Módulo de elasticidad E [MPa]</Label>
            <Input 
              name="E" 
              value={datos.E}
              onChange={handleChange}
              className="mt-1 font-normal"
              type="number"
              step="1"
              min="0"
              placeholder="Ej: 200000"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-700 font-medium">Momento de inercia I [mm⁴]</Label>
            <Input 
              name="I" 
              value={datos.I}
              onChange={handleChange}
              className="mt-1 font-normal"
              type="number"
              step="1"
              min="0"
              placeholder="Ej: 180000"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-700 font-medium">Sección x [m]</Label>
            <Input 
              name="x" 
              value={datos.x}
              onChange={handleChange}
              className="mt-1 font-normal"
              type="number"
              step="0.1"
              min="0"
              placeholder="Ej: 1.0"
            />
          </div>
        </div>
      </div>

      {/* Resultados SIEMPRE visibles */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Resultados del cálculo</h2>
        
        {/* Diseño responsive: grid en desktop, stack en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          
          {/* Cada resultado como una tarjeta */}
                     <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
             <div className="flex justify-between items-center">
               <span className="font-semibold text-gray-700 text-sm md:text-base">Reacción en apoyos, R:</span>
               <span className="font-bold text-gray-800 text-base md:text-lg">{R} <span className="text-sm text-gray-600">kN</span></span>
             </div>
           </div>

           <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
             <div className="flex justify-between items-center">
               <span className="font-semibold text-gray-700 text-sm md:text-base">Cortante máximo, Vmax:</span>
               <span className="font-bold text-gray-800 text-base md:text-lg">{Vmax} <span className="text-sm text-gray-600">kN</span></span>
             </div>
           </div>

           <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
             <div className="flex justify-between items-center">
               <span className="font-semibold text-gray-700 text-sm md:text-base">Cortante en x, Vx:</span>
               <span className="font-bold text-gray-800 text-base md:text-lg">{Vx} <span className="text-sm text-gray-600">kN</span></span>
             </div>
           </div>

           <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
             <div className="flex justify-between items-center">
               <span className="font-semibold text-gray-700 text-sm md:text-base">Momento máximo, Mmax:</span>
               <span className="font-bold text-gray-800 text-base md:text-lg">{Mmax} <span className="text-sm text-gray-600">kNm</span></span>
             </div>
           </div>

           <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
             <div className="flex justify-between items-center">
               <span className="font-semibold text-gray-700 text-sm md:text-base">Momento en x, Mx:</span>
               <span className="font-bold text-gray-800 text-base md:text-lg">{Mx} <span className="text-sm text-gray-600">kNm</span></span>
             </div>
           </div>

           <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
             <div className="flex justify-between items-center">
               <span className="font-semibold text-gray-700 text-sm md:text-base">Flecha máxima, Δmax:</span>
               <span className="font-bold text-gray-800 text-base md:text-lg">{Dmax} <span className="text-sm text-gray-600">mm</span></span>
             </div>
           </div>

           <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
             <div className="flex justify-between items-center">
               <span className="font-semibold text-gray-700 text-sm md:text-base">Flecha en x, Δx:</span>
               <span className="font-bold text-gray-800 text-base md:text-lg">{Dx} <span className="text-sm text-gray-600">mm</span></span>
             </div>
           </div>

                 </div>

        {/* Botón de descarga CSV */}
        {hayDatos && (
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={descargarCSV}
              className="bg-[#f8b133] hover:bg-[#e5a02b] text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Download size={18} />
              Descargar resultados (CSV)
            </Button>
          </div>
        )}
      </div>

      {/* Aviso legal */}
      <div className="mt-12 p-6 rounded-xl bg-gray-100 border border-gray-200 text-sm text-gray-600">
        <p className="leading-relaxed italic">
          Las calculadoras de CSW Ingeniería Civil fueron desarrolladas con fines educativos e informativos, y no constituyen asesoramiento técnico profesional. Si bien se basan en criterios, fórmulas y normativas comúnmente aceptadas, parten de supuestos simplificados y pueden no ser aplicables a todos los casos. La información proviene de fuentes técnicas y públicas, pero su exactitud, vigencia o aplicabilidad no está garantizada. El uso de estas herramientas es responsabilidad exclusiva del usuario, quien debe validar los resultados con otras fuentes y consultar a profesionales habilitados antes de tomar decisiones constructivas o económicas. CSW Ingeniería Civil no asume responsabilidad por errores, omisiones ni consecuencias derivadas de su uso.
        </p>
      </div>

      {/* Manual de Variables reemplazado por texto - OCULTO */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" style={{ display: 'none' }}>
        <div className="prose max-w-none text-sm">
          <p>Como en todos los cálculos y fórmulas, debe tenerse especial cuidado en mantener la <b>coherencia de unidades</b> en todo momento. A continuación se indican ejemplos de unidades que deberían emplearse:</p>
          <h3><b>Notación</b></h3>
          <ul>
            <li><b>DCL</b> = diagrama de cuerpo libre.</li>
            <li><b>Q</b> = diagrama de fuerza cortante.</li>
            <li><b>M</b> = diagrama de momento flector.</li>
          </ul>
          <h3><b>Símbolos y unidades</b></h3>
          <ul>
            <li><b>E</b> = módulo de elasticidad, en MPa.</li>
            <li><b>I</b> = momento de inercia de la sección, en mm⁴.</li>
            <li><b>L</b> = luz o longitud del tramo considerado, en metros (m).</li>
            <li><b>M</b> = momento flector máximo, en kN·m.</li>
            <li><b>R</b> = carga de reacción en el apoyo, en kN.</li>
            <li><b>V</b> = fuerza cortante máxima, en kN.</li>
            <li><b>w</b> = carga distribuida por unidad de longitud, en kN/m.</li>
            <li><b>∆</b> = flecha o deformación, en milímetros (mm).</li>
            <li><b>x</b> = distancia horizontal desde el punto de apoyo, en metros (m).</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 