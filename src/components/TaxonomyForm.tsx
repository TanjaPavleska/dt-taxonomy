import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Button } from './ui/button';
import {
  Taxonomy,
  Result,
  DataLink,
  FunctionalRole,
  SynchronizationFrequency,
  IntelligenceLevel,
  ModelGranularity,
  DataArchitecture,
  InterfaceTypes,
  LifecyclePositioning,
  ApplicationDomain,
  CyberPhysicalSecurityIntegration,
  RecommendationPriority,
} from '../taxonomy';
import { TaxonomyRules } from '@/taxonomy_rules';



const TaxonomyForm: React.FC = () => {
  const [taxonomy, setTaxonomy] = useState(new Taxonomy());
  const [showResult, setShowResult] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<Result | null>(null);

  // Radio button handlers
  const handleDataLinkChange = (value: string) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.dataLink = value as typeof DataLink[keyof typeof DataLink];
      return newTaxonomy;
    });
  };

  const handleSynchronizationFrequencyChange = (value: string) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.synchronizationFrequency = value as typeof SynchronizationFrequency[keyof typeof SynchronizationFrequency];
      return newTaxonomy;
    });
  };

  const handleIntelligenceLevelChange = (value: string) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.intelligenceLevel = value as typeof IntelligenceLevel[keyof typeof IntelligenceLevel];
      return newTaxonomy;
    });
  };

  const handleModelGranularityChange = (value: string) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.modelGranularity = value as typeof ModelGranularity[keyof typeof ModelGranularity];
      return newTaxonomy;
    });
  };

  const handleDataArchitectureChange = (value: string) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.dataArchitecture = value as typeof DataArchitecture[keyof typeof DataArchitecture];
      return newTaxonomy;
    });
  };

  const handleLifecyclePositioningChange = (value: string) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.lifecyclePositioning = value as typeof LifecyclePositioning[keyof typeof LifecyclePositioning];
      return newTaxonomy;
    });
  };

  // Checkbox handlers (multiple choice)
  const handleFunctionalRoleChange = (value: string, checked: boolean) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.functionalRole = checked
        ? [...prev.functionalRole, value as typeof FunctionalRole[keyof typeof FunctionalRole]]
        : prev.functionalRole.filter(role => role !== value);
      return newTaxonomy;
    });
  };

  const handleInterfaceTypesChange = (value: string, checked: boolean) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.interfaceTypes = checked
        ? [...prev.interfaceTypes, value as typeof InterfaceTypes[keyof typeof InterfaceTypes]]
        : prev.interfaceTypes.filter(type => type !== value);
      return newTaxonomy;
    });
  };

  const handleApplicationDomainChange = (value: string, checked: boolean) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.applicationDomain = checked
        ? [...prev.applicationDomain, value as typeof ApplicationDomain[keyof typeof ApplicationDomain]]
        : prev.applicationDomain.filter(domain => domain !== value);
      return newTaxonomy;
    });
  };

  const handleCyberPhysicalSecurityChange = (value: string, checked: boolean) => {
    setTaxonomy(prev => {
      const newTaxonomy = Object.assign(Object.create(Object.getPrototypeOf(prev)), prev);
      newTaxonomy.cyberPhysicalSecurityIntegration = checked
        ? [...prev.cyberPhysicalSecurityIntegration, value as typeof CyberPhysicalSecurityIntegration[keyof typeof CyberPhysicalSecurityIntegration]]
        : prev.cyberPhysicalSecurityIntegration.filter(security => security !== value);
      return newTaxonomy;
    });
  };

  const handleSubmit = () => {
    const rules = new TaxonomyRules();
    const result = rules.transformTaxonomyToResult(taxonomy);
    setAnalysisResult(result);
    setShowResult(true);
  };

  const handleReset = () => {
    setTaxonomy(new Taxonomy());
    setShowResult(false);
    setAnalysisResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Digital Twin Taxonomy Classifier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">

          {/* Data Link - Radio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Data Link</h3>
            <RadioGroup value={taxonomy.dataLink || ''} onValueChange={handleDataLinkChange}>
              {Object.entries(DataLink).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`datalink-${key}`} />
                  <Label htmlFor={`datalink-${key}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Functional Role - Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Functional Role (Multiple Choice)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(FunctionalRole).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`functionalrole-${key}`}
                    checked={taxonomy.functionalRole.includes(value)}
                    onCheckedChange={(checked) => handleFunctionalRoleChange(value, checked as boolean)}
                  />
                  <Label htmlFor={`functionalrole-${key}`} className="text-sm">{value}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Synchronization Frequency - Radio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Synchronization Frequency</h3>
            <RadioGroup value={taxonomy.synchronizationFrequency || ''} onValueChange={handleSynchronizationFrequencyChange}>
              {Object.entries(SynchronizationFrequency).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`syncfreq-${key}`} />
                  <Label htmlFor={`syncfreq-${key}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Intelligence Level - Radio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Intelligence Level</h3>
            <RadioGroup value={taxonomy.intelligenceLevel || ''} onValueChange={handleIntelligenceLevelChange}>
              {Object.entries(IntelligenceLevel).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`intelligence-${key}`} />
                  <Label htmlFor={`intelligence-${key}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Model Granularity - Radio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Model Granularity</h3>
            <RadioGroup value={taxonomy.modelGranularity || ''} onValueChange={handleModelGranularityChange}>
              {Object.entries(ModelGranularity).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`granularity-${key}`} />
                  <Label htmlFor={`granularity-${key}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Data Architecture - Radio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Data Architecture</h3>
            <RadioGroup value={taxonomy.dataArchitecture || ''} onValueChange={handleDataArchitectureChange}>
              {Object.entries(DataArchitecture).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`dataarch-${key}`} />
                  <Label htmlFor={`dataarch-${key}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Interface Types - Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Interface Types (Multiple Choice)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(InterfaceTypes).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interface-${key}`}
                    checked={taxonomy.interfaceTypes.includes(value)}
                    onCheckedChange={(checked) => handleInterfaceTypesChange(value, checked as boolean)}
                  />
                  <Label htmlFor={`interface-${key}`} className="text-sm">{value}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Lifecycle Positioning - Radio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lifecycle Positioning</h3>
            <RadioGroup value={taxonomy.lifecyclePositioning || ''} onValueChange={handleLifecyclePositioningChange}>
              {Object.entries(LifecyclePositioning).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`lifecycle-${key}`} />
                  <Label htmlFor={`lifecycle-${key}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Application Domain - Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Application Domain (Multiple Choice)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(ApplicationDomain).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`appdomain-${key}`}
                    checked={taxonomy.applicationDomain.includes(value)}
                    onCheckedChange={(checked) => handleApplicationDomainChange(value, checked as boolean)}
                  />
                  <Label htmlFor={`appdomain-${key}`} className="text-sm">{value}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Cyber-Physical Security Integration - Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cyber-Physical Security Integration (Multiple Choice)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(CyberPhysicalSecurityIntegration).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cybersecurity-${key}`}
                    checked={taxonomy.cyberPhysicalSecurityIntegration.includes(value)}
                    onCheckedChange={(checked) => handleCyberPhysicalSecurityChange(value, checked as boolean)}
                  />
                  <Label htmlFor={`cybersecurity-${key}`} className="text-sm">{value}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button onClick={handleSubmit} className="flex-1">
              Generate Taxonomy Result
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset Form
            </Button>
          </div>

          {/* Results */}
          {showResult && analysisResult && (
            <div className="space-y-6">
              {/* Overview Card */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Digital Twin Analysis Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{analysisResult.overallMaturityScore.toFixed(1)}/100</div>
                      <div className="text-sm text-gray-600">Overall Maturity Score</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{analysisResult.getCriticalRecommendations().length}</div>
                      <div className="text-sm text-gray-600">Critical Issues</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{analysisResult.improvements.length}</div>
                      <div className="text-sm text-gray-600">Improvement Opportunities</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{analysisResult.summary}</p>
                </CardContent>
              </Card>

              {/* Dimension Scores */}
              <Card>
                <CardHeader>
                  <CardTitle>Dimension Maturity Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(analysisResult.dimensionScores).map(([dimension, score]) => (
                      <div key={dimension} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm font-medium capitalize">{dimension.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                score >= 80 ? 'bg-green-500' :
                                score >= 60 ? 'bg-yellow-500' :
                                score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(score, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold">{score.toFixed(0)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Critical Recommendations */}
              {analysisResult.getCriticalRecommendations().length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">🚨 Critical Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.getCriticalRecommendations().map((rec, index) => (
                        <div key={rec.id} className="border-l-4 border-red-500 pl-4 p-3 bg-red-50 rounded-r-lg">
                          <h4 className="font-semibold text-red-800">{index + 1}. {rec.title}</h4>
                          <p className="text-sm text-gray-700 mt-1">{rec.description}</p>
                          <div className="mt-2 text-xs text-gray-600">
                            <span className="bg-red-100 px-2 py-1 rounded mr-2">{rec.category}</span>
                            <span className="bg-gray-100 px-2 py-1 rounded mr-2">{rec.interventionType}</span>
                            {rec.estimatedCost && <span className="bg-blue-100 px-2 py-1 rounded">{rec.estimatedCost}</span>}
                          </div>
                          {rec.expectedBenefits.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-gray-600">Expected Benefits:</span>
                              <ul className="text-xs text-gray-600 ml-4 list-disc">
                                {rec.expectedBenefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* High Priority Recommendations */}
              {analysisResult.getHighPriorityRecommendations().length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600">⚡ High Priority Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.getHighPriorityRecommendations().map((rec, index) => (
                        <div key={rec.id} className="border-l-4 border-orange-500 pl-4 p-3 bg-orange-50 rounded-r-lg">
                          <h4 className="font-semibold text-orange-800">{index + 1}. {rec.title}</h4>
                          <p className="text-sm text-gray-700 mt-1">{rec.description}</p>
                          <div className="mt-2 text-xs text-gray-600">
                            <span className="bg-orange-100 px-2 py-1 rounded mr-2">{rec.category}</span>
                            <span className="bg-gray-100 px-2 py-1 rounded mr-2">{rec.interventionType}</span>
                            {rec.estimatedCost && <span className="bg-blue-100 px-2 py-1 rounded">{rec.estimatedCost}</span>}
                          </div>
                          {rec.expectedBenefits.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-gray-600">Expected Benefits:</span>
                              <ul className="text-xs text-gray-600 ml-4 list-disc">
                                {rec.expectedBenefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Improvements */}
              {analysisResult.improvements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">🎯 Improvement Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.improvements.map((imp, index) => (
                        <div key={imp.id} className="border-l-4 border-blue-500 pl-4 p-3 bg-blue-50 rounded-r-lg">
                          <h4 className="font-semibold text-blue-800">{index + 1}. {imp.title}</h4>
                          <p className="text-sm text-gray-700 mt-1">{imp.description}</p>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="font-medium text-gray-600">Current State:</span>
                              <span className="ml-1 bg-gray-100 px-2 py-1 rounded">{imp.currentState}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Target State:</span>
                              <span className="ml-1 bg-green-100 px-2 py-1 rounded">{imp.proposedState}</span>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-600">
                            <span className="bg-blue-100 px-2 py-1 rounded mr-2">{imp.targetDimension}</span>
                            <span className="bg-gray-100 px-2 py-1 rounded">{imp.timeframe}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-2 italic">{imp.justification}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* All Other Recommendations */}
              {analysisResult.recommendations.filter(r =>
                r.priority !== RecommendationPriority.Critical &&
                r.priority !== RecommendationPriority.High
              ).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-600">📋 Additional Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.recommendations
                        .filter(r => r.priority !== RecommendationPriority.Critical && r.priority !== RecommendationPriority.High)
                        .map((rec, index) => (
                        <div key={rec.id} className="border-l-4 border-gray-400 pl-4 p-3 bg-gray-50 rounded-r-lg">
                          <h4 className="font-semibold text-gray-800">{index + 1}. {rec.title}</h4>
                          <p className="text-sm text-gray-700 mt-1">{rec.description}</p>
                          <div className="mt-2 text-xs text-gray-600">
                            <span className="bg-gray-200 px-2 py-1 rounded mr-2">{rec.priority}</span>
                            <span className="bg-gray-200 px-2 py-1 rounded mr-2">{rec.category}</span>
                            <span className="bg-gray-200 px-2 py-1 rounded">{rec.interventionType}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* No Issues - Success Message */}
              {analysisResult.recommendations.length === 0 && (
                <Card className="border-green-200">
                  <CardContent className="text-center py-8">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Excellent Digital Twin Configuration!</h3>
                    <p className="text-gray-600">Your digital twin implementation shows high maturity across all dimensions. Consider exploring advanced cognitive capabilities or cutting-edge features.</p>
                  </CardContent>
                </Card>
              )}

              {/* Raw Data Toggle */}
              <Card>
                <CardHeader>
                  <CardTitle>Raw Taxonomy Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <details className="text-sm">
                    <summary className="cursor-pointer font-medium text-gray-600 hover:text-gray-800">
                      Show/Hide Raw JSON Data
                    </summary>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs mt-2">
                      {taxonomy.getSummary()}
                    </pre>
                  </details>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxonomyForm;
