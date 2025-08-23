import {
  DataLink,
  type Taxonomy,
  FunctionalRole,
  SynchronizationFrequency,
  IntelligenceLevel,
  ModelGranularity,
  DataArchitecture,
  InterfaceTypes,
  LifecyclePositioning,
  CyberPhysicalSecurityIntegration,
  type Recommendation,
  RecommendationCategory,
  RecommendationPriority,
  InterventionType,
  type Improvement,
  Result
} from "./taxonomy";


export class TaxonomyRules {
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private calculateDimensionScore(taxonomy: Taxonomy, dimension: string): number {
    // Scoring logic based on maturity and completeness of each dimension
    switch (dimension) {
      case 'dataLink':
        if (!taxonomy.dataLink) return 0;
        if (taxonomy.dataLink === DataLink.ClosedLoopActuation) return 100;
        if (taxonomy.dataLink === DataLink.BiDirectional) return 80;
        return 50;

      case 'functionalRole': {
        const roleScore = Math.min((taxonomy.functionalRole.length / 5) * 100, 100);
        // Bonus for having cybersecurity role
        if (taxonomy.functionalRole.includes(FunctionalRole.CybersecurityAndThreatDetection)) {
          return Math.min(roleScore + 20, 100);
        }
        return roleScore;
      }

      case 'synchronizationFrequency':
        if (!taxonomy.synchronizationFrequency) return 0;
        if (taxonomy.synchronizationFrequency === SynchronizationFrequency.RealTime) return 100;
        if (taxonomy.synchronizationFrequency === SynchronizationFrequency.NearRealTime) return 80;
        if (taxonomy.synchronizationFrequency === SynchronizationFrequency.Asynchronous) return 60;
        return 40;

      case 'intelligenceLevel':
        if (!taxonomy.intelligenceLevel) return 0;
        if (taxonomy.intelligenceLevel === IntelligenceLevel.CognitiveDT) return 100;
        if (taxonomy.intelligenceLevel === IntelligenceLevel.SelfLearningDT) return 85;
        if (taxonomy.intelligenceLevel === IntelligenceLevel.DataDrivenAdaptiveModel) return 65;
        return 30;

      case 'modelGranularity':
        if (!taxonomy.modelGranularity) return 0;
        if (taxonomy.modelGranularity === ModelGranularity.MultiLayered) return 100;
        if (taxonomy.modelGranularity === ModelGranularity.EnterpriseLevel) return 80;
        if (taxonomy.modelGranularity === ModelGranularity.SystemLevel) return 60;
        return 40;

      case 'dataArchitecture':
        if (!taxonomy.dataArchitecture) return 0;
        if (taxonomy.dataArchitecture === DataArchitecture.BlockchainEnabledDataGovernance) return 100;
        if (taxonomy.dataArchitecture === DataArchitecture.FederatedDTArchitecture) return 90;
        if (taxonomy.dataArchitecture === DataArchitecture.CloudIntegratedDT) return 70;
        return 50;

      case 'interfaceTypes': {
        const interfaceScore = Math.min((taxonomy.interfaceTypes.length / 3) * 100, 100);
        // Bonus for multi-agent interaction
        if (taxonomy.interfaceTypes.includes(InterfaceTypes.MultiAgentInteraction)) {
          return Math.min(interfaceScore + 15, 100);
        }
        return interfaceScore;
      }

      case 'lifecyclePositioning':
        if (!taxonomy.lifecyclePositioning) return 0;
        if (taxonomy.lifecyclePositioning === LifecyclePositioning.LifecycleIntegratedDT) return 100;
        if (taxonomy.lifecyclePositioning === LifecyclePositioning.SimultaneousDevelopment) return 85;
        if (taxonomy.lifecyclePositioning === LifecyclePositioning.DTBeforePhysical) return 70;
        return 50;

      case 'applicationDomain':
        return Math.min((taxonomy.applicationDomain.length / 6) * 100, 100);

      case 'cyberPhysicalSecurityIntegration': {
        const securityScore = Math.min((taxonomy.cyberPhysicalSecurityIntegration.length / 3) * 100, 100);
        // Bonus for having active defense or resilience testing
        if (taxonomy.cyberPhysicalSecurityIntegration.includes(CyberPhysicalSecurityIntegration.ActiveDefence) ||
            taxonomy.cyberPhysicalSecurityIntegration.includes(CyberPhysicalSecurityIntegration.ResilienceTestingAndRecoveryPlanning)) {
          return Math.min(securityScore + 20, 100);
        }
        return securityScore;
      }

      default:
        return 0;
    }
  }

