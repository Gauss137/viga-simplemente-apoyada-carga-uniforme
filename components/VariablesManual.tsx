// components/VariablesManual.tsx
export default function VariablesManual() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 mt-10">
      <div className="bg-gray-100 p-6 rounded-lg text-xs md:text-sm italic text-gray-600">
        <div className="mb-2 font-semibold not-italic text-gray-700 text-center md:text-left">Manual de Variables</div>
        <div className="mb-2 font-semibold not-italic text-gray-700">Datos de entrada</div>
        <ul className="space-y-2">
          <li><span className="font-medium not-italic text-gray-700">b</span> = ancho de la losa en [m]. Típicamente 1m si el momento está dado en KN-m/m</li>
          <li><span className="font-medium not-italic text-gray-700">h</span> = altura total de la losa en [m]</li>
          <li><span className="font-medium not-italic text-gray-700">recub_eje</span> = recubrimiento de hormigón medido del eje del acero a la cara más cercana de concreto [m]. Normalmente 0.025m</li>
          <li><span className="font-medium not-italic text-gray-700">fc</span> = resistencia característica del hormigón. Normalmente toma valores entre 20 y 50 [MPa]</li>
          <li><span className="font-medium not-italic text-gray-700">fy</span> = resistencia a la fluencia del acero. Normalmente toma valores entre 420 a 500 [MPa]</li>
          <li><span className="font-medium not-italic text-gray-700">Mu</span> = Momento de fuerza Mayorado que llega a la columna en el sector de análisis (tramo o apoyo) en kN·m/m</li>
        </ul>
        <div className="mt-4 mb-2 font-semibold not-italic text-gray-700">Resultados de salida</div>
        <ul className="space-y-2">
          <li><span className="font-medium not-italic text-gray-700">As-nec</span> = Sección de acero necesaria en la cara a tracción de la losa, en [cm²/m]</li>
          <li><span className="font-medium not-italic text-gray-700">As-max</span> = máximo acero admisible en la losa antes de necesitar acero a compresión, en [cm²/m]</li>
          <li><span className="font-medium not-italic text-gray-700">As-min</span> = acero mínimo requerido en la cara de tracción de la losa, en [cm²/m]</li>
          <li><span className="font-medium not-italic text-gray-700">As'</span> = Acero a compresión en la zona comprimida de la losa, si se requiriera. [cm²/m]</li>
        </ul>
      </div>
    </div>
  );
} 