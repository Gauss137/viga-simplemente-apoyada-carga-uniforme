"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Activity, BarChart3 } from 'lucide-react';

interface ResultItem {
  label: string;
  value: number | string;
  unit?: string;
  description?: string;
  type?: 'primary' | 'secondary' | 'warning' | 'danger';
  precision?: number;
}

interface ResultSection {
  title: string;
  icon?: React.ReactNode;
  items: ResultItem[];
}

interface ResultsPanelProps {
  title?: string;
  description?: string;
  sections: ResultSection[];
  onExport?: () => void;
  // Props alternativos para compatibilidad con uso directo
  results?: Record<string, any>;
}

export function ResultsPanel({
  title = "Resultados del Análisis",
  description = "Valores calculados según las condiciones especificadas",
  sections = [],
  results,
  onExport
}: ResultsPanelProps) {
  // Si se pasa 'results' directamente, convertir a formato de secciones
  const finalSections = sections.length > 0 ? sections : (results ? convertResultsToSections(results) : []);

  const formatValue = (value: number | string, precision = 3): string => {
    if (typeof value === 'string') return value;
    if (isNaN(value)) return 'N/A';
    return Number(value).toFixed(precision);
  };

  const getTypeStyles = (type: ResultItem['type'] = 'primary') => {
    const styles = {
      primary: 'text-gray-900 font-semibold',
      secondary: 'text-gray-700',
      warning: 'text-yellow-700 font-semibold',
      danger: 'text-red-700 font-semibold'
    };
    return styles[type];
  };

  const getTypeIcon = (type: ResultItem['type'] = 'primary') => {
    const icons = {
      primary: <TrendingUp className="h-4 w-4 text-green-500" />,
      secondary: <Activity className="h-4 w-4 text-blue-500" />,
      warning: <BarChart3 className="h-4 w-4 text-yellow-500" />,
      danger: <BarChart3 className="h-4 w-4 text-red-500" />
    };
    return icons[type];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#f8b133]" />
              {title}
            </CardTitle>
            <CardDescription className="mt-1">
              {description}
            </CardDescription>
          </div>
          {onExport && (
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-gray-50"
              onClick={onExport}
            >
              Exportar CSV
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {finalSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {/* Section Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                {section.icon}
                <h3 className="font-medium text-gray-900">{section.title}</h3>
              </div>

              {/* Section Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getTypeIcon(item.type)}
                          <span className="text-sm font-medium text-gray-600">
                            {item.label}
                          </span>
                        </div>
                        <div className={`text-xl ${getTypeStyles(item.type)}`}>
                          {formatValue(item.value, item.precision)}
                          {item.unit && (
                            <span className="text-sm text-gray-500 ml-1">
                              {item.unit}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Los resultados están basados en teoría clásica de análisis estructural.
            Verifique las condiciones de aplicabilidad para su caso específico.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Función helper para convertir resultados directos a formato de secciones
function convertResultsToSections(results: Record<string, any>): ResultSection[] {
  const sections: ResultSection[] = [];
  
  // Crear sección de resultados generales
  const items: ResultItem[] = [];
  
  Object.entries(results).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      // Manejar objetos anidados
      Object.entries(value).forEach(([subKey, subValue]) => {
        items.push({
          label: `${formatKey(key)} - ${formatKey(subKey)}`,
          value: subValue as number | string,
          type: 'primary'
        });
      });
    } else {
      items.push({
        label: formatKey(key),
        value: value as number | string,
        type: 'primary'
      });
    }
  });

  if (items.length > 0) {
    sections.push({
      title: "Resultados del Cálculo",
      icon: <BarChart3 className="h-4 w-4 text-blue-500" />,
      items
    });
  }

  return sections;
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

// Utility functions para tipos comunes de resultados
export const createResultSection = (
  title: string,
  items: Omit<ResultItem, 'type'>[],
  type: ResultItem['type'] = 'primary',
  icon?: React.ReactNode
): ResultSection => ({
  title,
  icon,
  items: items.map(item => ({ ...item, type }))
});

export const createReactionResults = (reactions: { left: number; right: number }): ResultSection => 
  createResultSection(
    "Reacciones en los Apoyos",
    [
      { label: "Reacción Izquierda", value: reactions.left, unit: "kN" },
      { label: "Reacción Derecha", value: reactions.right, unit: "kN" }
    ],
    'primary',
    <TrendingUp className="h-4 w-4 text-green-500" />
  );

export const createMomentResults = (maxMoment: number, location?: number): ResultSection =>
  createResultSection(
    "Momentos Flectores",
    [
      { label: "Momento Máximo", value: maxMoment, unit: "kNm" },
      ...(location !== undefined ? [{ label: "Ubicación", value: location, unit: "m" }] : [])
    ],
    'primary',
    <Activity className="h-4 w-4 text-blue-500" />
  );

export const createDeflectionResults = (maxDeflection: number, location?: number): ResultSection =>
  createResultSection(
    "Deflexiones",
    [
      { label: "Deflexión Máxima", value: maxDeflection, unit: "mm" },
      ...(location !== undefined ? [{ label: "Ubicación", value: location, unit: "m" }] : [])
    ],
    'secondary',
    <BarChart3 className="h-4 w-4 text-purple-500" />
  ); 