"use client";

import { useEffect, useRef } from 'react';

interface DiagramDisplayProps {
  type: 'vigas' | 'porticos' | 'losas' | 'acero';
  category: string;
  name: string;
  inputs?: Record<string, any>;
  showDimensions?: boolean;
  showLoads?: boolean;
  showResults?: boolean;
  className?: string;
}

export function DiagramDisplay({
  type,
  category,
  name,
  inputs = {},
  showDimensions = true,
  showLoads = true,
  showResults = false,
  className = "w-full h-64"
}: DiagramDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw based on type
    switch (type) {
      case 'vigas':
        drawBeamDiagram(ctx, rect, category, name, inputs, showDimensions, showLoads);
        break;
      case 'porticos':
        drawFrameDiagram(ctx, rect, category, name, inputs, showDimensions, showLoads);
        break;
      case 'losas':
        drawSlabDiagram(ctx, rect, category, name, inputs, showDimensions, showLoads);
        break;
      case 'acero':
        drawSteelDiagram(ctx, rect, category, name, inputs, showDimensions);
        break;
      default:
        drawPlaceholder(ctx, rect);
    }
  }, [type, category, name, inputs, showDimensions, showLoads, showResults]);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxHeight: '400px' }}
      />
    </div>
  );
}

// 🏗️ Viga Drawing Functions
function drawBeamDiagram(
  ctx: CanvasRenderingContext2D,
  rect: DOMRect,
  category: string,
  name: string,
  inputs: any,
  showDimensions: boolean,
  showLoads: boolean
) {
  const { width, height } = rect;
  const centerY = height / 2;
  const beamStart = width * 0.1;
  const beamEnd = width * 0.9;
  const beamLength = beamEnd - beamStart;

  // Draw beam
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(beamStart, centerY);
  ctx.lineTo(beamEnd, centerY);
  ctx.stroke();

  // Draw supports based on category
  if (category.includes('simplemente-apoyadas')) {
    drawPinSupport(ctx, beamStart, centerY);
    drawRollerSupport(ctx, beamEnd, centerY);
  } else if (category.includes('empotrada')) {
    drawFixedSupport(ctx, beamStart, centerY);
    if (category.includes('articulada')) {
      drawPinSupport(ctx, beamEnd, centerY);
    } else {
      drawFixedSupport(ctx, beamEnd, centerY);
    }
  } else if (category.includes('voladizo')) {
    drawFixedSupport(ctx, beamStart, centerY);
  }

  // Draw loads based on name
  if (showLoads) {
    if (name.includes('carga-uniforme')) {
      drawUniformLoad(ctx, beamStart, beamEnd, centerY - 30);
    } else if (name.includes('carga-puntual')) {
      const loadPos = beamStart + beamLength / 2;
      drawPointLoad(ctx, loadPos, centerY - 30);
    }
  }

  // Draw dimensions
  if (showDimensions && inputs.length) {
    drawDimension(ctx, beamStart, beamEnd, centerY + 40, `L = ${inputs.length} m`);
  }
}

// 🏗️ Pórtico Drawing Functions
function drawFrameDiagram(
  ctx: CanvasRenderingContext2D,
  rect: DOMRect,
  category: string,
  name: string,
  inputs: any,
  showDimensions: boolean,
  showLoads: boolean
) {
  const { width, height } = rect;
  const baseY = height * 0.8;
  const topY = height * 0.2;
  const leftX = width * 0.2;
  const rightX = width * 0.8;

  // Draw frame
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 3;
  
  // Left column
  ctx.beginPath();
  ctx.moveTo(leftX, baseY);
  ctx.lineTo(leftX, topY);
  ctx.stroke();

  // Right column (if 3-bar frame)
  if (category.includes('tres-barras')) {
    ctx.beginPath();
    ctx.moveTo(rightX, baseY);
    ctx.lineTo(rightX, topY);
    ctx.stroke();

    // Beam
    ctx.beginPath();
    ctx.moveTo(leftX, topY);
    ctx.lineTo(rightX, topY);
    ctx.stroke();
  }

  // Draw supports
  if (category.includes('pin')) {
    drawPinSupport(ctx, leftX, baseY);
    if (category.includes('roller')) {
      drawRollerSupport(ctx, rightX, baseY);
    } else {
      drawPinSupport(ctx, rightX, baseY);
    }
  } else if (category.includes('fixed')) {
    drawFixedSupport(ctx, leftX, baseY);
    if (!category.includes('free')) {
      drawFixedSupport(ctx, rightX, baseY);
    }
  }

  // Draw loads
  if (showLoads && name.includes('carga-puntual')) {
    if (name.includes('central')) {
      const centerX = (leftX + rightX) / 2;
      drawPointLoad(ctx, centerX, topY - 30);
    }
  }
}

