# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
yarn dev

# Build for production
yarn build

# Linting
yarn lint

# Preview production build
yarn preview
```

## Project Architecture

This is a React-based Digital Twin Taxonomy Classifier for power grid systems. The application allows users to characterize their digital twin implementations across 10 dimensions and receives recommendations based on ISO/IEC 30186.

### Core Architecture

- **Framework**: React 19 with TypeScript and Vite
- **Styling**: Tailwind CSS 4.1 with Shadcn/ui and Radix UI components
- **State Management**: Local React state (no external state management)
- **Build Tool**: Vite with TypeScript compilation

### Key Components

1. **TaxonomyForm** (`src/components/TaxonomyForm.tsx`) - Main form component collecting user input across 10 taxonomy dimensions
2. **TaxonomyRules** (`src/taxonomy_rules.ts`) - Business logic engine that analyzes taxonomy inputs and generates recommendations
3. **Taxonomy** (`src/taxonomy.ts`) - Core data model and type definitions
4. **TaxonomyStorage** (`src/taxonomyStorage.ts`) - LocalStorage integration for saving/loading taxonomies
5. **DimensionRadarChart/CompactRadarChart** - Visualization components using Recharts

### Taxonomy Dimensions

The system evaluates digital twins across 10 dimensions:
- Data Link (communication patterns)
- Functional Role (primary purposes)
- Synchronization Frequency (temporal alignment)
- Intelligence Level (AI/ML integration)
- Model Granularity (scope/scale)
- Data Architecture (infrastructure)
- Interface Types (interaction modes)
- Lifecycle Positioning (temporal relationship)
- Application Domain (power grid focus)
- Cyber-Physical Security Integration (security capabilities)

### Business Logic

The `TaxonomyRules` class implements a sophisticated rule-based engine that:
- Calculates maturity scores (0-100) for each dimension
- Generates prioritized recommendations based on configuration gaps
- Provides specific improvement pathways
- Uses complex scoring algorithms that consider dimension interdependencies

### Data Flow

1. User fills out form → `Taxonomy` object populated
2. Form submission → `TaxonomyRules.analyze()` generates `Result` object
3. Results displayed with radar charts and actionable recommendations
4. Taxonomies can be saved/loaded via localStorage

### Key Files to Understand

- `src/taxonomy.ts` - All type definitions and data models
- `src/taxonomy_rules.ts` - Core business logic and recommendation engine
- `src/components/TaxonomyForm.tsx` - Main form interface with complex state management
- `src/taxonomyStorage.ts` - Data persistence layer

### Component Patterns

- Uses shadcn/ui and custom UI components from `src/components/ui/` (built with Radix UI primitives)
- Form state managed through individual handler functions for each taxonomy dimension
- Radar charts for visual representation of maturity scores
- Responsive design with Tailwind CSS

### Build Configuration

- Vite config includes path alias `@` pointing to `src/`
- TypeScript strict mode enabled
- ESLint with React-specific rules
- Tailwind CSS 4.1 with custom theme configuration