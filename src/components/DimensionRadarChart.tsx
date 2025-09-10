import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

interface DimensionRadarChartProps {
  dimensionScores: Record<string, number>;
}

const DimensionRadarChart: React.FC<DimensionRadarChartProps> = ({ dimensionScores }) => {
  // Transform dimension scores into radar chart data
  const radarData = Object.entries(dimensionScores).map(([dimension, score]) => ({
    dimension: formatDimensionName(dimension),
    score: Math.round(score),
    fullValue: 100, // Reference line for maximum score
  }));

  // Helper function to format dimension names for better display
  function formatDimensionName(dimension: string): string {
    return dimension
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim()
      .replace(/\s+/g, ' '); // Remove extra spaces
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">
            Score: <span className="font-bold">{payload[0].value}/100</span>
          </p>
          <div className="mt-1">
            <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              payload[0].value >= 80 ? 'bg-green-100 text-green-800' :
              payload[0].value >= 60 ? 'bg-yellow-100 text-yellow-800' :
              payload[0].value >= 40 ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {payload[0].value >= 80 ? 'Excellent' :
               payload[0].value >= 60 ? 'Good' :
               payload[0].value >= 40 ? 'Fair' : 'Needs Improvement'}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid
            gridType="polygon"
            className="stroke-gray-200"
          />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{
              fontSize: 11,
              fill: '#374151',
              textAnchor: 'middle'
            }}
            className="text-gray-700"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{
              fontSize: 10,
              fill: '#6B7280'
            }}
            tickCount={6}
            className="text-gray-500"
          />
          <Radar
            name="Maturity Score"
            dataKey="score"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: '#3B82F6',
              strokeWidth: 2,
              stroke: '#ffffff'
            }}
          />
          <Radar
            name="Maximum Possible"
            dataKey="fullValue"
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '12px'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DimensionRadarChart;
