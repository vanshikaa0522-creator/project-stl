import React from 'react';

interface FilterSidebarProps {
  selectedFabrics: string[];
  toggleFabric: (fabric: string) => void;
  minSustainability: number;
  setMinSustainability: (val: number) => void;
  selectedOccasions: string[];
  toggleOccasion: (occ: 'Atelier' | 'Essential' | 'Lounge' | 'Technical') => void;
  resetFilters: () => void;
  isFiltered: boolean;
}

const FABRIC_TYPES = [
  'Organic Cotton',
  'Mulberry Silk',
  'Merino Wool',
  'Heavy Linen',
];

const OCCASIONS: Array<'Atelier' | 'Essential' | 'Lounge' | 'Technical'> = [
  'Atelier',
  'Essential',
  'Lounge',
  'Technical',
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedFabrics,
  toggleFabric,
  minSustainability,
  setMinSustainability,
  selectedOccasions,
  toggleOccasion,
  resetFilters,
  isFiltered,
}) => {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
      {/* Fabric Type */}
      <section>
        <div className="flex items-center justify-between border-b border-[#c4c7c7] pb-2 mb-6">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1b1c1c]">
            Fabric Type
          </h3>
          {selectedFabrics.length > 0 && (
            <span className="text-[10px] font-bold bg-[#1b1c1c] text-white px-1.5 py-0.5 rounded-full">
              {selectedFabrics.length}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {FABRIC_TYPES.map((fabric) => {
            const checked = selectedFabrics.includes(fabric);
            return (
              <label
                key={fabric}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFabric(fabric)}
                  className="rounded-sm border-[#747878] text-[#1b1c1c] focus:ring-[#1b1c1c] h-4 w-4 accent-[#1b1c1c] cursor-pointer"
                />
                <span
                  className={`text-sm transition-colors ${
                    checked
                      ? 'text-[#1b1c1c] font-medium'
                      : 'text-[#444748] group-hover:text-[#1b1c1c]'
                  }`}
                >
                  {fabric}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Sustainability */}
      <section>
        <h3 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 border-b border-[#c4c7c7] pb-2 text-[#1b1c1c]">
          Sustainability
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#5e5e5b]">Minimum Rating</span>
            <span className="font-bold text-[#1b1c1c] text-sm font-mono">
              {minSustainability.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={minSustainability}
            onChange={(e) => setMinSustainability(parseFloat(e.target.value))}
            className="w-full h-1 bg-[#e4e2e2] appearance-none cursor-pointer accent-[#1b1c1c] rounded-full"
          />
          <div className="flex justify-between text-[10px] text-[#747878] uppercase tracking-wider font-semibold">
            <span>Standard</span>
            <span>Regenerative</span>
          </div>
        </div>
      </section>

      {/* Occasion */}
      <section>
        <h3 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 border-b border-[#c4c7c7] pb-2 text-[#1b1c1c]">
          Occasion
        </h3>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((occ) => {
            const isSelected = selectedOccasions.includes(occ);
            return (
              <button
                key={occ}
                onClick={() => toggleOccasion(occ)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${
                  isSelected
                    ? 'border border-[#1b1c1c] bg-[#1b1c1c] text-white shadow-xs font-medium'
                    : 'border border-[#c4c7c7] text-[#1b1c1c] hover:border-[#1b1c1c] hover:bg-black/5'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </section>

      {/* Reset Filters */}
      {isFiltered && (
        <button
          onClick={resetFilters}
          className="w-full py-2.5 px-4 border border-[#1b1c1c] text-xs font-bold uppercase tracking-widest text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-base">restart_alt</span>
          Reset Filters
        </button>
      )}
    </aside>
  );
};
