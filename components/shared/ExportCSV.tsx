"use client";

import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

interface ExportCSVProps {
  data: Record<string, any>;
  filename?: string;
  title?: string;
  className?: string;
}

export function ExportCSV({ 
  data, 
  filename = 'calculadora-resultados', 
  title = 'Exportar CSV',
  className = '' 
}: ExportCSVProps) {
  
  const handleExport = () => {
    try {
      // Convert data to CSV format
      const csvData = convertToCSV(data);
      
      // Create blob and download
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
    <Button 
      onClick={handleExport}
      variant="outline"
      size="sm"
      className={className}
    >
      <FileDown className="h-4 w-4 mr-2" />
      {title}
    </Button>
  );
}

// Helper function to convert object to CSV
function convertToCSV(data: Record<string, any>): string {
  const headers = ['Parámetro', 'Valor', 'Unidad'];
  const rows = [];

  // Add headers
  rows.push(headers.join(','));

  // Add data rows
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      // Handle nested objects
      Object.entries(value).forEach(([subKey, subValue]) => {
        const formattedKey = `${formatKey(key)} - ${formatKey(subKey)}`;
        rows.push([formattedKey, formatValue(subValue), ''].join(','));
      });
    } else {
      rows.push([formatKey(key), formatValue(value), ''].join(','));
    }
  });

  return rows.join('\n');
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

function formatValue(value: any): string {
  if (typeof value === 'number') {
    return value.toFixed(3);
  }
  return String(value);
} 