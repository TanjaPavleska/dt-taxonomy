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
  RecommendationCategory,
} from './taxonomy';
import { TaxonomyRules } from './taxonomy_rules';

// Example usage of the Taxonomy, Result, and TaxonomyRules classes
function demonstrateTaxonomyAnalysis() {
  // Create a sample taxonomy configuration
  const sampleTaxonomy = new Taxonomy();

  // Configure a basic digital twin setup
  sampleTaxonomy.dataLink = DataLink.OneDirectional;
  sampleTaxonomy.functionalRole = [
    FunctionalRole.MonitoringAndVisualization,
    FunctionalRole.PredictiveAnalysisAndForecasting
  ];
  sampleTaxonomy.synchronizationFrequency = SynchronizationFrequency.NearRealTime;
  sampleTaxonomy.intelligenceLevel = IntelligenceLevel.StaticModel;
  sampleTaxonomy.modelGranularity = ModelGranularity.ComponentLevel;
  sampleTaxonomy.dataArchitecture = DataArchitecture.EdgeBasedProcessing;
  sampleTaxonomy.interfaceTypes = [InterfaceTypes.HumanMachine];
  sampleTaxonomy.lifecyclePositioning = LifecyclePositioning.DTAfterPhysical;
  sampleTaxonomy.applicationDomain = [ApplicationDomain.Distribution];
  sampleTaxonomy.cyberPhysicalSecurityIntegration = []; // No security measures

  console.log('=== SAMPLE TAXONOMY CONFIGURATION ===');
  console.log(sampleTaxonomy.getSummary());

  // Apply transformation rules to generate recommendations
  const rules = new TaxonomyRules();
  const result = rules.transformTaxonomyToResult(sampleTaxonomy);

  console.log('\n=== ANALYSIS RESULTS ===');
  console.log(result.generateSummary());

  console.log('\n=== DIMENSION SCORES ===');
  Object.entries(result.dimensionScores).forEach(([dimension, score]) => {
    console.log(`${dimension}: ${score.toFixed(1)}/100`);
  });

  console.log('\n=== CRITICAL RECOMMENDATIONS ===');
  result.getCriticalRecommendations().forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.title}`);
    console.log(`   Priority: ${rec.priority} | Category: ${rec.category}`);
    console.log(`   Description: ${rec.description}`);
    console.log(`   Expected Benefits: ${rec.expectedBenefits.join(', ')}`);
    console.log('');
  });

  console.log('\n=== HIGH PRIORITY RECOMMENDATIONS ===');
  result.getHighPriorityRecommendations().forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.title}`);
    console.log(`   Priority: ${rec.priority} | Category: ${rec.category}`);
    console.log(`   Description: ${rec.description}`);
    console.log('');
  });

  console.log('\n=== IMPROVEMENT OPPORTUNITIES ===');
  result.improvements.forEach((imp, index) => {
    console.log(`${index + 1}. ${imp.title}`);
    console.log(`   Target Dimension: ${imp.targetDimension}`);
    console.log(`   Current State: ${imp.currentState} → Proposed State: ${imp.proposedState}`);
    console.log(`   Justification: ${imp.justification}`);
    console.log(`   Timeframe: ${imp.timeframe}`);
    console.log('');
  });

  console.log('\n=== RECOMMENDATIONS BY CATEGORY ===');
  Object.values(RecommendationCategory).forEach(category => {
    const categoryRecs = result.getRecommendationsByCategory(category);
    if (categoryRecs.length > 0) {
      console.log(`\n${category} (${categoryRecs.length} recommendations):`);
      categoryRecs.forEach(rec => {
        console.log(`  - ${rec.title} (${rec.priority} priority)`);
      });
    }
  });

  return result;
}

// Example of an advanced digital twin configuration
function demonstrateAdvancedTaxonomy() {
  const advancedTaxonomy = new Taxonomy();

  // Configure an advanced digital twin setup
  advancedTaxonomy.dataLink = DataLink.ClosedLoopActuation;
  advancedTaxonomy.functionalRole = [
    FunctionalRole.MonitoringAndVisualization,
    FunctionalRole.PredictiveAnalysisAndForecasting,
    FunctionalRole.OperationalControl,
    FunctionalRole.StrategicDecisionSupport,
    FunctionalRole.CybersecurityAndThreatDetection
  ];
  advancedTaxonomy.synchronizationFrequency = SynchronizationFrequency.RealTime;
  advancedTaxonomy.intelligenceLevel = IntelligenceLevel.SelfLearningDT;
  advancedTaxonomy.modelGranularity = ModelGranularity.MultiLayered;
  advancedTaxonomy.dataArchitecture = DataArchitecture.FederatedDTArchitecture;
  advancedTaxonomy.interfaceTypes = [
    InterfaceTypes.HumanMachine,
    InterfaceTypes.MachineMachine,
    InterfaceTypes.MultiAgentInteraction
  ];
  advancedTaxonomy.lifecyclePositioning = LifecyclePositioning.LifecycleIntegratedDT;
  advancedTaxonomy.applicationDomain = [
    ApplicationDomain.Generation,
    ApplicationDomain.Transmission,
    ApplicationDomain.Distribution,
    ApplicationDomain.MicrogridDERIntegration
  ];
  advancedTaxonomy.cyberPhysicalSecurityIntegration = [
    CyberPhysicalSecurityIntegration.PassiveMonitoring,
    CyberPhysicalSecurityIntegration.ActiveDefence,
    CyberPhysicalSecurityIntegration.ResilienceTestingAndRecoveryPlanning
  ];

  console.log('\n\n=== ADVANCED TAXONOMY CONFIGURATION ===');
  console.log(advancedTaxonomy.getSummary());

  const rules = new TaxonomyRules();
  const result = rules.transformTaxonomyToResult(advancedTaxonomy);

  console.log('\n=== ADVANCED CONFIGURATION ANALYSIS ===');
  console.log(result.generateSummary());

  console.log('\n=== DIMENSION SCORES (ADVANCED) ===');
  Object.entries(result.dimensionScores).forEach(([dimension, score]) => {
    console.log(`${dimension}: ${score.toFixed(1)}/100`);
  });

  if (result.recommendations.length > 0) {
    console.log('\n=== REMAINING RECOMMENDATIONS ===');
    result.getSortedRecommendations().forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.title} (${rec.priority})`);
    });
  } else {
    console.log('\n✅ No additional recommendations - this is a mature Digital Twin configuration!');
  }

  return result;
}

// Run the demonstrations
if (typeof window === 'undefined') {
  // Only run in Node.js environment
  console.log('🔍 Digital Twin Taxonomy Analysis Demonstration\n');

  console.log('📊 Running Basic Configuration Analysis...');
  const basicResult = demonstrateTaxonomyAnalysis();

  console.log('\n📈 Running Advanced Configuration Analysis...');
  const advancedResult = demonstrateAdvancedTaxonomy();

  console.log('\n📋 Comparison Summary:');
  console.log(`Basic Configuration Maturity: ${basicResult.overallMaturityScore.toFixed(1)}/100`);
  console.log(`Advanced Configuration Maturity: ${advancedResult.overallMaturityScore.toFixed(1)}/100`);
  console.log(`Improvement Potential: +${(advancedResult.overallMaturityScore - basicResult.overallMaturityScore).toFixed(1)} points`);
}

export { demonstrateTaxonomyAnalysis, demonstrateAdvancedTaxonomy };
