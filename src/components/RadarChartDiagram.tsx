import React from 'react';

interface RadarChartDiagramProps {
  metrics: {
    speed: number;
    accuracy: number;
    endurance: number;
    temperament: number;
    tacticalIQ: number;
    power: number;
  };
  size?: number;
  color?: string;
}

export const RadarChartDiagram: React.FC<RadarChartDiagramProps> = ({
  metrics,
  size = 280,
  color = '#FA4D14',
}) => {
  const center = size / 2;
  const radius = size * 0.38;

  const categories = [
    { name: 'Speed', value: metrics.speed },
    { name: 'Accuracy', value: metrics.accuracy },
    { name: 'Endurance', value: metrics.endurance },
    { name: 'Temperament', value: metrics.temperament },
    { name: 'Tactical IQ', value: metrics.tacticalIQ },
    { name: 'Power', value: metrics.power },
  ];

  const totalAxes = categories.length;

  // Helper to calculate coordinates
  const getCoordinates = (index: number, val: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (val / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points string
  const polygonPoints = categories
    .map((cat, idx) => {
      const { x, y } = getCoordinates(idx, cat.value);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible">
          {/* Background Concentric Radar Rings (20%, 40%, 60%, 80%, 100%) */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, ringIdx) => {
            const ringPoints = categories
              .map((_, idx) => {
                const angle = (Math.PI * 2 / totalAxes) * idx - Math.PI / 2;
                const r = level * radius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <polygon
                key={ringIdx}
                points={ringPoints}
                fill="none"
                stroke="#E5DFD5"
                strokeWidth="1.5"
                strokeDasharray={ringIdx === 4 ? undefined : '3 3'}
              />
            );
          })}

          {/* Radial Axis Spokes */}
          {categories.map((_, idx) => {
            const angle = (Math.PI * 2 / totalAxes) * idx - Math.PI / 2;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);

            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="#D8D0C3"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Filled Skill Polygon Area */}
          <polygon
            points={polygonPoints}
            fill={color}
            fillOpacity="0.25"
            stroke={color}
            strokeWidth="3"
            className="transition-all duration-500"
          />

          {/* Vertex Points & Labels */}
          {categories.map((cat, idx) => {
            const { x, y } = getCoordinates(idx, cat.value);
            const labelAngle = (Math.PI * 2 / totalAxes) * idx - Math.PI / 2;
            const labelRadius = radius + 22;
            const labelX = center + labelRadius * Math.cos(labelAngle);
            const labelY = center + labelRadius * Math.sin(labelAngle);

            return (
              <g key={idx}>
                {/* Vertex Point */}
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#111827"
                  stroke={color}
                  strokeWidth="2"
                />

                {/* Category Label */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-[#111827] text-[10px] font-mono font-bold uppercase"
                >
                  {cat.name} ({cat.value})
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="text-[11px] font-mono text-[#4B5563] text-center font-semibold">
        6-Axis Biomechanical & Performance Radar Chart
      </div>
    </div>
  );
};
