import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

interface CompactRadarChartProps {
  dimensionScores: Record<string, number>;
  size?: 'sm' | 'md' | 'lg';
  showGrid?: boolean;
  showAxes?: boolean;
}

const CompactRadarChart: React.FC<CompactRadarChartProps> = ({
  dimensionScores,
  size = 'md',
  showGrid = true,
  showAxes = false
}) => {
  const heights = {
    sm: 150,
    md: 200,
    lg: 300
  };

  // Transform dimension scores into radar chart data
  const radarData = Object.entries(dimensionScores).map(([dimension, score]) => ({
    dimension: formatDimensionName(dimension),
    score: Math.round(score),
  }));

  function formatDimensionName(dimension: string): string {
    // Create shorter abbreviations for compact view
    const abbreviations: Record<string, string> = {
      'dataLink': 'Data Link',
      'functionalRole': 'Function',
      'synchronizationFrequency': 'Sync Freq',
      'intelligenceLevel': 'Intelligence',
      'modelGranularity': 'Granularity',
      'dataArchitecture': 'Architecture',
      'interfaceTypes': 'Interfaces',
      'lifecyclePositioning': 'Lifecycle',
      'applicationDomain': 'Domain',
      'cyberPhysicalSecurityIntegration': 'Security'
    };

    return abbreviations[dimension] || dimension
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  return (
    <div className="w-full" style={{ height: heights[size] }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          {showGrid && (
            <PolarGrid
              gridType="polygon"
              className="stroke-gray-200"
            />
          )}
          <PolarAngleAxis
            dataKey="dimension"
            tick={showAxes ? {
              fontSize: 9,
              fill: '#6B7280',
              textAnchor: 'middle'
            } : false}
          />
          {showAxes && (
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{
                fontSize: 8,
                fill: '#9CA3AF'
              }}
              tickCount={4}
            />
          )}
          <Radar
            name="Score"
            dataKey="score"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={1.5}
            dot={{
              r: 2,
              fill: '#3B82F6',
              strokeWidth: 1,
              stroke: '#ffffff'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompactRadarChart;
