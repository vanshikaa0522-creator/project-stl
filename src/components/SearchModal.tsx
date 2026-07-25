import React from 'react';
import { Garment, GARMENTS_DATA } from '../data/garments';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGarment: (garment: Garment) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectGarment,
}) => {
  const [query, setQuery] = React.useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? GARMENTS_DATA.filter(
        (g) =>
          g.name.toLowerCase().includes(query.toLowerCase()) ||
          g.fabricType.toLowerCase().includes(query.toLowerCase()) ||
          g.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          g.composition.toLowerCase().includes(query.toLowerCase()) ||
          g.origin.toLowerCase().includes(query.toLowerCase())
      )
    : GARMENTS_DATA.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-[#fbf9f9] text-[#1b1c1c] border border-black/10 shadow-2xl overflow-hidden rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[#c4c7c7] flex items-center gap-3 bg-[#f5f3f3]">
          <span className="material-symbols-outlined text-[#747878]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by material, origin, fit, or weave..."
            autoFocus
            className="w-full bg-transparent border-none text-base focus:outline-none placeholder:text-[#747878] font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#e4e2e2] rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3 divide-y divide-[#e4e2e2]">
          <div className="text-[10px] uppercase font-bold text-[#747878] tracking-widest pb-1">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Material Searches'}
          </div>

          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#747878]">
              No garments matching "{query}"
            </div>
          ) : (
            results.map((g) => (
              <div
                key={g.id}
                onClick={() => {
                  onSelectGarment(g);
                  onClose();
                }}
                className="pt-3 flex items-center justify-between hover:bg-[#efeded] p-2 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={g.image}
                    alt={g.name}
                    className="w-10 h-12 object-cover bg-[#efeded]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1b1c1c]">
                      {g.name}
                    </h4>
                    <span className="text-xs text-[#747878]">{g.fabricType} • {g.origin}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-[#1b1c1c] block">
                    ${g.price}
                  </span>
                  <span className="text-[10px] text-[#747878]">Rating: {g.rating}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
