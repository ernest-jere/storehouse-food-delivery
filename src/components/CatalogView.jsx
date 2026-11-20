import React, { useState } from 'react';
import { Search, Star, Heart, Sun, Moon, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import { CATEGORIES } from '../data/menuData';

export default function CatalogView({
  items,
  favorites,
  onToggleFavorite,
  onSelectItem,
  darkMode,
  onToggleTheme,
  cartCount,
  onOpenCart
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = !showFavoritesOnly || favorites.includes(item.id);
    return matchesCategory && matchesSearch && matchesFav;
  });

  return (
    <div className="min-h-[85vh] flex flex-col px-screen-pad pt-6 pb-10 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-logo text-3xl text-semantic-brand-primary tracking-wide">
            StoreHouse
          </h1>
          <p className="text-body-small text-neutral-gray-600 text-semantic-text-secondary">
            Order your favourite food!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFavoritesOnly((prev) => !prev)}
            title="Toggle Saved Favourites"
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              showFavoritesOnly
                ? 'bg-semantic-brand-primary text-white border-semantic-brand-primary'
                : 'bg-semantic-bg-surface border-semantic-border-default text-semantic-text-primary'
            }`}
          >
            <Heart size={18} className={showFavoritesOnly ? 'fill-current' : ''} />
          </button>

          <button
            onClick={onToggleTheme}
            title="Switch Light / Dark Theme"
            className="w-10 h-10 rounded-full bg-semantic-bg-surface border border-semantic-border-default flex items-center justify-center text-semantic-text-primary cursor-pointer hover:opacity-80 transition-all"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onOpenCart}
            title="Open Order Bag"
            className="relative w-10 h-10 rounded-full bg-semantic-brand-primary text-white flex items-center justify-center shadow-sm cursor-pointer hover:opacity-90 transition-all"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neutral-charcoal-900 text-white text-[10px] font-bold flex items-center justify-center border-2 border-semantic-bg-canvas">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar & Filter Icon */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-md bg-semantic-bg-surface border border-semantic-border-default shadow-xs">
          <Search size={18} className="text-neutral-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search burgers, combos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-body-regular text-semantic-text-primary placeholder:text-neutral-gray-400 outline-none"
          />
        </div>
        <div className="w-12 h-12 rounded-md bg-semantic-brand-primary text-white flex items-center justify-center shadow-md shrink-0">
          <SlidersHorizontal size={20} />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-body-regular font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-semantic-brand-primary text-white shadow-sm'
                  : 'bg-semantic-bg-surface-subtle text-neutral-gray-600 text-semantic-text-secondary hover:opacity-80'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 2-Column Food Catalog Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center space-y-2">
          <p className="text-heading-card text-semantic-text-primary">No items found</p>
          <p className="text-body-small text-neutral-gray-600 text-semantic-text-secondary">
            Try clearing your search or switching categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="p-3 rounded-lg bg-semantic-bg-surface border border-semantic-border-default shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                {/* Item Thumbnail */}
                <div className="w-full h-28 rounded-md overflow-hidden mb-3 bg-semantic-bg-surface-subtle">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-0.5 mb-3">
                  <h3 className="text-heading-card text-semantic-text-primary line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-body-small text-neutral-gray-600 text-semantic-text-secondary line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                {/* Price, Rating & Favourite Row */}
                <div className="flex items-center justify-between pt-2 border-t border-semantic-border-default">
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="text-semantic-status-rating fill-semantic-status-rating"
                    />
                    <span className="text-body-small font-semibold text-semantic-text-primary">
                      {item.rating}
                    </span>
                  </div>

                  <span className="text-body-small font-bold text-semantic-brand-primary">
                    R {item.basePriceZAR.toFixed(0)}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    aria-label="Toggle favourite"
                    className="p-1 text-semantic-text-primary hover:text-semantic-brand-primary transition-colors cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={
                        isFav ? 'text-semantic-brand-primary fill-semantic-brand-primary' : ''
                      }
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
