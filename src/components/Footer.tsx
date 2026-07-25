import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#efeded] border-t border-black/5 mt-20">
      <div className="max-w-[1280px] mx-auto w-full py-16 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <span className="text-2xl font-serif font-bold text-[#1b1c1c] tracking-tighter block">
            STRIP THE LABEL
          </span>
          <p className="text-xs text-[#5e5e5b] mt-2 font-medium">
            © 2024 STRIP THE LABEL. Free from brand noise, logos, and price tags.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs font-medium">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(
                'SUSTAINABILITY MANIFESTO:\n\n1. Zero Brand Noise: Garments exist solely on fiber integrity.\n2. Regenerative Soil Sourcing: 100% GOTS Cotton & Masters of Linen.\n3. Micro-batch Traceability: Full visibility into artisan mills.'
              );
            }}
            className="text-[#5e5e5b] hover:text-[#1b1c1c] underline transition-opacity opacity-80 hover:opacity-100"
          >
            Sustainability Manifesto
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('COMMUNITY STANDARDS:\nUnbiased curation, non-retouched fiber macro-photography, and verifiable supply-chain credentials.');
            }}
            className="text-[#5e5e5b] hover:text-[#1b1c1c] underline transition-opacity opacity-80 hover:opacity-100"
          >
            Community Standards
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('PRIVACY POLICY:\nZero user tracking cookies, encrypted local wardrobe storage.');
            }}
            className="text-[#5e5e5b] hover:text-[#1b1c1c] underline transition-opacity opacity-80 hover:opacity-100"
          >
            Privacy
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('TERMS:\nFair labor compliance, open-source material metrics.');
            }}
            className="text-[#5e5e5b] hover:text-[#1b1c1c] underline transition-opacity opacity-80 hover:opacity-100"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};
