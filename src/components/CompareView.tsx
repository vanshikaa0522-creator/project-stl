import React from 'react';
import { Garment, GARMENTS_DATA } from '../data/garments';

interface CompareViewProps {
  compareItems: Garment[];
  onRemoveFromCompare: (garment: Garment) => void;
  onAddToCompare: (garment: Garment) => void;
  onClearCompare: () => void;
  onOpenDetail: (garment: Garment) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  compareItems,
  onRemoveFromCompare,
  onAddToCompare,
  onClearCompare,
  onOpenDetail,
}) => {
  const unselectedGarments = GARMENTS_DATA.filter(
    (g) => !compareItems.some((c) => c.id === g.id)
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#c4c7c7] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#747878]">
            Side-by-Side Analysis
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1b1c1c] mt-1">
            Garment Material Integrity Matrix
          </h1>
        </div>
        {compareItems.length > 0 && (
          <button
            onClick={onClearCompare}
            className="text-xs font-bold uppercase tracking-widest text-[#1b1c1c] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">clear_all</span>
            Clear Comparison ({compareItems.length})
          </button>
        )}
      </div>

      {compareItems.length === 0 ? (
        <div className="py-16 text-center bg-[#efeded] p-8 border border-dashed border-[#c4c7c7] max-w-2xl mx-auto space-y-4">
          <span className="material-symbols-outlined text-4xl text-[#747878]">
            compare_arrows
          </span>
          <h3 className="font-serif text-2xl font-semibold text-[#1b1c1c]">
            No Garments Selected for Comparison
          </h3>
          <p className="text-sm text-[#5e5e5b] max-w-md mx-auto">
            Select items from the Discover catalog or choose from the list below to evaluate material composition, sustainability index, and cost per wear.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            {GARMENTS_DATA.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => onAddToCompare(item)}
                className="p-3 bg-white border border-[#c4c7c7] hover:border-[#1b1c1c] transition-colors text-xs flex flex-col justify-between"
              >
                <span className="font-bold text-[#1b1c1c] line-clamp-1">
                  {item.name}
                </span>
                <span className="text-[10px] text-[#747878]">{item.fabricType}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Add more button row */}
          {compareItems.length < 4 && unselectedGarments.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#747878] whitespace-nowrap">
                Add to matrix:
              </span>
              {unselectedGarments.map((g) => (
                <button
                  key={g.id}
                  onClick={() => onAddToCompare(g)}
                  className="px-3 py-1 bg-[#efeded] hover:bg-[#1b1c1c] hover:text-white transition-colors text-xs font-medium rounded-full whitespace-nowrap flex items-center gap-1"
                >
                  <span>+</span> {g.name}
                </button>
              ))}
            </div>
          )}

          {/* Comparison Grid */}
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[700px] grid grid-cols-5 gap-4">
              {/* Row Header column */}
              <div className="col-span-1 space-y-8 text-xs font-semibold uppercase text-[#747878] tracking-wider pt-48 border-r border-[#c4c7c7] pr-4">
                <div className="h-10 flex items-center">Price</div>
                <div className="h-10 flex items-center">Rating</div>
                <div className="h-10 flex items-center">Fabric Category</div>
                <div className="h-16 flex items-center">Exact Composition</div>
                <div className="h-10 flex items-center">Sustainability Rating</div>
                <div className="h-10 flex items-center">Water Saved</div>
                <div className="h-10 flex items-center">Est. Cost / Wear</div>
                <div className="h-10 flex items-center">Origin</div>
              </div>

              {/* Items Columns */}
              <div className="col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {compareItems.map((item) => {
                  const cpw = (item.price / (item.longevityMonths * 4)).toFixed(2);
                  return (
                    <div
                      key={item.id}
                      className="bg-[#f5f3f3] p-4 border border-[#c4c7c7] flex flex-col justify-between space-y-8"
                    >
                      {/* Top Item Card Header */}
                      <div className="h-44 flex flex-col justify-between relative group">
                        <button
                          onClick={() => onRemoveFromCompare(item)}
                          className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white transition-colors z-10"
                          title="Remove"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                        <div
                          className="h-28 overflow-hidden cursor-pointer"
                          onClick={() => onOpenDetail(item)}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3
                          onClick={() => onOpenDetail(item)}
                          className="font-serif font-bold text-base text-[#1b1c1c] cursor-pointer hover:underline line-clamp-1"
                        >
                          {item.name}
                        </h3>
                      </div>

                      {/* Attribute Rows */}
                      <div className="h-10 font-bold font-mono text-sm text-[#1b1c1c] flex items-center">
                        ${item.price}
                      </div>

                      <div className="h-10 font-mono text-xs flex items-center gap-1 text-[#1b1c1c]">
                        <span className="material-symbols-outlined text-sm text-[#1b1c1c] filled">
                          star
                        </span>
                        <span>{item.rating.toFixed(1)}</span>
                      </div>

                      <div className="h-10 text-xs text-[#1b1c1c] font-medium flex items-center">
                        {item.fabricType}
                      </div>

                      <div className="h-16 text-[11px] text-[#5e5e5b] flex items-center leading-snug">
                        {item.composition}
                      </div>

                      <div className="h-10 text-xs font-bold font-mono text-[#1b1c1c] flex items-center">
                        <span className="bg-[#e1dfdb] px-2 py-0.5 rounded">
                          {item.sustainabilityRating.toFixed(1)} / 10
                        </span>
                      </div>

                      <div className="h-10 text-xs font-mono text-[#1b1c1c] flex items-center">
                        {item.ecoScoreDetails.waterSavedLiters.toLocaleString()} L
                      </div>

                      <div className="h-10 text-xs font-mono font-semibold text-[#1b1c1c] flex items-center">
                        ${cpw}
                      </div>

                      <div className="h-10 text-xs text-[#5e5e5b] flex items-center">
                        {item.origin}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
