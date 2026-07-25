import React from 'react';

interface TopNavProps {
  activeTab: 'discover' | 'listings' | 'compare' | 'wardrobe';
  setActiveTab: (tab: 'discover' | 'listings' | 'compare' | 'wardrobe') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  wardrobeCount: number;
  compareCount: number;
  openSearchModal: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  wardrobeCount,
  compareCount,
  openSearchModal,
}) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 h-20 bg-[#fbf9f9]/80 backdrop-blur-md border-b border-black/5 transition-transform duration-300">
      <div className="flex items-center gap-8 md:gap-12">
        <button
          onClick={() => setActiveTab('discover')}
          className="text-[#1b1c1c] font-serif font-bold text-2xl md:text-3xl tracking-tighter hover:opacity-80 transition-opacity text-left"
        >
          STRIP THE LABEL
        </button>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setActiveTab('discover')}
            className={`font-sans text-sm font-semibold tracking-wider transition-colors py-1 ${
              activeTab === 'discover'
                ? 'text-[#1b1c1c] border-b-2 border-[#1b1c1c]'
                : 'text-[#444748] hover:text-[#1b1c1c]'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`font-sans text-sm font-semibold tracking-wider transition-colors py-1 ${
              activeTab === 'listings'
                ? 'text-[#1b1c1c] border-b-2 border-[#1b1c1c]'
                : 'text-[#444748] hover:text-[#1b1c1c]'
            }`}
          >
            Listings
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`font-sans text-sm font-semibold tracking-wider transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'text-[#1b1c1c] border-b-2 border-[#1b1c1c]'
                : 'text-[#444748] hover:text-[#1b1c1c]'
            }`}
          >
            Compare
            {compareCount > 0 && (
              <span className="bg-[#1b1c1c] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {compareCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('wardrobe')}
            className={`font-sans text-sm font-semibold tracking-wider transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'wardrobe'
                ? 'text-[#1b1c1c] border-b-2 border-[#1b1c1c]'
                : 'text-[#444748] hover:text-[#1b1c1c]'
            }`}
          >
            Wardrobe
            {wardrobeCount > 0 && (
              <span className="bg-[#1b1c1c] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {wardrobeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Desktop Search */}
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#444748] text-xl">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search materials, weave..."
            className="pl-10 pr-4 py-2 bg-[#efeded] border-none rounded-full text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#1b1c1c] w-48 lg:w-64 transition-all placeholder:text-[#747878]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] hover:text-[#1b1c1c]"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={openSearchModal}
          className="sm:hidden p-2 text-[#1b1c1c] hover:bg-[#efeded] rounded-full transition-colors"
          title="Search"
        >
          <span className="material-symbols-outlined text-2xl">search</span>
        </button>

        {/* Wardrobe Quick Action */}
        <button
          onClick={() => setActiveTab('wardrobe')}
          className="relative p-2 text-[#1b1c1c] hover:bg-[#efeded] rounded-full transition-all active:scale-90"
          title="Wardrobe Saved Items"
        >
          <span className="material-symbols-outlined text-[28px]">
            bookmark
          </span>
          {wardrobeCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#1b1c1c] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wardrobeCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
