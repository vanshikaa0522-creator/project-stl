import React, { useState } from 'react';
import { Garment, GARMENTS_DATA } from '../data/garments';

interface ListingsViewProps {
  onOpenDetail: (garment: Garment) => void;
  savedIds: string[];
  onToggleSave: (garment: Garment) => void;
  compareIds: string[];
  onToggleCompare: (garment: Garment) => void;
}

export const ListingsView: React.FC<ListingsViewProps> = ({
  onOpenDetail,
  savedIds,
  onToggleSave,
  compareIds,
  onToggleCompare,
}) => {
  const [sortBy, setSortBy] = useState<
    'sustainability' | 'rating' | 'priceAsc' | 'priceDesc' | 'longevity'
  >('sustainability');
  const [filterFabric, setFilterFabric] = useState<string>('All');

  const fabrics = ['All', 'Organic Cotton', 'Mulberry Silk', 'Merino Wool', 'Heavy Linen'];

  let items = [...GARMENTS_DATA];
  if (filterFabric !== 'All') {
    items = items.filter((i) => i.fabricType === filterFabric);
  }

  items.sort((a, b) => {
    if (sortBy === 'sustainability') return b.sustainabilityRating - a.sustainabilityRating;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'longevity') return b.metricValue - a.metricValue;
    return 0;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#c4c7c7] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#747878]">
            Complete Inventory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1b1c1c] mt-1">
            Garment Listings & Metrics
          </h1>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#747878] uppercase font-semibold">Fabric:</span>
            <select
              value={filterFabric}
              onChange={(e) => setFilterFabric(e.target.value)}
              className="bg-[#efeded] border-none px-3 py-1.5 rounded text-[#1b1c1c] font-medium focus:ring-1 focus:ring-[#1b1c1c]"
            >
              {fabrics.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#747878] uppercase font-semibold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#efeded] border-none px-3 py-1.5 rounded text-[#1b1c1c] font-medium focus:ring-1 focus:ring-[#1b1c1c]"
            >
              <option value="sustainability">Sustainability Rating (High-Low)</option>
              <option value="rating">User Rating (High-Low)</option>
              <option value="priceAsc">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
              <option value="longevity">Longevity Index</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table view */}
      <div className="overflow-x-auto border border-[#c4c7c7]">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#efeded] text-[11px] uppercase tracking-wider font-bold text-[#1b1c1c] border-b border-[#c4c7c7]">
              <th className="py-3 px-4">Garment</th>
              <th className="py-3 px-4">Fabric</th>
              <th className="py-3 px-4">Origin</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Eco Index</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e2e2] text-xs">
            {items.map((item) => {
              const isSaved = savedIds.includes(item.id);
              const isComparing = compareIds.includes(item.id);

              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#f5f3f3] transition-colors group"
                >
                  <td
                    className="py-3 px-4 font-bold text-[#1b1c1c] flex items-center gap-3 cursor-pointer"
                    onClick={() => onOpenDetail(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-12 object-cover bg-[#efeded]"
                    />
                    <div>
                      <span className="font-serif text-sm block group-hover:underline">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#747878] font-mono">
                        {item.badge || 'Standard'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#5e5e5b] font-medium">
                    {item.fabricType}
                  </td>
                  <td className="py-3 px-4 text-[#747878]">{item.origin}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#1b1c1c]">
                    ${item.price}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#1b1c1c] filled">
                        star
                      </span>
                      {item.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="bg-[#e1dfdb] px-2 py-0.5 rounded font-bold">
                      {item.sustainabilityRating.toFixed(1)} / 10
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => onToggleSave(item)}
                      className={`p-1.5 rounded transition-colors ${
                        isSaved
                          ? 'bg-[#1b1c1c] text-white'
                          : 'hover:bg-[#e4e2e2] text-[#1b1c1c]'
                      }`}
                      title={isSaved ? 'Saved in Wardrobe' : 'Save to Wardrobe'}
                    >
                      <span className={`material-symbols-outlined text-base ${isSaved ? 'filled' : ''}`}>
                        bookmark
                      </span>
                    </button>
                    <button
                      onClick={() => onToggleCompare(item)}
                      className={`p-1.5 rounded transition-colors ${
                        isComparing
                          ? 'bg-[#1b1c1c] text-white'
                          : 'hover:bg-[#e4e2e2] text-[#1b1c1c]'
                      }`}
                      title={isComparing ? 'Comparing' : 'Compare'}
                    >
                      <span className="material-symbols-outlined text-base">
                        compare_arrows
                      </span>
                    </button>
                    <button
                      onClick={() => onOpenDetail(item)}
                      className="px-2.5 py-1 border border-[#1b1c1c] text-[10px] font-bold uppercase tracking-wider hover:bg-[#1b1c1c] hover:text-white transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