// 🧱 Losa Drawing Functions
function drawSlabDiagram(
  ctx: CanvasRenderingContext2D,
  rect: DOMRect,
  category: string,
  name: string,
  inputs: any,
  showDimensions: boolean,
  showLoads: boolean
) {
  const { width, height } = rect;
  const slabLeft = width * 0.2;
  const slabRight = width * 0.8;
  const slabTop = height * 0.25;
  const slabBottom = height * 0.75;

  // Draw slab outline
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 2;
  ctx.strokeRect(slabLeft, slabTop, slabRight - slabLeft, slabBottom - slabTop);

  // Parse boundary conditions from name (e.g., "aaaa", "eeee")
  if (name.includes('aaaa')) {
    // All simply supported
    drawSlabSupports(ctx, slabLeft, slabRight, slabTop, slabBottom, 'AAAA');
  } else if (name.includes('eeee')) {
    // All fixed
    drawSlabSupports(ctx, slabLeft, slabRight, slabTop, slabBottom, 'EEEE');
  }

  // Draw load pattern
  if (showLoads) {
    if (category.includes('carga-uniforme')) {
      drawSlabUniformLoad(ctx, slabLeft, slabRight, slabTop, slabBottom);
    } else if (category.includes('carga-puntual')) {
      const centerX = (slabLeft + slabRight) / 2;
      const centerY = (slabTop + slabBottom) / 2;
      drawPointLoad(ctx, centerX, centerY - 20);
    }
  }
}

// 🔩 Acero Drawing Functions
function drawSteelDiagram(
  ctx: CanvasRenderingContext2D,
  rect: DOMRect,
  category: string,
  name: string,
  inputs: any,
  showDimensions: boolean
) {
  const { width, height } = rect;
  const centerY = height / 2;
  const startX = width * 0.1;
  const endX = width * 0.9;

  // Draw rebar representation
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 6;
  for (let i = 0; i < 5; i++) {
    const x = startX + (i * (endX - startX) / 4);
    ctx.beginPath();
    ctx.moveTo(x, centerY - 20);
    ctx.lineTo(x, centerY + 20);
    ctx.stroke();

    // Draw rebar circles
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.arc(x, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Add diameter labels
  if (showDimensions && inputs.diameter) {
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Ø${inputs.diameter}mm`, width / 2, centerY + 40);
  }
}

// 🎨 Support Drawing Functions
function drawPinSupport(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#374151';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - 10, y + 15);
  ctx.lineTo(x + 10, y + 15);
  ctx.closePath();
  ctx.fill();
}

function drawRollerSupport(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Triangle
  drawPinSupport(ctx, x, y);
  
  // Roller circles
  ctx.fillStyle = '#374151';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(x - 6 + i * 6, y + 20, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function drawFixedSupport(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#374151';
  ctx.fillRect(x - 8, y, 16, 15);
  
  // Hatch marks
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x - 8 + i * 4, y + 15);
    ctx.lineTo(x - 5 + i * 4, y + 20);
    ctx.stroke();
  }
}

// 📏 Load Drawing Functions
function drawUniformLoad(ctx: CanvasRenderingContext2D, startX: number, endX: number, y: number) {
  const arrowSpacing = 20;
  const arrowCount = Math.floor((endX - startX) / arrowSpacing);
  
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 2;
  
  for (let i = 0; i <= arrowCount; i++) {
    const x = startX + (i * (endX - startX) / arrowCount);
    drawArrow(ctx, x, y, x, y + 25, '#EF4444');
  }
  
  // Load distribution line
  ctx.beginPath();
  ctx.moveTo(startX, y);
  ctx.lineTo(endX, y);
  ctx.stroke();
}

function drawPointLoad(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawArrow(ctx, x, y, x, y + 30, '#EF4444', 3);
}

function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string, lineWidth = 2) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  
  // Line
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  
  // Arrowhead
  const headLength = 8;
  const angle = Math.atan2(toY - fromY, toX - fromX);
  
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
}

function drawDimension(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, label: string) {
  ctx.strokeStyle = '#6B7280';
  ctx.lineWidth = 1;
  
  // Dimension line
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
  
  // Extension lines
  ctx.beginPath();
  ctx.moveTo(x1, y - 5);
  ctx.lineTo(x1, y + 5);
  ctx.moveTo(x2, y - 5);
  ctx.lineTo(x2, y + 5);
  ctx.stroke();
  
  // Label
  ctx.fillStyle = '#6B7280';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, (x1 + x2) / 2, y - 10);
}

function drawSlabSupports(ctx: CanvasRenderingContext2D, left: number, right: number, top: number, bottom: number, pattern: string) {
  const [leftEdge, topEdge, rightEdge, bottomEdge] = pattern.split('');
  
  // Support symbols based on pattern
  // A = Simply supported, E = Fixed, L = Free, P = Point support
  
  if (leftEdge === 'A') {
    // Left edge simply supported
    for (let i = 0; i < 5; i++) {
      const y = top + (i * (bottom - top) / 4);
      drawPinSupport(ctx, left - 10, y);
    }
  } else if (leftEdge === 'E') {
    // Left edge fixed
    ctx.fillStyle = '#374151';
    ctx.fillRect(left - 15, top, 10, bottom - top);
  }
  
  // Similar for other edges...
}

function drawSlabUniformLoad(ctx: CanvasRenderingContext2D, left: number, right: number, top: number, bottom: number) {
  const spacing = 30;
  const rows = Math.floor((bottom - top) / spacing);
  const cols = Math.floor((right - left) / spacing);
  
  ctx.fillStyle = '#EF4444';
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      const x = left + (j * (right - left) / cols);
      const y = top + (i * (bottom - top) / rows);
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

function drawPlaceholder(ctx: CanvasRenderingContext2D, rect: DOMRect) {
  ctx.fillStyle = '#F3F4F6';
  ctx.fillRect(0, 0, rect.width, rect.height);
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Diagrama en desarrollo', rect.width / 2, rect.height / 2);
} 