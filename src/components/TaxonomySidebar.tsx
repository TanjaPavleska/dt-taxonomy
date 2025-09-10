import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Menu,
  FileText,
  Calendar,
  BarChart3,
  Trash2,
  Download,
  Upload,
  Search,
  Filter
} from 'lucide-react';
import { TaxonomyStorageService } from '../taxonomyStorage';
import type { SavedTaxonomy } from '../taxonomyStorage';
import { Taxonomy, Result } from '../taxonomy';
import { useConfirmDialog } from './ConfirmDialog';
import { useInputDialog } from './InputDialog';
import { useAlertDialog } from './AlertDialog';

interface TaxonomySidebarProps {
  onLoadTaxonomy: (taxonomy: Taxonomy, result?: Result) => void;
  currentTaxonomy: Taxonomy;
  currentResult?: Result | null;
}

const TaxonomySidebar: React.FC<TaxonomySidebarProps> = ({
  onLoadTaxonomy,
  currentTaxonomy,
  currentResult
}) => {
  const [savedTaxonomies, setSavedTaxonomies] = useState<SavedTaxonomy[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyWithResults, setShowOnlyWithResults] = useState(false);

  // Initialize dialog hooks
  const { confirm, ConfirmDialogComponent } = useConfirmDialog();
  const { prompt, InputDialogComponent } = useInputDialog();
  const { alert, AlertDialogComponent } = useAlertDialog();

  // Load saved taxonomies on component mount
  useEffect(() => {
    loadSavedTaxonomies();
  }, []);

  const loadSavedTaxonomies = () => {
    const saved = TaxonomyStorageService.getSavedTaxonomies();
    setSavedTaxonomies(saved.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()));
  };

  const handleSaveCurrent = async () => {
    try {
      const title = await prompt({
        title: 'Enter Taxonomy Title',
        description: 'Please enter a title for this taxonomy:',
        placeholder: 'e.g., Power Grid DT Configuration',
        required: true
      });

      if (!title) return;

      const description = await prompt({
        title: 'Enter Description',
        description: 'Enter a description (optional):',
        placeholder: 'Brief description of this taxonomy...',
        required: false
      });

      TaxonomyStorageService.saveTaxonomy(title, currentTaxonomy, currentResult || undefined, description || undefined);
      loadSavedTaxonomies();
      await alert({
        message: 'Taxonomy saved successfully!',
        type: 'success',
        autoClose: 3000
      });
    } catch (error) {
      await alert({
        message: 'Failed to save taxonomy. Please try again.',
        type: 'error'
      });
    }
  };

  const handleLoadTaxonomy = (saved: SavedTaxonomy) => {
    onLoadTaxonomy(saved.taxonomy, saved.result);
    setIsOpen(false);
  };

  const handleDeleteTaxonomy = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const confirmed = await confirm({
      title: 'Delete Taxonomy',
      description: 'Are you sure you want to delete this saved taxonomy? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive'
    });

    if (confirmed) {
      TaxonomyStorageService.deleteTaxonomy(id);
      loadSavedTaxonomies();
    }
  };

  const handleExportAll = async () => {
    try {
      const jsonData = TaxonomyStorageService.exportAll();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `taxonomy-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      await alert({
        message: 'Failed to export taxonomies.',
        type: 'error'
      });
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const jsonData = e.target?.result as string;
          const success = TaxonomyStorageService.importFromJson(jsonData);
          if (success) {
            loadSavedTaxonomies();
            await alert({
              message: 'Taxonomies imported successfully!',
              type: 'success',
              autoClose: 3000
            });
          } else {
            await alert({
              message: 'Invalid file format or no valid taxonomies found.',
              type: 'warning'
            });
          }
        } catch (error) {
          await alert({
            message: 'Failed to import taxonomies. Please check the file format.',
            type: 'error'
          });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const filteredTaxonomies = savedTaxonomies.filter(taxonomy => {
    const matchesSearch = taxonomy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (taxonomy.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesFilter = !showOnlyWithResults || taxonomy.result;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMaturityColor = (score?: number) => {
    if (!score) return 'text-gray-400';
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="fixed top-4 left-4 z-10">
            <Menu className="h-4 w-4 mr-2" />
            Saved Taxonomies
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-96 sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Saved Taxonomies ({savedTaxonomies.length})
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            {/* Save Current Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Current Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={handleSaveCurrent} className="w-full" size="sm">
                  Save Current Taxonomy
                </Button>
                <div className="flex gap-2">
                  <Button onClick={handleExportAll} variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button onClick={handleImport} variant="outline" size="sm" className="flex-1">
                    <Upload className="h-4 w-4 mr-1" />
                    Import
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search taxonomies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showOnlyWithResults}
                    onChange={(e) => setShowOnlyWithResults(e.target.checked)}
                    className="rounded"
                  />
                  Only with results
                </label>
              </div>
            </div>

            {/* Saved Taxonomies List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTaxonomies.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {savedTaxonomies.length === 0 ? (
                    <>
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No saved taxonomies yet.</p>
                      <p className="text-sm mt-1">Save your current work to get started!</p>
                    </>
                  ) : (
                    <p>No taxonomies match your search criteria.</p>
                  )}
                </div>
              ) : (
                filteredTaxonomies.map((saved) => (
                  <Card
                    key={saved.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                    onClick={() => handleLoadTaxonomy(saved)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium line-clamp-2">
                          {saved.title}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDeleteTaxonomy(saved.id, e)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {saved.description && (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {saved.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(saved.updatedAt)}
                        </div>
                        {saved.result && (
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-3 w-3" />
                            <span className={getMaturityColor(saved.result.overallMaturityScore)}>
                              {saved.result.overallMaturityScore.toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {saved.taxonomy.functionalRole.slice(0, 2).map((role, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {role.split(' ')[0]}
                          </span>
                        ))}
                        {saved.taxonomy.functionalRole.length > 2 && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{saved.taxonomy.functionalRole.length - 2}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Dialog Components */}
      <ConfirmDialogComponent />
      <InputDialogComponent />
      <AlertDialogComponent />
    </>
  );
};

export default TaxonomySidebar;