  private generateDataLinkRecommendations(taxonomy: Taxonomy): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (!taxonomy.dataLink) {
      recommendations.push({
        id: this.generateId(),
        title: 'Establish Data Link Architecture',
        description: 'Define and implement a data communication strategy between physical and digital systems.',
        category: RecommendationCategory.Technical,
        priority: RecommendationPriority.Critical,
        interventionType: InterventionType.Immediate,
        estimatedCost: '$50,000 - $200,000',
        expectedBenefits: ['Enable basic digital twin functionality', 'Establish foundation for advanced features'],
        implementationSteps: ['Assess current data infrastructure', 'Design communication protocols', 'Implement data links'],
        riskFactors: ['Integration complexity', 'Legacy system compatibility'],
        relatedDimensions: ['dataLink'],
        feasibilityScore: 80,
        impactScore: 90,
      });
    } else if (taxonomy.dataLink === DataLink.OneDirectional) {
      recommendations.push({
        id: this.generateId(),
        title: 'Upgrade to Bi-directional Data Communication',
        description: 'Enhance current one-directional setup to enable feedback control and closed-loop operations.',
        category: RecommendationCategory.Technical,
        priority: RecommendationPriority.High,
        interventionType: InterventionType.ShortTerm,
        estimatedCost: '$100,000 - $300,000',
        expectedBenefits: ['Enable control capabilities', 'Improve system responsiveness', 'Support advanced automation'],
        implementationSteps: ['Design control interfaces', 'Implement actuator systems', 'Test feedback loops'],
        riskFactors: ['Control system stability', 'Cybersecurity vulnerabilities'],
        relatedDimensions: ['dataLink', 'functionalRole'],
        feasibilityScore: 70,
        impactScore: 85,
      });
    }

