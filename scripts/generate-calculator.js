#!/usr/bin/env node

// 🛠️ Generador Automático de Calculadoras
// Crea toda la estructura necesaria para una nueva calculadora

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 🎯 Configuración
const STRUCTURE_TYPES = ['vigas', 'porticos', 'losas', 'acero'];
const CALCULATOR_REGISTRY_PATH = './lib/calculator-registry.ts';

// 🎨 Templates
const PAGE_TEMPLATE = (structureType, category, name, displayName) => `
import { ${toPascalCase(name)}Calculator } from '@/components/calculators/${structureType}/${toPascalCase(category)}/${toPascalCase(name)}Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${displayName} | Calculadoras de Ingeniería',
  description: 'Calculadora especializada para ${displayName.toLowerCase()}. Resultados precisos y exportación profesional.',
  keywords: ['${structureType}', '${category}', '${name}', 'calculadora', 'ingeniería', 'estructural'],
};

export default function ${toPascalCase(name)}Page() {
  return <${toPascalCase(name)}Calculator />;
}
`;

const COMPONENT_TEMPLATE = (structureType, category, name, displayName) => `
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, FileDown, RotateCcw } from 'lucide-react';
import { calculate${toPascalCase(name)} } from '@/lib/calculators/${structureType}/${toKebabCase(category)}/${toKebabCase(name)}';
import { ExportCSV } from '@/components/shared/ExportCSV';
import { FormulaDisplay } from '@/components/shared/FormulaDisplay';
import { ResultsPanel } from '@/components/shared/ResultsPanel';
import { DiagramDisplay } from '@/components/shared/DiagramDisplay';

interface ${toPascalCase(name)}Inputs {
  // TODO: Definir inputs específicos
  length: number;
  load: number;
  elasticModulus: number;
  momentInertia: number;
}

interface ${toPascalCase(name)}Results {
  // TODO: Definir resultados específicos
  maxMoment: number;
  maxDeflection: number;
  reactions: { left: number; right: number };
}

export function ${toPascalCase(name)}Calculator() {
  const [inputs, setInputs] = useState<${toPascalCase(name)}Inputs>({
    length: 5,
    load: 10,
    elasticModulus: 200000,
    momentInertia: 1000000
  });

  const [results, setResults] = useState<${toPascalCase(name)}Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const calculatedResults = calculate${toPascalCase(name)}(inputs);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Error en cálculo:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setInputs({
      length: 5,
      load: 10,
      elasticModulus: 200000,
      momentInertia: 1000000
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ${displayName}
        </h1>
        <p className="text-gray-600">
          Calculadora especializada para análisis de ${structureType} - ${category}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Datos de Entrada
            </CardTitle>
            <CardDescription>
              Ingrese los parámetros de la ${structureType.slice(0, -1)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* TODO: Implementar inputs específicos */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="length">Longitud (m)</Label>
                <Input
                  id="length"
                  type="number"
                  value={inputs.length}
                  onChange={(e) => setInputs(prev => ({ ...prev, length: Number(e.target.value) }))}
                  step="0.1"
                  min="0.1"
                />
              </div>
              <div>
                <Label htmlFor="load">Carga (kN/m)</Label>
                <Input
                  id="load"
                  type="number"
                  value={inputs.load}
                  onChange={(e) => setInputs(prev => ({ ...prev, load: Number(e.target.value) }))}
                  step="0.1"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleCalculate} disabled={isCalculating} className="flex-1">
                {isCalculating ? 'Calculando...' : 'Calcular'}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        {results && (
          <ResultsPanel 
            results={results}
            title="Resultados del Análisis"
            onExport={() => {/* TODO: Implementar exportación */}}
          />
        )}
      </div>

      {/* Diagram */}
      <DiagramDisplay 
        type="${structureType}"
        category="${category}"
        name="${name}"
        inputs={inputs}
      />

      {/* Formulas */}
      <FormulaDisplay 
        title="Fórmulas Utilizadas"
        formulas={[
          // TODO: Agregar fórmulas específicas
          'M_{max} = \\\\frac{wL^2}{8}',
          '\\\\delta_{max} = \\\\frac{5wL^4}{384EI}'
        ]}
      />
    </div>
  );
}
`;

const CALCULATION_TEMPLATE = (name) => `
// 🧮 Cálculos para ${name}
// Funciones de cálculo puras sin dependencias de UI

export interface ${toPascalCase(name)}Inputs {
  // TODO: Definir tipos de entrada
  length: number;
  load: number;
  elasticModulus: number;
  momentInertia: number;
}

export interface ${toPascalCase(name)}Results {
  // TODO: Definir tipos de salida
  maxMoment: number;
  maxDeflection: number;
  reactions: { left: number; right: number };
}

/**
 * Calcula los resultados para ${name}
 * @param inputs Parámetros de entrada
 * @returns Resultados del análisis
 */
export function calculate${toPascalCase(name)}(inputs: ${toPascalCase(name)}Inputs): ${toPascalCase(name)}Results {
  const { length: L, load: w, elasticModulus: E, momentInertia: I } = inputs;

  // TODO: Implementar cálculos específicos
  // Ejemplo para viga simplemente apoyada con carga uniforme:
  
  // Reacciones
  const reactions = {
    left: (w * L) / 2,
    right: (w * L) / 2
  };

  // Momento máximo
  const maxMoment = (w * L * L) / 8;

  // Deflexión máxima
  const maxDeflection = (5 * w * Math.pow(L, 4)) / (384 * E * I);

  return {
    maxMoment,
    maxDeflection,
    reactions
  };
}

/**
 * Valida los inputs de entrada
 * @param inputs Parámetros a validar
 * @returns Array de errores (vacío si válido)
 */
export function validate${toPascalCase(name)}Inputs(inputs: ${toPascalCase(name)}Inputs): string[] {
  const errors: string[] = [];

  if (inputs.length <= 0) {
    errors.push('La longitud debe ser mayor a 0');
  }
  
  if (inputs.load < 0) {
    errors.push('La carga no puede ser negativa');
  }

  if (inputs.elasticModulus <= 0) {
    errors.push('El módulo de elasticidad debe ser mayor a 0');
  }

  if (inputs.momentInertia <= 0) {
    errors.push('El momento de inercia debe ser mayor a 0');
  }

  return errors;
}
`;

