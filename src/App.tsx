import { useState } from 'react';
import TaxonomyForm from './components/TaxonomyForm';
import TaxonomyComparison from './components/TaxonomyComparison';
import { Button } from './components/ui/button';

function App() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Digital Twin Taxonomy Classifier</h1>
              <p className="text-gray-600">Analyze and compare your digital twin implementations</p>
            </div>
            <Button
              onClick={() => setShowComparison(!showComparison)}
              variant={showComparison ? "default" : "outline"}
            >
              {showComparison ? 'Back to Form' : 'Compare Taxonomies'}
            </Button>
          </div>
        </div>
      </div>
      
      {showComparison ? (
        <TaxonomyComparison onClose={() => setShowComparison(false)} />
      ) : (
        <TaxonomyForm />
      )}
    </div>
  );
}

export default App