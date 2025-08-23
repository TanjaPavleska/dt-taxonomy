export const DataLink = {
  OneDirectional: 'One-directional',
  BiDirectional: 'Bi-directional',
  ClosedLoopActuation: 'Closed-loop actuation',
} as const;

export const FunctionalRole = {
  MonitoringAndVisualization: 'Monitoring and Visualization',
  PredictiveAnalysisAndForecasting: 'Predictive Analysis and Forecasting',
  OperationalControl: 'Operational Control',
  StrategicDecisionSupport: 'Strategic Decision Support',
  CybersecurityAndThreatDetection: 'Cybersecurity and Threat Detection',
} as const;

export const SynchronizationFrequency = {
  RealTime: 'Real-time',
  NearRealTime: 'Near real-time',
  BatchUpdates: 'Batch updates',
  Asynchronous: 'Asynchronous',
} as const;

export const IntelligenceLevel = {
  StaticModel: 'Static Model',
  DataDrivenAdaptiveModel: 'Data-driven adaptive model',
  SelfLearningDT: 'Self-learning DT',
  CognitiveDT: 'Cognitive DT',
} as const;

export const ModelGranularity = {
  ComponentLevel: 'Component-level',
  SystemLevel: 'System-level',
  EnterpriseLevel: 'Enterprise-level',
  MultiLayered: 'Multi-layered',
} as const;

export const DataArchitecture = {
  EdgeBasedProcessing: 'Edge-based processing',
  CloudIntegratedDT: 'Cloud-integrated DT',
  FederatedDTArchitecture: 'Federated DT architecture',
  BlockchainEnabledDataGovernance: 'Blockchain-enabled data governance',
} as const;

export const InterfaceTypes = {
  HumanMachine: 'Human-machine',
  MachineMachine: 'Machine-machine',
  MultiAgentInteraction: 'Multi-agent interaction',
} as const;

export const LifecyclePositioning = {
  DTBeforePhysical: 'DT-before physical',
  SimultaneousDevelopment: 'Simultaneous development',
  DTAfterPhysical: 'DT-after physical',
  LifecycleIntegratedDT: 'Lifecycle-integrated DT',
} as const;

export const ApplicationDomain = {
  Generation: 'Generation',
  Transmission: 'Transmission',
  Distribution: 'Distribution',
  MicrogridDERIntegration: 'Microgrid/DER integration',
  DemandResponse: 'Demand response',
  EnergyMarketModeling: 'Energy market modeling',
} as const;

export const CyberPhysicalSecurityIntegration = {
  PassiveMonitoring: 'Passive monitoring',
  ActiveDefence: 'Active defence',
  ResilienceTestingAndRecoveryPlanning: 'Resilience testing & recovery planning',
} as const;

// Type definitions for better TypeScript support
export type DataLink = typeof DataLink[keyof typeof DataLink];
export type FunctionalRole = typeof FunctionalRole[keyof typeof FunctionalRole];
export type SynchronizationFrequency = typeof SynchronizationFrequency[keyof typeof SynchronizationFrequency];
export type IntelligenceLevel = typeof IntelligenceLevel[keyof typeof IntelligenceLevel];
export type ModelGranularity = typeof ModelGranularity[keyof typeof ModelGranularity];
export type DataArchitecture = typeof DataArchitecture[keyof typeof DataArchitecture];
export type InterfaceTypes = typeof InterfaceTypes[keyof typeof InterfaceTypes];
export type LifecyclePositioning = typeof LifecyclePositioning[keyof typeof LifecyclePositioning];
export type ApplicationDomain = typeof ApplicationDomain[keyof typeof ApplicationDomain];
export type CyberPhysicalSecurityIntegration = typeof CyberPhysicalSecurityIntegration[keyof typeof CyberPhysicalSecurityIntegration];

// Multiple choice: Functional Role, Interface Types, Application Domain and Cyber-Physical Security Integration

export class Taxonomy {
  dataLink?: DataLink;
  functionalRole: FunctionalRole[] = [];
  synchronizationFrequency?: SynchronizationFrequency;
  intelligenceLevel?: IntelligenceLevel;
  modelGranularity?: ModelGranularity;
  dataArchitecture?: DataArchitecture;
  interfaceTypes: InterfaceTypes[] = [];
  lifecyclePositioning?: LifecyclePositioning;
  applicationDomain: ApplicationDomain[] = [];
  cyberPhysicalSecurityIntegration: CyberPhysicalSecurityIntegration[] = [];

  constructor() {}

