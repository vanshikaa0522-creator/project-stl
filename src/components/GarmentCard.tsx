import React from 'react';
import { Garment } from '../data/garments';

interface GarmentCardProps {
  garment: Garment;
  onSelect: (garment: Garment) => void;
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent, garment: Garment) => void;
  isComparing: boolean;
  onToggleCompare: (e: React.MouseEvent, garment: Garment) => void;
  matchScore?: number;
}

export const GarmentCard: React.FC<GarmentCardProps> = ({
  garment,
  onSelect,
  isSaved,
  onToggleSave,
  isComparing,
  onToggleCompare,
  matchScore,
}) => {
  return (
    <div
      onClick={() => onSelect(garment)}
      className="group cursor-pointer flex flex-col justify-between h-full select-none"
    >
      <div>
        {/* Image Container */}
        <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-[#efeded] rounded-xs group-hover:shadow-lg transition-all duration-500">
          <img
            src={garment.image}
            alt={garment.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Match Score Badge */}
          {matchScore !== undefined && matchScore > 0 && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-[#1b1c1c] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                {matchScore}% Requirement Match
              </span>
            </div>
          )}

          {/* Top Right Badge */}
          {garment.badge && (
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <span className="bg-[#fbf9f9]/90 backdrop-blur-sm text-[#1b1c1c] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-black/5 shadow-xs">
                {garment.badge}
              </span>
            </div>
          )}

          {/* Quick Action Overlay Buttons */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Bookmark button */}
            <button
              onClick={(e) => onToggleSave(e, garment)}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
                isSaved
                  ? 'bg-[#1b1c1c] text-white'
                  : 'bg-[#fbf9f9]/80 text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white'
              }`}
              title={isSaved ? 'Remove from Wardrobe' : 'Save to Wardrobe'}
            >
              <span
                className={`material-symbols-outlined text-lg ${
                  isSaved ? 'filled' : ''
                }`}
              >
                bookmark
              </span>
            </button>

            {/* Compare checkbox button */}
            <button
              onClick={(e) => onToggleCompare(e, garment)}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
                isComparing
                  ? 'bg-[#1b1c1c] text-white'
                  : 'bg-[#fbf9f9]/80 text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white'
              }`}
              title={isComparing ? 'Remove from Compare' : 'Add to Compare'}
            >
              <span className="material-symbols-outlined text-lg">
                compare_arrows
              </span>
            </button>
          </div>

          {/* Bottom gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Content Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-start gap-2">
            <h2 className="font-serif text-2xl font-medium leading-tight text-[#1b1c1c] group-hover:opacity-80 transition-opacity">
              {garment.name}
            </h2>
            <div className="flex items-center gap-1 flex-shrink-0 pt-1">
              <span className="material-symbols-outlined text-[14px] text-[#1b1c1c] filled">
                star
              </span>
              <span className="text-xs font-bold font-mono">
                {garment.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {garment.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded border border-black/10 text-[10px] uppercase font-bold text-[#5e5e5b] tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar Metric */}
      <div className="pt-3 mt-3">
        <div className="w-full h-[2px] bg-[#c4c7c7] overflow-hidden rounded-full">
          <div
            className="h-full bg-[#1b1c1c] transition-all duration-1000 ease-out"
            style={{ width: `${garment.metricValue}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1.5 text-[10px] uppercase text-[#747878] tracking-wider font-medium">
          <span>
            {garment.metricLabel}: {garment.metricValue}%
          </span>
          <span className="font-semibold text-[#1b1c1c]">${garment.price}</span>
        </div>
      </div>
    </div>
  );
};
