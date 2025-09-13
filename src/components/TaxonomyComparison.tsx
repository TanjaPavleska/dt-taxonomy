import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { TaxonomyRules } from '@/taxonomy_rules';
import type { SavedTaxonomy } from '@/taxonomyStorage';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface TaxonomyComparisonProps {
  onClose?: () => void;
}

const TaxonomyComparison: React.FC<TaxonomyComparisonProps> = ({ onClose }) => {
  const [savedTaxonomies, setSavedTaxonomies] = useState<SavedTaxonomy[]>([]);
  const [selectedTaxonomies, setSelectedTaxonomies] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<Array<{dimension: string; [key: string]: number | string}>>([]);

  useEffect(() => {
    // Load saved taxonomies from storage
    const taxonomies = getSavedTaxonomies();
    setSavedTaxonomies(taxonomies);
  }, []);

  const getSavedTaxonomies = (): SavedTaxonomy[] => {
    try {
      const stored = localStorage.getItem('dt-taxonomy-saved-items');
      if (!stored) return [];

      const items = JSON.parse(stored);
      return items.map((item: {savedAt: string | Date; updatedAt: string | Date; [key: string]: any}) => ({
        ...item,
        savedAt: new Date(item.savedAt),
        updatedAt: new Date(item.updatedAt),
      }));
    } catch {
      console.error('Error loading saved taxonomies');
      return [];
    }
  };

  const generateComparisonData = useCallback(() => {
    const selectedItems = savedTaxonomies.filter(t => selectedTaxonomies.includes(t.id));

    // Create radar chart data with all dimensions
    const dimensions = [
      'dataLink', 'functionalRole', 'synchronizationFrequency', 'intelligenceLevel',
      'modelGranularity', 'dataArchitecture', 'interfaceTypes', 'lifecyclePositioning',
      'applicationDomain', 'cyberPhysicalSecurityIntegration'
    ];

    const data = dimensions.map(dimension => {
      const dataPoint: {dimension: string; [key: string]: number | string} = { dimension: formatDimensionName(dimension) };

      selectedItems.forEach((item, index) => {
        // Calculate score for this dimension using TaxonomyRules
        const score = calculateDimensionScore(item.taxonomy, dimension);
        dataPoint[`taxonomy${index + 1}`] = score;
        dataPoint[`name${index + 1}`] = item.title;
      });

      return dataPoint;
    });

    setComparisonData(data);
  }, [savedTaxonomies, selectedTaxonomies]);

  useEffect(() => {
    if (selectedTaxonomies.length >= 2) {
      generateComparisonData();
    } else {
      setComparisonData([]);
    }
  }, [selectedTaxonomies, savedTaxonomies, generateComparisonData]);

  const calculateDimensionScore = (taxonomy: import('@/taxonomy').Taxonomy, dimension: string): number => {
    // Simplified scoring logic based on TaxonomyRules
    const rules = new TaxonomyRules();
    try {
      // Create a temporary result to get dimension scores
      const result = rules.transformTaxonomyToResult(taxonomy);
      return result.dimensionScores[dimension] || 0;
    } catch {
      return 0;
    }
  };


  const formatDimensionName = (dimension: string): string => {
    return dimension
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
      .replace(/\s+/g, ' ');
  };

  const toggleTaxonomySelection = (id: string) => {
    setSelectedTaxonomies(prev => {
      if (prev.includes(id)) {
        return prev.filter(taxId => taxId !== id);
      } else if (prev.length < 5) { // Limit to 5 taxonomies for comparison
        return [...prev, id];
      }
      return prev;
    });
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const selectedItems = savedTaxonomies.filter(t => selectedTaxonomies.includes(t.id));

  // Custom tooltip for comparison radar chart
  const ComparisonTooltip = ({ active, payload, label }: {active?: boolean; payload?: Array<{name: string; value: number; color: string}>; label?: string}) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{Math.round(entry.value)}/100</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend component for better layout control
  const CustomLegend = () => {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Legend</h4>
        <div className={`${
          selectedItems.length <= 2
            ? 'flex flex-wrap justify-center gap-4'
            : selectedItems.length <= 3
            ? 'flex flex-wrap justify-center gap-3'
            : 'grid grid-cols-1 sm:grid-cols-2 gap-3'
        }`}>
          {selectedItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center space-x-3 p-3 bg-white rounded-md shadow-sm border ${
                selectedItems.length > 3 ? 'min-w-0' : ''
              }`}
            >
              <div
                className="w-4 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: getRadarColor(index) }}
              />
              <span
                className={`${
                  selectedItems.length <= 3 ? 'text-sm' : 'text-xs'
                } text-gray-700 font-medium ${
                  selectedItems.length > 3 ? 'truncate' : ''
                }`}
                title={item.title}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Taxonomy Comparison</h1>
            <p className="text-gray-600 mt-2">
              Compare saved taxonomies using heat maps and radar charts
            </p>
          </div>
          {onClose && (
            <Button onClick={onClose} variant="outline">
              Back to Form
            </Button>
          )}
        </div>

        {/* Taxonomy Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Taxonomies to Compare</CardTitle>
            <p className="text-sm text-gray-600">
              Choose 2-5 taxonomies to compare. Selected: {selectedTaxonomies.length}/5
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedTaxonomies.map(taxonomy => (
                <div
                  key={taxonomy.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTaxonomies.includes(taxonomy.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleTaxonomySelection(taxonomy.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{taxonomy.title}</h3>
                      {taxonomy.description && (
                        <p className="text-sm text-gray-600 mt-1">{taxonomy.description}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Saved: {taxonomy.savedAt.toLocaleDateString()}
                      </p>
                    </div>
                    {selectedTaxonomies.includes(taxonomy.id) && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {savedTaxonomies.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No saved taxonomies found. Save some taxonomies first to enable comparison.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comparison Results */}
        {selectedTaxonomies.length >= 2 && (
          <div className="space-y-6">
            {/* Radar Chart - Full width for better visibility */}
            <Card>
              <CardHeader>
                <CardTitle>Radar Chart Comparison</CardTitle>
                <p className="text-sm text-gray-600">
                  Visual comparison of maturity scores across all dimensions
                </p>
              </CardHeader>
              <CardContent>
                {/* Calculate dynamic height based on number of selected items and screen size */}
                <div className={`w-full ${
                  selectedItems.length <= 2
                    ? 'h-[450px] sm:h-[500px]'
                    : selectedItems.length <= 3
                    ? 'h-[500px] sm:h-[550px]'
                    : 'h-[550px] sm:h-[600px]'
                }`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      data={comparisonData}
                      margin={{
                        top: 20,
                        right: 30,
                        bottom: 40, // Reduced bottom margin since legend is outside
                        left: 30
                      }}
                    >
                      <PolarGrid gridType="polygon" className="stroke-gray-200" />
                      <PolarAngleAxis
                        dataKey="dimension"
                        tick={{ fontSize: 11, fill: '#374151' }}
                        className="text-gray-700"
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fontSize: 10, fill: '#6B7280' }}
                        tickCount={6}
                        className="text-gray-500"
                      />

                      {selectedItems.map((item, index) => (
                        <Radar
                          key={item.id}
                          name={item.title}
                          dataKey={`taxonomy${index + 1}`}
                          stroke={getRadarColor(index)}
                          fill={getRadarColor(index)}
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      ))}

                      <Tooltip content={<ComparisonTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Custom Legend */}
                <CustomLegend />
              </CardContent>
            </Card>

            {/* Heat Map */}
            <Card>
              <CardHeader>
                <CardTitle>Heat Map</CardTitle>
                <p className="text-sm text-gray-600">
                  Color-coded comparison of dimension scores
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left p-2 font-medium text-gray-700">Dimension</th>
                        {selectedItems.map(item => (
                          <th key={item.id} className="text-left p-2 font-medium text-gray-700">
                            {item.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="p-2 font-medium text-gray-900">{row.dimension}</td>
                          {selectedItems.map((item, itemIndex) => {
                            const score = row[`taxonomy${itemIndex + 1}`] || 0;
                            return (
                              <td key={item.id} className="p-2">
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`w-16 h-6 rounded flex items-center justify-center text-white text-xs font-medium ${getScoreColor(Number(score))}`}
                                  >
                                    {Math.round(Number(score))}
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Excellent (80-100)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Good (60-79)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span>Fair (40-59)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Needs Improvement (0-39)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTaxonomies.length === 1 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Select at least 2 taxonomies to compare</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const getRadarColor = (index: number): string => {
  const colors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Amber
    '#8B5CF6'  // Purple
  ];
  return colors[index % colors.length];
};

export default TaxonomyComparison;