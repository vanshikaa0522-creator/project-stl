import React, { useState, useEffect, useMemo } from 'react';
import { GARMENTS_DATA, Garment } from './data/garments';
import { TopNav } from './components/TopNav';
import { FilterSidebar } from './components/FilterSidebar';
import { GarmentCard } from './components/GarmentCard';
import { GarmentDetailModal } from './components/GarmentDetailModal';
import { CompareView } from './components/CompareView';
import { WardrobeView } from './components/WardrobeView';
import { ListingsView } from './components/ListingsView';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { SearchModal } from './components/SearchModal';
import { RequirementFilter } from './components/RequirementFilter';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'listings' | 'compare' | 'wardrobe'>('discover');

  // Filter states
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [minSustainability, setMinSustainability] = useState<number>(0);
  const [selectedOccasions, setSelectedOccasions] = useState<
    Array<'Atelier' | 'Essential' | 'Lounge' | 'Technical'>
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Requirement Engine state
  const [requirementPrompt, setRequirementPrompt] = useState<string>('');
  const [requirementTags, setRequirementTags] = useState<string[]>([]);

  // Local storage persisted state for Wardrobe
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('aesthete_wardrobe');
      return stored ? JSON.parse(stored) : ['garment-1', 'garment-3'];
    } catch {
      return ['garment-1', 'garment-3'];
    }
  });

  const [compareIds, setCompareIds] = useState<string[]>(['garment-1', 'garment-2']);
  const [selectedDetailGarment, setSelectedDetailGarment] = useState<Garment | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('aesthete_wardrobe', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  // Toggle fabric checkbox
  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  // Toggle occasion pill
  const toggleOccasion = (occ: 'Atelier' | 'Essential' | 'Lounge' | 'Technical') => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const isFiltered =
    selectedFabrics.length > 0 ||
    minSustainability > 0 ||
    selectedOccasions.length > 0 ||
    searchQuery.trim().length > 0 ||
    requirementPrompt.trim().length > 0 ||
    requirementTags.length > 0;

  const resetFilters = () => {
    setSelectedFabrics([]);
    setMinSustainability(0);
    setSelectedOccasions([]);
    setSearchQuery('');
    setRequirementPrompt('');
    setRequirementTags([]);
  };

  // Requirement Matching Engine Helper
  const calculateMatchScore = (garment: Garment, prompt: string, reqTags: string[]): number => {
    if (!prompt.trim() && reqTags.length === 0) return 0;

    let points = 50;
    const lowerPrompt = prompt.toLowerCase();

    // Check fabric matches
    if (lowerPrompt.includes('cotton') && garment.fabricType === 'Organic Cotton') points += 25;
    if (lowerPrompt.includes('silk') && garment.fabricType === 'Mulberry Silk') points += 25;
    if (lowerPrompt.includes('wool') && garment.fabricType === 'Merino Wool') points += 25;
    if (lowerPrompt.includes('linen') && garment.fabricType === 'Heavy Linen') points += 25;

    // Check occasion matches
    if (lowerPrompt.includes('atelier') || lowerPrompt.includes('formal') || lowerPrompt.includes('evening')) {
      if (garment.occasion === 'Atelier') points += 20;
    }
    if (lowerPrompt.includes('lounge') || lowerPrompt.includes('relax') || lowerPrompt.includes('home')) {
      if (garment.occasion === 'Lounge') points += 20;
    }
    if (lowerPrompt.includes('essential') || lowerPrompt.includes('everyday') || lowerPrompt.includes('daily')) {
      if (garment.occasion === 'Essential') points += 20;
    }

    // Check tags
    garment.tags.forEach((tag) => {
      if (lowerPrompt.includes(tag.toLowerCase())) points += 15;
    });

    // Check composition & description
    if (garment.description.toLowerCase().split(' ').some((w) => w.length > 3 && lowerPrompt.includes(w))) {
      points += 10;
    }

    // High sustainability requirement
    if (lowerPrompt.includes('sustainab') || lowerPrompt.includes('eco') || lowerPrompt.includes('regenerat')) {
      if (garment.sustainabilityRating >= 9.0) points += 20;
    }

    return Math.min(100, Math.max(65, points));
  };

  // Filtered Garments Calculation
  const filteredGarmentsWithScores = useMemo(() => {
    return GARMENTS_DATA.map((g) => {
      const matchScore = calculateMatchScore(g, requirementPrompt, requirementTags);
      return { garment: g, matchScore };
    })
      .filter(({ garment, matchScore }) => {
        // Standard Sidebar Filters
        if (selectedFabrics.length > 0 && !selectedFabrics.includes(garment.fabricType)) {
          return false;
        }
        if (garment.sustainabilityRating < minSustainability) {
          return false;
        }
        if (selectedOccasions.length > 0 && !selectedOccasions.includes(garment.occasion)) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            garment.name.toLowerCase().includes(q) ||
            garment.fabricType.toLowerCase().includes(q) ||
            garment.tags.some((t) => t.toLowerCase().includes(q)) ||
            garment.composition.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Requirement prompt filter threshold if prompt exists
        if (requirementPrompt.trim() && matchScore < 60) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (requirementPrompt.trim()) {
          return b.matchScore - a.matchScore;
        }
        return 0;
      });
  }, [selectedFabrics, minSustainability, selectedOccasions, searchQuery, requirementPrompt, requirementTags]);

  const filteredGarments = filteredGarmentsWithScores.map((item) => item.garment);

  // Wardrobe items
  const wardrobeGarments = useMemo(() => {
    return GARMENTS_DATA.filter((g) => savedIds.includes(g.id));
  }, [savedIds]);

  // Compare items
  const compareGarments = useMemo(() => {
    return GARMENTS_DATA.filter((g) => compareIds.includes(g.id));
  }, [compareIds]);

  // Save / Bookmark handler
  const handleToggleSave = (e: React.MouseEvent | null, garment: Garment) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(garment.id)
        ? prev.filter((id) => id !== garment.id)
        : [...prev, garment.id]
    );
  };

  // Compare handler
  const handleToggleCompare = (e: React.MouseEvent | null, garment: Garment) => {
    if (e) e.stopPropagation();
    setCompareIds((prev) =>
      prev.includes(garment.id)
        ? prev.filter((id) => id !== garment.id)
        : [...prev, garment.id]
    );
  };

  return (
    <div className="min-h-screen bg-[#fbf9f9] text-[#1b1c1c] font-sans flex flex-col justify-between selection:bg-black/10">
      {/* Top Navbar */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wardrobeCount={savedIds.length}
        compareCount={compareIds.length}
        openSearchModal={() => setIsSearchModalOpen(true)}
      />

      {/* Main Workspace */}
      <main className="pt-24 pb-20 max-w-[1280px] w-full mx-auto px-4 md:px-10 flex-grow">
        {activeTab === 'discover' && (
          <div className="space-y-12">
            {/* Hero Header */}
            <header className="py-12 sm:py-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#747878] block mb-2">
                  STRIP THE LABEL
                </span>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] text-[#1b1c1c] tracking-tight">
                  Choose What You Truly Want.
                </h1>
                <p className="text-lg text-[#5e5e5b] font-normal leading-relaxed">
                  Free from brand noise, logos, and price tags. Specify your requirement, and let pure material integrity and structural fit guide your choice.
                </p>
              </div>
              <div className="flex items-center gap-2 pb-2">
                <span className="text-xs font-medium uppercase tracking-widest text-[#444748]">
                  Curation Mode:
                </span>
                <span className="text-xs font-bold text-[#1b1c1c] uppercase tracking-wider bg-[#efeded] px-2.5 py-1 rounded">
                  Unbiased Integrity
                </span>
              </div>
            </header>

            {/* FIRST FILTER: Interactive Requirement Engine */}
            <RequirementFilter
              currentPrompt={requirementPrompt}
              onApplyRequirement={(prompt, tags) => {
                setRequirementPrompt(prompt);
                setRequirementTags(tags);
              }}
              onClearRequirement={() => {
                setRequirementPrompt('');
                setRequirementTags([]);
              }}
              activeMatchCount={filteredGarments.length}
              totalCount={GARMENTS_DATA.length}
            />

            {/* Layout Grid: Secondary Filter Sidebar + Product Grid */}
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar */}
              <FilterSidebar
                selectedFabrics={selectedFabrics}
                toggleFabric={toggleFabric}
                minSustainability={minSustainability}
                setMinSustainability={setMinSustainability}
                selectedOccasions={selectedOccasions}
                toggleOccasion={toggleOccasion}
                resetFilters={resetFilters}
                isFiltered={isFiltered}
              />

              {/* Product Cards Container */}
              <div className="flex-grow space-y-12">
                {filteredGarments.length === 0 ? (
                  <div className="py-20 text-center bg-[#efeded] p-8 border border-dashed border-[#c4c7c7] space-y-4">
                    <span className="material-symbols-outlined text-4xl text-[#747878]">
                      filter_alt_off
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-[#1b1c1c]">
                      No Garments Match Selected Requirement & Criteria
                    </h3>
                    <p className="text-sm text-[#5e5e5b] max-w-md mx-auto">
                      Try broadening your requirement prompt or resetting sidebar filters to explore more items in the catalog.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-6 py-2.5 bg-[#1b1c1c] text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors"
                    >
                      Reset All Requirements
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8">
                      {filteredGarmentsWithScores.slice(0, visibleCount).map(({ garment, matchScore }) => (
                        <GarmentCard
                          key={garment.id}
                          garment={garment}
                          onSelect={(g) => setSelectedDetailGarment(g)}
                          isSaved={savedIds.includes(garment.id)}
                          onToggleSave={(e, g) => handleToggleSave(e, g)}
                          isComparing={compareIds.includes(garment.id)}
                          onToggleCompare={(e, g) => handleToggleCompare(e, g)}
                          matchScore={requirementPrompt.trim() ? matchScore : undefined}
                        />
                      ))}
                    </div>

                    {/* View More Garments Button */}
                    {visibleCount < filteredGarments.length ? (
                      <div className="mt-20 flex justify-center">
                        <button
                          onClick={() => setVisibleCount((prev) => prev + 6)}
                          className="px-12 py-4 border border-[#1b1c1c] text-xs font-bold uppercase tracking-widest text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white transition-all duration-300"
                        >
                          View More Garments ({filteredGarments.length - visibleCount} Remaining)
                        </button>
                      </div>
                    ) : filteredGarments.length > 6 ? (
                      <div className="mt-12 text-center text-xs text-[#747878] uppercase tracking-widest">
                        Showing All {filteredGarments.length} Filtered Garments
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Listings View */}
        {activeTab === 'listings' && (
          <ListingsView
            onOpenDetail={(g) => setSelectedDetailGarment(g)}
            savedIds={savedIds}
            onToggleSave={(g) => handleToggleSave(null, g)}
            compareIds={compareIds}
            onToggleCompare={(g) => handleToggleCompare(null, g)}
          />
        )}

        {/* Compare View */}
        {activeTab === 'compare' && (
          <CompareView
            compareItems={compareGarments}
            onRemoveFromCompare={(g) => handleToggleCompare(null, g)}
            onAddToCompare={(g) => handleToggleCompare(null, g)}
            onClearCompare={() => setCompareIds([])}
            onOpenDetail={(g) => setSelectedDetailGarment(g)}
          />
        )}

        {/* Wardrobe View */}
        {activeTab === 'wardrobe' && (
          <WardrobeView
            wardrobeItems={wardrobeGarments}
            onRemoveFromWardrobe={(g) => handleToggleSave(null, g)}
            onOpenDetail={(g) => setSelectedDetailGarment(g)}
            onExploreMore={() => setActiveTab('discover')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSearchModal={() => setIsSearchModalOpen(true)}
      />

      {/* Detail Modal */}
      <GarmentDetailModal
        garment={selectedDetailGarment}
        onClose={() => setSelectedDetailGarment(null)}
        isSaved={selectedDetailGarment ? savedIds.includes(selectedDetailGarment.id) : false}
        onToggleSave={(g) => handleToggleSave(null, g)}
        isComparing={selectedDetailGarment ? compareIds.includes(selectedDetailGarment.id) : false}
        onToggleCompare={(g) => handleToggleCompare(null, g)}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectGarment={(g) => setSelectedDetailGarment(g)}
      />
    </div>
  );
}

