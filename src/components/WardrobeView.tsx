import React from 'react';
import { Garment } from '../data/garments';

interface WardrobeViewProps {
  wardrobeItems: Garment[];
  onRemoveFromWardrobe: (garment: Garment) => void;
  onOpenDetail: (garment: Garment) => void;
  onExploreMore: () => void;
}

export const WardrobeView: React.FC<WardrobeViewProps> = ({
  wardrobeItems,
  onRemoveFromWardrobe,
  onOpenDetail,
  onExploreMore,
}) => {
  const totalInvestment = wardrobeItems.reduce((acc, item) => acc + item.price, 0);
  const totalWaterSaved = wardrobeItems.reduce(
    (acc, item) => acc + item.ecoScoreDetails.waterSavedLiters,
    0
  );
  const totalCarbonOffset = wardrobeItems.reduce(
    (acc, item) => acc + item.ecoScoreDetails.carbonOffsetKg,
    0
  );
  const avgSustainability = wardrobeItems.length
    ? (
        wardrobeItems.reduce((acc, item) => acc + item.sustainabilityRating, 0) /
        wardrobeItems.length
      ).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#c4c7c7] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#747878]">
            Curated Capsule Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1b1c1c] mt-1">
            My Wardrobe Manifesto
          </h1>
        </div>

        {wardrobeItems.length > 0 && (
          <button
            onClick={() => {
              const manifestoText = `STRIP THE LABEL Capsule Wardrobe (${
                wardrobeItems.length
              } garments):\n${wardrobeItems
                .map((i) => `- ${i.name} (${i.fabricType})`)
                .join('\n')}\nTotal Water Saved: ${totalWaterSaved.toLocaleString()} L`;
              navigator.clipboard.writeText(manifestoText);
              alert('Wardrobe manifesto copied to clipboard!');
            }}
            className="px-4 py-2 border border-[#1b1c1c] text-xs font-bold uppercase tracking-widest hover:bg-[#1b1c1c] hover:text-white transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-base">content_copy</span>
            Export Manifesto
          </button>
        )}
      </div>

      {wardrobeItems.length === 0 ? (
        <div className="py-20 text-center bg-[#f5f3f3] p-8 border border-[#c4c7c7] max-w-xl mx-auto space-y-4">
          <span className="material-symbols-outlined text-5xl text-[#747878]">
            bookmark_border
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#1b1c1c]">
            Your Wardrobe Capsule is Empty
          </h3>
          <p className="text-sm text-[#5e5e5b] max-w-md mx-auto">
            Save items from the catalog to build a deliberate, high-fidelity wardrobe based on material integrity and timeless utility.
          </p>
          <button
            onClick={onExploreMore}
            className="mt-4 px-8 py-3 bg-[#1b1c1c] text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors"
          >
            Explore Garments
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#efeded] p-5 border-l-2 border-[#1b1c1c]">
              <div className="text-[10px] uppercase tracking-widest text-[#747878] font-semibold">
                Capsule Value
              </div>
              <div className="font-serif text-2xl font-bold text-[#1b1c1c] mt-1 font-mono">
                ${totalInvestment.toLocaleString()}
              </div>
            </div>

            <div className="bg-[#efeded] p-5 border-l-2 border-[#1b1c1c]">
              <div className="text-[10px] uppercase tracking-widest text-[#747878] font-semibold">
                Water Preserved
              </div>
              <div className="font-serif text-2xl font-bold text-[#1b1c1c] mt-1 font-mono">
                {totalWaterSaved.toLocaleString()} L
              </div>
            </div>

            <div className="bg-[#efeded] p-5 border-l-2 border-[#1b1c1c]">
              <div className="text-[10px] uppercase tracking-widest text-[#747878] font-semibold">
                CO₂ Offset
              </div>
              <div className="font-serif text-2xl font-bold text-[#1b1c1c] mt-1 font-mono">
                {totalCarbonOffset.toFixed(1)} kg
              </div>
            </div>

            <div className="bg-[#efeded] p-5 border-l-2 border-[#1b1c1c]">
              <div className="text-[10px] uppercase tracking-widest text-[#747878] font-semibold">
                Avg Sustainability
              </div>
              <div className="font-serif text-2xl font-bold text-[#1b1c1c] mt-1 font-mono">
                {avgSustainability} / 10
              </div>
            </div>
          </div>

          {/* Garments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wardrobeItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#f5f3f3] border border-[#c4c7c7] group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#efeded]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onOpenDetail(item)}
                    />
                    <button
                      onClick={() => onRemoveFromWardrobe(item)}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white transition-colors shadow-xs"
                      title="Remove from Wardrobe"
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3
                        onClick={() => onOpenDetail(item)}
                        className="font-serif text-xl font-bold text-[#1b1c1c] cursor-pointer hover:underline"
                      >
                        {item.name}
                      </h3>
                      <span className="font-mono text-sm font-bold text-[#1b1c1c]">
                        ${item.price}
                      </span>
                    </div>

                    <div className="text-xs text-[#747878]">{item.composition}</div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded border border-black/10 text-[10px] uppercase text-[#5e5e5b] font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenDetail(item)}
                    className="w-full py-2.5 border border-[#1b1c1c] text-xs font-bold uppercase tracking-widest text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white transition-colors"
                  >
                    Inspect Material Specs
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
