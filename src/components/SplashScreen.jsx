import React from 'react';
import { ArrowRight } from 'lucide-react';
import burger4 from '../assets/images/burger6.png';


export default function SplashScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-semantic-bg-splash text-semantic-text-inverse px-screen-pad py-12 relative overflow-hidden">
      {/* Subtle Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      {/* Top Spacer */}
      <div className="pt-8" />

      {/* Center Brand Wordmark & Hero Visual */}
      <div className="flex flex-col items-center text-center z-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-logo-splash tracking-wide drop-shadow-md">
            StoreHouse
          </h1>
          <p className="text-body-regular text-white/90 max-w-xs mx-auto">
            Flame-grilled gourmet burgers, sliders, and craft combos delivered hot to your door.
          </p>
        </div>

        {/* Hero Burger Showcase Image */}
        <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl my-4">
          <img
            src={burger6}
            alt="StoreHouse Signature Burger"
            className="w-full h-full object-cover scale-105"
          />
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="z-10 pt-6">
        <button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-lg bg-neutral-white text-neutral-charcoal-900 text-button-label shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-neutral-gray-50 active:scale-[0.98] transition-all"
        >
          <span>Explore Menu</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
