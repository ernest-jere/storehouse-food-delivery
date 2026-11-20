import React, { useState } from 'react';
import { ArrowLeft, Heart, Star, Clock, Minus, Plus, Check, ShoppingBag } from 'lucide-react';
import { TOPPINGS, SIDE_OPTIONS } from '../data/menuData';

export default function ItemCustomizer({
  item,
  isFavorite,
  onToggleFavorite,
  onBack,
  onAddToCart,
  cartCount,
  onOpenCart
}) {
  const [spiceLevel, setSpiceLevel] = useState(35);
  const [portions, setPortions] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);

  const toggleAddon = (id, list, setList) => {
    setList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toppingsTotal = selectedToppings.reduce((sum, id) => {
    const found = TOPPINGS.find((t) => t.id === id);
    return sum + (found ? found.priceZAR : 0);
  }, 0);

  const sidesTotal = selectedSides.reduce((sum, id) => {
    const found = SIDE_OPTIONS.find((s) => s.id === id);
    return sum + (found ? found.priceZAR : 0);
  }, 0);

  const unitPriceZAR = item.basePriceZAR + toppingsTotal + sidesTotal;
  const grandTotalZAR = unitPriceZAR * portions;

  const getSpiceLabel = () => {
    if (spiceLevel <= 30) return { text: 'Mild', color: 'text-semantic-status-success' };
    if (spiceLevel <= 70) return { text: 'Medium', color: 'text-semantic-status-rating' };
    return { text: 'Extra Hot', color: 'text-semantic-brand-primary' };
  };

  const spiceBadge = getSpiceLabel();

  const handleAdd = () => {
    onAddToCart({
      item,
      quantity: portions,
      spiceLevel,
      spiceLabel: spiceBadge.text,
      toppings: TOPPINGS.filter((t) => selectedToppings.includes(t.id)),
      sides: SIDE_OPTIONS.filter((s) => selectedSides.includes(s.id)),
      unitPriceZAR
    });
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-screen-pad pt-6 pb-8 space-y-6">
      <div className="space-y-5">
        {/* Top Bar with Back, Favourite & Cart Bag */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            aria-label="Back to catalog"
            className="w-10 h-10 rounded-full bg-semantic-bg-surface border border-semantic-border-default flex items-center justify-center text-semantic-text-primary cursor-pointer hover:opacity-80"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleFavorite}
              aria-label="Favourite item"
              className="w-10 h-10 rounded-full bg-semantic-bg-surface border border-semantic-border-default flex items-center justify-center text-semantic-text-primary cursor-pointer hover:opacity-80"
            >
              <Heart
                size={18}
                className={
                  isFavorite ? 'text-semantic-brand-primary fill-semantic-brand-primary' : ''
                }
              />
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Open order bag"
              className="relative w-10 h-10 rounded-full bg-semantic-brand-primary text-white flex items-center justify-center shadow-sm cursor-pointer hover:opacity-90"
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

        {/* Hero Item Image */}
        <div className="w-full h-52 rounded-lg overflow-hidden bg-semantic-bg-surface shadow-md">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* Title, Rating & Prep Time */}
        <div className="space-y-2">
          <h1 className="text-heading-h1 text-semantic-text-primary">{item.name}</h1>
          <div className="flex items-center gap-4 text-body-small text-semantic-text-secondary text-semantic-text-secondary">
            <span className="inline-flex items-center gap-1 font-semibold text-semantic-text-primary">
              <Star size={15} className="text-semantic-status-rating fill-semantic-status-rating" />
              {item.rating}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              {item.prepTime}
            </span>
          </div>
          <p className="text-body-regular text-semantic-text-secondary text-semantic-text-secondary leading-relaxed pt-1">
            {item.description}
          </p>
        </div>

        {/* Spice Level Slider & Portion Counter Row */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-lg bg-semantic-bg-surface border border-semantic-border-default space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-body-small font-semibold text-semantic-text-primary">Spicy</span>
              <span className={`text-body-small font-bold ${spiceBadge.color}`}>
                {spiceBadge.text}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={spiceLevel}
              onChange={(e) => setSpiceLevel(Number(e.target.value))}
              className="w-full accent-brand-crimson-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-semantic-status-success">Mild</span>
              <span className="text-semantic-brand-primary">Hot</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-semantic-bg-surface border border-semantic-border-default flex flex-col justify-between">
            <span className="text-body-small font-semibold text-semantic-text-primary">
              Portion
            </span>
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setPortions((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-md bg-semantic-brand-primary text-white flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-transform"
              >
                <Minus size={16} />
              </button>
              <span className="text-heading-h2 text-semantic-text-primary">{portions}</span>
              <button
                onClick={() => setPortions((p) => p + 1)}
                className="w-9 h-9 rounded-md bg-semantic-brand-primary text-white flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-transform"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
                {/* Extra Toppings Selector */}
        <div className="space-y-2.5">
          <h3 className="text-heading-card text-semantic-text-primary">Toppings</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {TOPPINGS.map((topping) => {
              const active = selectedToppings.includes(topping.id);
              return (
                <button
                  key={topping.id}
                  onClick={() => toggleAddon(topping.id, selectedToppings, setSelectedToppings)}
                  className={`p-3 rounded-md border flex items-center justify-between text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-neutral-charcoal-900 text-white border-neutral-charcoal-900'
                      : 'bg-semantic-bg-surface border-semantic-border-default text-semantic-text-primary'
                  }`}
                >
                  <div>
                    <p className="text-body-small font-semibold">{topping.name}</p>
                    <p className="text-[11px] opacity-75">+ R {topping.priceZAR.toFixed(0)}</p>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      active ? 'bg-semantic-brand-primary text-white' : 'bg-semantic-bg-surface-subtle'
                    }`}
                  >
                    {active ? <Check size={12} /> : <Plus size={12} />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Side Options Selector */}
        <div className="space-y-2.5">
          <h3 className="text-heading-card text-semantic-text-primary">Side Options</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {SIDE_OPTIONS.map((side) => {
              const active = selectedSides.includes(side.id);
              return (
                <button
                  key={side.id}
                  onClick={() => toggleAddon(side.id, selectedSides, setSelectedSides)}
                  className={`p-3 rounded-md border flex items-center justify-between text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-neutral-charcoal-900 text-white border-neutral-charcoal-900'
                      : 'bg-semantic-bg-surface border-semantic-border-default text-semantic-text-primary'
                  }`}
                >
                  <div>
                    <p className="text-body-small font-semibold">{side.name}</p>
                    <p className="text-[11px] opacity-75">+ R {side.priceZAR.toFixed(0)}</p>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      active ? 'bg-semantic-brand-primary text-white' : 'bg-semantic-bg-surface-subtle'
                    }`}
                  >
                    {active ? <Check size={12} /> : <Plus size={12} />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Price & Add to Bag CTA */}
      <div className="flex items-center gap-3 pt-4 border-t border-semantic-border-default">
        <div className="px-5 py-3.5 rounded-lg bg-semantic-brand-primary text-white text-heading-card shadow-md shrink-0">
          R {grandTotalZAR.toFixed(2)}
        </div>
        <button
          onClick={handleAdd}
          className="flex-1 py-4 px-6 rounded-lg bg-neutral-charcoal-900 text-white text-button-label uppercase tracking-wider shadow-lg cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}