  // Utility method to get a summary of the taxonomy
  getSummary(): string {
    return JSON.stringify({
      dataLink: this.dataLink,
      functionalRole: this.functionalRole,
      synchronizationFrequency: this.synchronizationFrequency,
      intelligenceLevel: this.intelligenceLevel,
      modelGranularity: this.modelGranularity,
      dataArchitecture: this.dataArchitecture,
      interfaceTypes: this.interfaceTypes,
      lifecyclePositioning: this.lifecyclePositioning,
      applicationDomain: this.applicationDomain,
      cyberPhysicalSecurityIntegration: this.cyberPhysicalSecurityIntegration,
    }, null, 2);
  }
}

// Recommendation types and categories
export const RecommendationCategory = {
  Technical: 'Technical',
  Operational: 'Operational',
  Strategic: 'Strategic',
  Security: 'Security',
  Compliance: 'Compliance',
  Investment: 'Investment',
} as const;

export const RecommendationPriority = {
  Critical: 'Critical',
  High: 'High',
  Medium: 'Medium',
  Low: 'Low',
} as const;

export const InterventionType = {
  Immediate: 'Immediate',
  ShortTerm: 'Short-term',
  MidTerm: 'Mid-term',
  LongTerm: 'Long-term',
} as const;

export type RecommendationCategory = typeof RecommendationCategory[keyof typeof RecommendationCategory];
export type RecommendationPriority = typeof RecommendationPriority[keyof typeof RecommendationPriority];
export type InterventionType = typeof InterventionType[keyof typeof InterventionType];

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: RecommendationCategory;
  priority: RecommendationPriority;
  interventionType: InterventionType;
  estimatedCost?: string;
  expectedBenefits: string[];
  implementationSteps: string[];
  riskFactors: string[];
  relatedDimensions: string[];
  feasibilityScore: number; // 0-100
  impactScore: number; // 0-100
}

export interface Improvement {
  id: string;
  title: string;
  description: string;
  targetDimension: string;
  currentState: string;
  proposedState: string;
  justification: string;
  prerequisites: string[];
  successMetrics: string[];
  timeframe: InterventionType;
}

export class Result {
  recommendations: Recommendation[] = [];
  improvements: Improvement[] = [];
  overallMaturityScore: number = 0;
  dimensionScores: { [dimension: string]: number } = {};
  summary: string = '';
  generatedAt: Date;

  constructor() {
    this.generatedAt = new Date();
  }

  addRecommendation(recommendation: Recommendation): void {
    this.recommendations.push(recommendation);
  }

  addImprovement(improvement: Improvement): void {
    this.improvements.push(improvement);
  }

  getRecommendationsByCategory(category: RecommendationCategory): Recommendation[] {
    return this.recommendations.filter(r => r.category === category);
  }

  getRecommendationsByPriority(priority: RecommendationPriority): Recommendation[] {
    return this.recommendations.filter(r => r.priority === priority);
  }

  getCriticalRecommendations(): Recommendation[] {
    return this.getRecommendationsByPriority(RecommendationPriority.Critical);
  }

  getHighPriorityRecommendations(): Recommendation[] {
    return this.getRecommendationsByPriority(RecommendationPriority.High);
  }

  getSortedRecommendations(): Recommendation[] {
    const priorityOrder = {
      [RecommendationPriority.Critical]: 4,
      [RecommendationPriority.High]: 3,
      [RecommendationPriority.Medium]: 2,
      [RecommendationPriority.Low]: 1,
    };

    return this.recommendations.sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.impactScore - a.impactScore;
    });
  }

  getImprovementsByTimeframe(timeframe: InterventionType): Improvement[] {
    return this.improvements.filter(i => i.timeframe === timeframe);
  }

  calculateOverallScore(): number {
    if (Object.keys(this.dimensionScores).length === 0) return 0;

    const scores = Object.values(this.dimensionScores);
    this.overallMaturityScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return this.overallMaturityScore;
  }

  generateSummary(): string {
    const criticalCount = this.getCriticalRecommendations().length;
    const highCount = this.getHighPriorityRecommendations().length;
    const totalRecommendations = this.recommendations.length;
    const totalImprovements = this.improvements.length;

    this.summary = `Digital Twin Taxonomy Analysis Results:
- Overall Maturity Score: ${this.overallMaturityScore.toFixed(1)}/100
- Total Recommendations: ${totalRecommendations} (${criticalCount} Critical, ${highCount} High Priority)
- Total Improvements: ${totalImprovements}
- Analysis completed on: ${this.generatedAt.toLocaleDateString()}`;

    return this.summary;
  }
}