const TEST_TEMPLATE = (name) => `
// 🧪 Tests para ${name}

import { calculate${toPascalCase(name)}, validate${toPascalCase(name)}Inputs } from './${toKebabCase(name)}';

describe('${name} Calculator', () => {
  const validInputs = {
    length: 5,
    load: 10,
    elasticModulus: 200000,
    momentInertia: 1000000
  };

  describe('calculate${toPascalCase(name)}', () => {
    it('should calculate correct results for valid inputs', () => {
      const results = calculate${toPascalCase(name)}(validInputs);
      
      expect(results.maxMoment).toBeGreaterThan(0);
      expect(results.maxDeflection).toBeGreaterThan(0);
      expect(results.reactions.left).toBeGreaterThan(0);
      expect(results.reactions.right).toBeGreaterThan(0);
    });

    it('should have symmetric reactions for symmetric loading', () => {
      const results = calculate${toPascalCase(name)}(validInputs);
      
      expect(results.reactions.left).toBeCloseTo(results.reactions.right);
    });
  });

  describe('validate${toPascalCase(name)}Inputs', () => {
    it('should return no errors for valid inputs', () => {
      const errors = validate${toPascalCase(name)}Inputs(validInputs);
      expect(errors).toHaveLength(0);
    });

    it('should return error for invalid length', () => {
      const invalidInputs = { ...validInputs, length: 0 };
      const errors = validate${toPascalCase(name)}Inputs(invalidInputs);
      expect(errors).toContain('La longitud debe ser mayor a 0');
    });

    it('should return error for negative load', () => {
      const invalidInputs = { ...validInputs, load: -5 };
      const errors = validate${toPascalCase(name)}Inputs(invalidInputs);
      expect(errors).toContain('La carga no puede ser negativa');
    });
  });
});
`;

// 🛠️ Utility Functions
function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function toKebabCase(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content.trim() + '\n');
  console.log(`✅ Creado: ${filePath}`);
}

// 🚀 Main Generator Function
function generateCalculator(structureType, category, name, displayName) {
  console.log(`🏗️  Generando calculadora: ${displayName}`);

  // Validate structure type
  if (!STRUCTURE_TYPES.includes(structureType)) {
    console.error(`❌ Tipo de estructura inválido: ${structureType}`);
    console.error(`   Tipos válidos: ${STRUCTURE_TYPES.join(', ')}`);
    process.exit(1);
  }

  const kebabCategory = toKebabCase(category);
  const kebabName = toKebabCase(name);

  // 📁 Create directory structure
  const appDir = `app/calculadoras/${structureType}/${kebabCategory}/${kebabName}`;
  const componentDir = `components/calculators/${structureType}/${toPascalCase(category)}`;
  const libDir = `lib/calculators/${structureType}/${kebabCategory}`;
  const testDir = `tests/calculators/${structureType}/${kebabCategory}`;

  // 📄 Generate files
  writeFile(`${appDir}/page.tsx`, PAGE_TEMPLATE(structureType, category, name, displayName));
  writeFile(`${componentDir}/${toPascalCase(name)}Calculator.tsx`, COMPONENT_TEMPLATE(structureType, category, name, displayName));
  writeFile(`${libDir}/${kebabName}.ts`, CALCULATION_TEMPLATE(name));
  writeFile(`${testDir}/${kebabName}.test.ts`, TEST_TEMPLATE(name));

  console.log(`\n🎉 Calculadora generada exitosamente!`);
  console.log(`📍 Ruta: /calculadoras/${structureType}/${kebabCategory}/${kebabName}`);
  console.log(`\n📋 Próximos pasos:`);
  console.log(`   1. Implementar cálculos específicos en ${libDir}/${kebabName}.ts`);
  console.log(`   2. Personalizar UI en ${componentDir}/${toPascalCase(name)}Calculator.tsx`);
  console.log(`   3. Agregar al registro en ${CALCULATOR_REGISTRY_PATH}`);
  console.log(`   4. Ejecutar tests: npm test ${testDir}/${kebabName}.test.ts`);
}

// 🎯 CLI Interface
function main() {
  const args = process.argv.slice(2);

  if (args.length < 4) {
    console.log(`🛠️  Generador de Calculadoras de Ingeniería`);
    console.log(`\nUso: node scripts/generate-calculator.js <estructura> <categoria> <nombre> <"Título Completo">`);
    console.log(`\nEjemplos:`);
    console.log(`  node scripts/generate-calculator.js vigas simplemente-apoyadas carga-puntual "Carga Puntual en el Centro"`);
    console.log(`  node scripts/generate-calculator.js porticos tres-barras-pin-roller momento-esquina "Momento en Esquina Superior"`);
    console.log(`  node scripts/generate-calculator.js losas carga-uniforme aaaa-apoyada "AAAA - Apoyada en Cuatro Bordes"`);
    console.log(`\nTipos de estructura válidos: ${STRUCTURE_TYPES.join(', ')}`);
    process.exit(1);
  }

  const [structureType, category, name, displayName] = args;
  generateCalculator(structureType, category, name, displayName);
}

if (require.main === module) {
  main();
}

module.exports = { generateCalculator, toPascalCase, toKebabCase }; 