    return recommendations;
  }

  private generateIntelligenceRecommendations(taxonomy: Taxonomy): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (!taxonomy.intelligenceLevel || taxonomy.intelligenceLevel === IntelligenceLevel.StaticModel) {
      recommendations.push({
        id: this.generateId(),
        title: 'Implement Adaptive Intelligence',
        description: 'Upgrade from static models to data-driven adaptive systems with machine learning capabilities.',
        category: RecommendationCategory.Technical,
        priority: RecommendationPriority.High,
        interventionType: InterventionType.MidTerm,
        estimatedCost: '$200,000 - $500,000',
        expectedBenefits: ['Dynamic model adaptation', 'Improved prediction accuracy', 'Automated optimization'],
        implementationSteps: ['Implement ML infrastructure', 'Develop adaptive algorithms', 'Train initial models'],
        riskFactors: ['Data quality requirements', 'Algorithm complexity', 'Performance validation'],
        relatedDimensions: ['intelligenceLevel', 'dataArchitecture'],
        feasibilityScore: 65,
        impactScore: 90,
      });
    }

    if (taxonomy.intelligenceLevel === IntelligenceLevel.DataDrivenAdaptiveModel) {
      recommendations.push({
        id: this.generateId(),
        title: 'Develop Self-Learning Capabilities',
        description: 'Advance to self-learning digital twin with continuous improvement and autonomous adaptation.',
        category: RecommendationCategory.Technical,
        priority: RecommendationPriority.Medium,
        interventionType: InterventionType.LongTerm,
        estimatedCost: '$500,000 - $1,000,000',
        expectedBenefits: ['Autonomous learning', 'Reduced manual intervention', 'Continuous optimization'],
        implementationSteps: ['Implement reinforcement learning', 'Develop autonomous training pipelines', 'Create validation frameworks'],
        riskFactors: ['Algorithm stability', 'Training data requirements', 'Validation complexity'],
        relatedDimensions: ['intelligenceLevel', 'functionalRole'],
        feasibilityScore: 50,
        impactScore: 95,
      });
    }

    return recommendations;
  }

  private generateSecurityRecommendations(taxonomy: Taxonomy): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (taxonomy.cyberPhysicalSecurityIntegration.length === 0) {
      recommendations.push({
        id: this.generateId(),
        title: 'Implement Cybersecurity Framework',
        description: 'Establish comprehensive cyber-physical security monitoring and protection systems.',
        category: RecommendationCategory.Security,
        priority: RecommendationPriority.Critical,
        interventionType: InterventionType.Immediate,
        estimatedCost: '$150,000 - $400,000',
        expectedBenefits: ['Enhanced system security', 'Threat detection capabilities', 'Compliance readiness'],
        implementationSteps: ['Security assessment', 'Implement monitoring systems', 'Develop response procedures'],
        riskFactors: ['Complex threat landscape', 'Integration challenges', 'False positive rates'],
        relatedDimensions: ['cyberPhysicalSecurityIntegration', 'functionalRole'],
        feasibilityScore: 75,
        impactScore: 95,
      });
    }

    if (!taxonomy.cyberPhysicalSecurityIntegration.includes(CyberPhysicalSecurityIntegration.ActiveDefence)) {
      recommendations.push({
        id: this.generateId(),
        title: 'Deploy Active Defense Systems',
        description: 'Implement proactive security measures with automated threat response capabilities.',
        category: RecommendationCategory.Security,
        priority: RecommendationPriority.High,
        interventionType: InterventionType.ShortTerm,
        estimatedCost: '$200,000 - $600,000',
        expectedBenefits: ['Proactive threat mitigation', 'Reduced response time', 'Automated defense'],
        implementationSteps: ['Design active defense architecture', 'Implement automated responses', 'Test defense scenarios'],
        riskFactors: ['False positive actions', 'System complexity', 'Coordination challenges'],
        relatedDimensions: ['cyberPhysicalSecurityIntegration', 'intelligenceLevel'],
        feasibilityScore: 60,
        impactScore: 85,
      });
    }

    return recommendations;
  }

  private generateArchitectureRecommendations(taxonomy: Taxonomy): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (!taxonomy.dataArchitecture) {
      recommendations.push({
        id: this.generateId(),
        title: 'Design Data Architecture Strategy',
        description: 'Establish a comprehensive data architecture aligned with operational requirements.',
        category: RecommendationCategory.Technical,
        priority: RecommendationPriority.High,
        interventionType: InterventionType.ShortTerm,
        estimatedCost: '$100,000 - $300,000',
        expectedBenefits: ['Scalable data management', 'Improved performance', 'Better integration'],
        implementationSteps: ['Architecture assessment', 'Design data flows', 'Implement infrastructure'],
        riskFactors: ['Scalability challenges', 'Integration complexity', 'Performance bottlenecks'],
        relatedDimensions: ['dataArchitecture', 'modelGranularity'],
        feasibilityScore: 80,
        impactScore: 80,
      });
    }

    if (taxonomy.dataArchitecture === DataArchitecture.EdgeBasedProcessing) {
      recommendations.push({
        id: this.generateId(),
        title: 'Implement Hybrid Cloud-Edge Architecture',
        description: 'Extend edge processing with cloud integration for enhanced capabilities and scalability.',
        category: RecommendationCategory.Technical,
        priority: RecommendationPriority.Medium,
        interventionType: InterventionType.MidTerm,
        estimatedCost: '$250,000 - $700,000',
        expectedBenefits: ['Hybrid processing capabilities', 'Improved scalability', 'Enhanced analytics'],
        implementationSteps: ['Design hybrid architecture', 'Implement cloud integration', 'Optimize data flows'],
        riskFactors: ['Network dependencies', 'Data governance complexity', 'Cost management'],
        relatedDimensions: ['dataArchitecture', 'synchronizationFrequency'],
        feasibilityScore: 70,
        impactScore: 75,
      });
    }

    return recommendations;
  }

  private generateImprovements(taxonomy: Taxonomy): Improvement[] {
    const improvements: Improvement[] = [];

    // Data Link Improvements
    if (taxonomy.dataLink === DataLink.OneDirectional) {
      improvements.push({
        id: this.generateId(),
        title: 'Enable Bidirectional Communication',
        description: 'Upgrade data link to support bidirectional communication for enhanced control capabilities.',
        targetDimension: 'Data Link',
        currentState: 'One-directional',
        proposedState: 'Bi-directional',
        justification: 'Bidirectional communication enables control feedback loops and advanced automation capabilities.',
        prerequisites: ['Network infrastructure upgrade', 'Security framework implementation'],
        successMetrics: ['Control response time < 100ms', 'Successful feedback loop implementation', '99.9% communication reliability'],
        timeframe: InterventionType.ShortTerm,
      });
    }

    // Intelligence Level Improvements
    if (!taxonomy.intelligenceLevel || taxonomy.intelligenceLevel === IntelligenceLevel.StaticModel) {
      improvements.push({
        id: this.generateId(),
        title: 'Implement Machine Learning Capabilities',
        description: 'Upgrade from static models to adaptive machine learning-based intelligence.',
        targetDimension: 'Intelligence Level',
        currentState: taxonomy.intelligenceLevel || 'Not defined',
        proposedState: 'Data-driven adaptive model',
        justification: 'ML capabilities enable dynamic adaptation to changing conditions and improved prediction accuracy.',
        prerequisites: ['Data collection infrastructure', 'ML platform setup', 'Training data preparation'],
        successMetrics: ['Model adaptation frequency daily', 'Prediction accuracy > 95%', 'Autonomous learning cycles'],
        timeframe: InterventionType.MidTerm,
      });
    }

    // Security Improvements
    if (taxonomy.cyberPhysicalSecurityIntegration.length === 0) {
      improvements.push({
        id: this.generateId(),
        title: 'Establish Security Monitoring',
        description: 'Implement comprehensive cyber-physical security monitoring and threat detection.',
        targetDimension: 'Cyber-Physical Security Integration',
        currentState: 'No security integration',
        proposedState: 'Passive monitoring with active defense',
        justification: 'Security integration is critical for protecting against cyber-physical threats in power grid systems.',
        prerequisites: ['Security assessment', 'Monitoring infrastructure', 'Response procedures'],
        successMetrics: ['24/7 monitoring coverage', 'Threat detection accuracy > 98%', 'Response time < 5 minutes'],
        timeframe: InterventionType.Immediate,
      });
    }

    return improvements;
  }

  public transformTaxonomyToResult(taxonomy: Taxonomy): Result {
    const result = new Result();

    // Calculate dimension scores
    const dimensions = [
      'dataLink', 'functionalRole', 'synchronizationFrequency', 'intelligenceLevel',
      'modelGranularity', 'dataArchitecture', 'interfaceTypes', 'lifecyclePositioning',
      'applicationDomain', 'cyberPhysicalSecurityIntegration'
    ];

    dimensions.forEach(dimension => {
      result.dimensionScores[dimension] = this.calculateDimensionScore(taxonomy, dimension);
    });

    // Calculate overall maturity score
    result.calculateOverallScore();

    // Generate recommendations
    const allRecommendations = [
      ...this.generateDataLinkRecommendations(taxonomy),
      ...this.generateIntelligenceRecommendations(taxonomy),
      ...this.generateSecurityRecommendations(taxonomy),
      ...this.generateArchitectureRecommendations(taxonomy),
    ];

    allRecommendations.forEach(rec => result.addRecommendation(rec));

    // Generate improvements
    const improvements = this.generateImprovements(taxonomy);
    improvements.forEach(imp => result.addImprovement(imp));

    // Generate summary
    result.generateSummary();

    return result;
  }
}

