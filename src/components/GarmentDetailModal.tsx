import React from 'react';
import { Garment } from '../data/garments';

interface GarmentDetailModalProps {
  garment: Garment | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (garment: Garment) => void;
  isComparing: boolean;
  onToggleCompare: (garment: Garment) => void;
}

export const GarmentDetailModal: React.FC<GarmentDetailModalProps> = ({
  garment,
  onClose,
  isSaved,
  onToggleSave,
  isComparing,
  onToggleCompare,
}) => {
  if (!garment) return null;

  const costPerWear = (garment.price / (garment.longevityMonths * 4)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-[#fbf9f9] text-[#1b1c1c] max-h-[90vh] overflow-y-auto rounded-none shadow-2xl border border-black/10 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-[#1b1c1c] hover:text-white text-[#1b1c1c] backdrop-blur-md flex items-center justify-center transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Left Image Section */}
        <div className="w-full md:w-1/2 bg-[#efeded] relative min-h-[360px] md:min-h-full">
          <img
            src={garment.image}
            alt={garment.name}
            className="w-full h-full object-cover min-h-[360px] md:min-h-[550px]"
          />
          {garment.badge && (
            <span className="absolute top-6 left-6 bg-[#fbf9f9]/90 backdrop-blur-sm text-[#1b1c1c] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-black/10">
              {garment.badge}
            </span>
          )}
        </div>

        {/* Right Details Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#747878] uppercase tracking-widest font-semibold mb-2">
                <span>{garment.fabricType}</span>
                <span>{garment.origin}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#1b1c1c]">
                {garment.name}
              </h2>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-semibold font-mono text-[#1b1c1c]">
                  ${garment.price}
                </span>
                <span className="text-xs text-[#747878] font-medium border-l border-[#c4c7c7] pl-3">
                  Est. ${costPerWear} / wear
                </span>
                <div className="ml-auto flex items-center gap-1 bg-[#efeded] px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm text-[#1b1c1c] filled">
                    star
                  </span>
                  <span className="text-xs font-bold font-mono">
                    {garment.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#5e5e5b] leading-relaxed">
              {garment.description}
            </p>

            {/* Tags & Fit */}
            <div className="space-y-2 pt-2 border-t border-[#e4e2e2]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1b1c1c]">
                Composition & Fit
              </div>
              <p className="text-xs text-[#444748] font-medium">
                {garment.composition}
              </p>
              <p className="text-xs text-[#747878]">Fit: {garment.fit}</p>
            </div>

            {/* Sustainability Impact Breakdown */}
            <div className="space-y-3 pt-4 border-t border-[#e4e2e2]">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1b1c1c]">
                  Sustainability Score
                </span>
                <span className="text-sm font-bold font-mono text-[#1b1c1c] bg-[#e1dfdb] px-2 py-0.5 rounded">
                  {garment.sustainabilityRating.toFixed(1)} / 10
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#efeded] p-3 rounded-xs">
                  <div className="text-[#747878] text-[10px] uppercase">Water Saved</div>
                  <div className="font-bold text-sm text-[#1b1c1c] font-mono mt-0.5">
                    {garment.ecoScoreDetails.waterSavedLiters.toLocaleString()} L
                  </div>
                </div>
                <div className="bg-[#efeded] p-3 rounded-xs">
                  <div className="text-[#747878] text-[10px] uppercase">CO₂ Offset</div>
                  <div className="font-bold text-sm text-[#1b1c1c] font-mono mt-0.5">
                    {garment.ecoScoreDetails.carbonOffsetKg} kg
                  </div>
                </div>
                <div className="bg-[#efeded] p-3 rounded-xs">
                  <div className="text-[#747878] text-[10px] uppercase">Recyclability</div>
                  <div className="font-bold text-sm text-[#1b1c1c] font-mono mt-0.5">
                    {garment.ecoScoreDetails.recyclabilityPct}%
                  </div>
                </div>
                <div className="bg-[#efeded] p-3 rounded-xs">
                  <div className="text-[#747878] text-[10px] uppercase">Fair Wage Score</div>
                  <div className="font-bold text-sm text-[#1b1c1c] font-mono mt-0.5">
                    {garment.ecoScoreDetails.workerFairWageScore} / 10
                  </div>
                </div>
              </div>
            </div>

            {/* Care Guide */}
            <div className="text-xs text-[#747878] bg-[#f5f3f3] p-3 border-l-2 border-[#1b1c1c]">
              <span className="font-bold text-[#1b1c1c] block mb-1 uppercase tracking-wider">
                Care Instructions:
              </span>
              {garment.washCare}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#e4e2e2]">
            <button
              onClick={() => onToggleSave(garment)}
              className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
                isSaved
                  ? 'bg-[#1b1c1c] text-white'
                  : 'border border-[#1b1c1c] text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white'
              }`}
            >
              <span className={`material-symbols-outlined text-base ${isSaved ? 'filled' : ''}`}>
                bookmark
              </span>
              {isSaved ? 'In Wardrobe' : 'Save to Wardrobe'}
            </button>

            <button
              onClick={() => onToggleCompare(garment)}
              className={`py-3 px-4 border text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 ${
                isComparing
                  ? 'border-[#1b1c1c] bg-[#1b1c1c] text-white'
                  : 'border-[#c4c7c7] text-[#1b1c1c] hover:border-[#1b1c1c]'
              }`}
              title="Compare with other garments"
            >
              <span className="material-symbols-outlined text-base">compare_arrows</span>
              {isComparing ? 'Comparing' : 'Compare'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
