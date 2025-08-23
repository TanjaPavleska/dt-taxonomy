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

