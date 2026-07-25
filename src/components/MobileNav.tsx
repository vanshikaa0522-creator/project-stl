import React from 'react';

interface MobileNavProps {
  activeTab: 'discover' | 'listings' | 'compare' | 'wardrobe';
  setActiveTab: (tab: 'discover' | 'listings' | 'compare' | 'wardrobe') => void;
  openSearchModal: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  openSearchModal,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 md:hidden bg-[#fbf9f9]/90 backdrop-blur-md border-t border-black/5 shadow-md">
      <button
        onClick={() => setActiveTab('discover')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all ${
          activeTab === 'discover'
            ? 'bg-[#1c1b1b] text-white scale-100'
            : 'text-[#444748] hover:bg-[#e4e2e2]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">explore</span>
        <span className="text-[10px] font-medium">Discover</span>
      </button>

      <button
        onClick={openSearchModal}
        className="flex flex-col items-center justify-center text-[#444748] hover:bg-[#e4e2e2] px-3 py-1 rounded-full transition-all"
      >
        <span className="material-symbols-outlined text-xl">search</span>
        <span className="text-[10px] font-medium">Search</span>
      </button>

      <button
        onClick={() => setActiveTab('compare')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all ${
          activeTab === 'compare'
            ? 'bg-[#1c1b1b] text-white scale-100'
            : 'text-[#444748] hover:bg-[#e4e2e2]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">compare_arrows</span>
        <span className="text-[10px] font-medium">Compare</span>
      </button>

      <button
        onClick={() => setActiveTab('wardrobe')}
        className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all ${
          activeTab === 'wardrobe'
            ? 'bg-[#1c1b1b] text-white scale-100'
            : 'text-[#444748] hover:bg-[#e4e2e2]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">bookmark</span>
        <span className="text-[10px] font-medium">Wardrobe</span>
      </button>
    </nav>
  );
};
