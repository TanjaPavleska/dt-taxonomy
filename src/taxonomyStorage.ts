import { Taxonomy, Result } from './taxonomy';

export interface SavedTaxonomy {
  id: string;
  title: string;
  description?: string;
  taxonomy: Taxonomy;
  result?: Result;
  savedAt: Date;
  updatedAt: Date;
}

// Helper function to restore Result object with its methods
function restoreResultObject(resultData: any): Result | undefined {
  if (!resultData) return undefined;

  const result = new Result();
  result.recommendations = resultData.recommendations || [];
  result.improvements = resultData.improvements || [];
  result.overallMaturityScore = resultData.overallMaturityScore || 0;
  result.dimensionScores = resultData.dimensionScores || {};
  result.summary = resultData.summary || '';
  result.generatedAt = new Date(resultData.generatedAt || Date.now());

  // Verify that the methods are available
  if (typeof result.getCriticalRecommendations !== 'function') {
    console.error('Result object methods not properly restored!');
  }

  return result;
}

// Helper function to restore Taxonomy object with its methods
function restoreTaxonomyObject(taxonomyData: any): Taxonomy {
  const taxonomy = new Taxonomy();
  taxonomy.dataLink = taxonomyData.dataLink;
  taxonomy.functionalRole = taxonomyData.functionalRole || [];
  taxonomy.synchronizationFrequency = taxonomyData.synchronizationFrequency;
  taxonomy.intelligenceLevel = taxonomyData.intelligenceLevel;
  taxonomy.modelGranularity = taxonomyData.modelGranularity;
  taxonomy.dataArchitecture = taxonomyData.dataArchitecture;
  taxonomy.interfaceTypes = taxonomyData.interfaceTypes || [];
  taxonomy.lifecyclePositioning = taxonomyData.lifecyclePositioning;
  taxonomy.applicationDomain = taxonomyData.applicationDomain || [];
  taxonomy.cyberPhysicalSecurityIntegration = taxonomyData.cyberPhysicalSecurityIntegration || [];

  return taxonomy;
}

export class TaxonomyStorageService {
  private static readonly STORAGE_KEY = 'dt-taxonomy-saved-items';

  // Get all saved taxonomies
  static getSavedTaxonomies(): SavedTaxonomy[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];

      const items = JSON.parse(stored);
      // Convert date strings back to Date objects and restore class methods
      return items.map((item: any) => ({
        ...item,
        taxonomy: restoreTaxonomyObject(item.taxonomy),
        result: restoreResultObject(item.result),
        savedAt: new Date(item.savedAt),
        updatedAt: new Date(item.updatedAt),
      }));
    } catch (error) {
      console.error('Error loading saved taxonomies:', error);
      return [];
    }
  }

  // Save a new taxonomy
  static saveTaxonomy(
    title: string,
    taxonomy: Taxonomy,
    result?: Result,
    description?: string
  ): string {
    const id = this.generateId();
    const now = new Date();

    const savedTaxonomy: SavedTaxonomy = {
      id,
      title,
      description,
      taxonomy,
      result,
      savedAt: now,
      updatedAt: now,
    };

    const existingItems = this.getSavedTaxonomies();
    existingItems.push(savedTaxonomy);

    this.saveToStorage(existingItems);
    return id;
  }

  // Update an existing taxonomy
  static updateTaxonomy(
    id: string,
    updates: Partial<Omit<SavedTaxonomy, 'id' | 'savedAt'>>
  ): boolean {
    const existingItems = this.getSavedTaxonomies();
    const index = existingItems.findIndex(item => item.id === id);

    if (index === -1) return false;

    existingItems[index] = {
      ...existingItems[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.saveToStorage(existingItems);
    return true;
  }

  // Delete a saved taxonomy
  static deleteTaxonomy(id: string): boolean {
    const existingItems = this.getSavedTaxonomies();
    const filteredItems = existingItems.filter(item => item.id !== id);

    if (filteredItems.length === existingItems.length) return false;

    this.saveToStorage(filteredItems);
    return true;
  }

  // Get a specific taxonomy by ID
  static getTaxonomyById(id: string): SavedTaxonomy | null {
    const items = this.getSavedTaxonomies();
    return items.find(item => item.id === id) || null;
  }

  // Clear all saved taxonomies
  static clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Export all saved taxonomies as JSON
  static exportAll(): string {
    const items = this.getSavedTaxonomies();
    return JSON.stringify(items, null, 2);
  }

  // Import taxonomies from JSON
  static importFromJson(jsonData: string): boolean {
    try {
      const importedItems = JSON.parse(jsonData);
      if (!Array.isArray(importedItems)) return false;

      // Validate the structure of imported items
      const validItems = importedItems.filter(this.isValidSavedTaxonomy);

      if (validItems.length === 0) return false;

      const existingItems = this.getSavedTaxonomies();
      const mergedItems = [...existingItems, ...validItems];

      this.saveToStorage(mergedItems);
      return true;
    } catch (error) {
      console.error('Error importing taxonomies:', error);
      return false;
    }
  }

  // Private helper methods
  private static saveToStorage(items: SavedTaxonomy[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Failed to save taxonomy data');
    }
  }

  private static generateId(): string {
    return `taxonomy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static isValidSavedTaxonomy(item: any): item is SavedTaxonomy {
    return (
      typeof item === 'object' &&
      typeof item.id === 'string' &&
      typeof item.title === 'string' &&
      typeof item.taxonomy === 'object' &&
      (item.savedAt instanceof Date || typeof item.savedAt === 'string') &&
      (item.updatedAt instanceof Date || typeof item.updatedAt === 'string')
    );
  }

  // Get summary statistics
  static getStats() {
    const items = this.getSavedTaxonomies();
    return {
      totalSaved: items.length,
      withResults: items.filter(item => item.result).length,
      lastSaved: items.length > 0 ? Math.max(...items.map(item => item.savedAt.getTime())) : null,
    };
  }
}
