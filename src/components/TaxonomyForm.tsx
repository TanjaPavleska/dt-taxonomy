import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Button } from './ui/button';
import {
  Taxonomy,
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
} from '../taxonomy';

const TaxonomyForm: React.FC = () => {
  const [taxonomy, setTaxonomy] = useState(new Taxonomy());
  const [showResult, setShowResult] = useState(false);

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
    setShowResult(true);
  };

  const handleReset = () => {
    setTaxonomy(new Taxonomy());
    setShowResult(false);
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
          {showResult && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Taxonomy Classification Result</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                  {taxonomy.getSummary()}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxonomyForm;
