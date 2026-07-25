import React, { useState } from 'react';

interface RequirementFilterProps {
  currentPrompt: string;
  onApplyRequirement: (prompt: string, selectedTags: string[]) => void;
  onClearRequirement: () => void;
  activeMatchCount: number;
  totalCount: number;
}

const PRESET_REQUIREMENTS = [
  {
    label: 'Warm climate organic cotton & linen',
    prompt: 'Lightweight breathable organic cotton or linen for warm weather',
    tags: ['Organic Cotton', 'Heavy Linen', 'Oversized', 'Lounge', 'Essential'],
  },
  {
    label: 'Formal atelier silk & tailoring',
    prompt: 'High-end Mulberry silk or merino wool for elevated atelier occasions',
    tags: ['Mulberry Silk', 'Merino Wool', 'Atelier'],
  },
  {
    label: 'Ultra-durable, high longevity index (90%+)',
    prompt: 'Dense heavy weave garments with 90%+ durability or longevity rating',
    tags: ['Organic Cotton', 'Heavy Linen', 'Technical'],
  },
  {
    label: 'Regenerative eco-certified staples',
    prompt: 'Regenerative and eco-certified materials with top sustainability scores',
    tags: ['Grade A', 'Eco-Certified', 'Zero-Waste'],
  },
];

export const RequirementFilter: React.FC<RequirementFilterProps> = ({
  currentPrompt,
  onApplyRequirement,
  onClearRequirement,
  activeMatchCount,
  totalCount,
}) => {
  const [inputText, setInputText] = useState(currentPrompt);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() || selectedTags.length > 0) {
      onApplyRequirement(inputText.trim(), selectedTags);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_REQUIREMENTS[0]) => {
    setInputText(preset.prompt);
    setSelectedTags(preset.tags);
    onApplyRequirement(preset.prompt, preset.tags);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="bg-[#efeded] border border-[#1b1c1c]/15 p-6 md:p-8 rounded-xs mb-10 shadow-xs transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c4c7c7] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1b1c1c] text-xl">
              tune
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1b1c1c]">
              Requirement Engine
            </span>
            {currentPrompt && (
              <span className="bg-[#1b1c1c] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                Active Filter Applied
              </span>
            )}
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1b1c1c] mt-1">
            Specify What You Truly Want
          </h2>
          <p className="text-xs text-[#5e5e5b] mt-0.5">
            Describe your garment requirement in plain language or select desired qualities. We strip away brand noise to present exact structural matches.
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold uppercase tracking-widest text-[#1b1c1c] hover:underline flex items-center gap-1 self-start md:self-auto"
        >
          <span>{isExpanded ? 'Collapse Engine' : 'Expand Requirement Finder'}</span>
          <span className="material-symbols-outlined text-base">
            {isExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Natural Language Prompt Input */}
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. I need a heavy organic cotton boxy tee or liquid silk trousers for a warm atelier evening..."
              className="w-full bg-[#fbf9f9] border border-[#c4c7c7] focus:border-[#1b1c1c] focus:ring-1 focus:ring-[#1b1c1c] py-3.5 pl-4 pr-28 text-sm text-[#1b1c1c] placeholder:text-[#747878] font-sans transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#1b1c1c] text-white text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
          </div>

          {/* Quick Preset Prompts */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#747878] mb-2.5">
              Or Choose A Common Intent Requirement:
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_REQUIREMENTS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`text-xs px-3 py-1.5 border transition-all text-left flex items-center gap-1.5 ${
                    inputText === preset.prompt
                      ? 'border-[#1b1c1c] bg-[#1b1c1c] text-white font-medium'
                      : 'border-[#c4c7c7] bg-[#fbf9f9] text-[#1b1c1c] hover:border-[#1b1c1c]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Status & Clear controls */}
          {(currentPrompt || selectedTags.length > 0) && (
            <div className="pt-4 border-t border-[#c4c7c7] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#1b1c1c]">
                <span className="font-bold">Matching Results:</span>
                <span className="font-mono bg-white px-2 py-0.5 border border-[#c4c7c7] font-semibold">
                  {activeMatchCount} of {totalCount} Garments
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInputText('');
                  setSelectedTags([]);
                  onClearRequirement();
                }}
                className="text-xs font-bold uppercase tracking-widest text-[#1b1c1c] underline hover:opacity-80 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                Clear Requirement Filter
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
