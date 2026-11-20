import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  const subtotalZAR = cartItems.reduce(
    (sum, entry) => sum + entry.unitPriceZAR * entry.quantity,
    0
  );

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs">
      {/* Backdrop click target */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-Up Drawer Panel */}
      <div className="w-full max-h-[82vh] rounded-t-2xl bg-semantic-bg-canvas text-semantic-text-primary border-t border-semantic-border-default shadow-2xl flex flex-col overflow-hidden">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-screen-pad py-4 border-b border-semantic-border-default">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-semantic-brand-primary" />
            <h2 className="text-heading-h2">Your Order Bag</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-semantic-brand-primary/15 text-semantic-brand-primary">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full bg-semantic-bg-surface border border-semantic-border-default flex items-center justify-center cursor-pointer hover:opacity-80"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-screen-pad py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-heading-card text-semantic-text-primary">Your bag is empty</p>
              <p className="text-body-small text-semantic-text-secondary dark:text-neutral-gray-400">
                Customize a burger or combo from the menu to add it here.
              </p>
            </div>
          ) : (
            cartItems.map((entry) => (
              <div
                key={entry.cartId}
                className="p-3.5 rounded-lg bg-semantic-bg-surface border border-semantic-border-default flex gap-3 items-start"
              >
                <img
                  src={entry.item.image}
                  alt={entry.item.name}
                  className="w-16 h-16 rounded-md object-cover shrink-0 bg-semantic-bg-surface-subtle"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-body-regular font-bold text-semantic-text-primary truncate">
                      {entry.item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(entry.cartId)}
                      aria-label="Remove item"
                      className="text-neutral-gray-400 hover:text-semantic-brand-primary cursor-pointer p-0.5"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <p className="text-[11px] text-semantic-text-secondary dark:text-neutral-gray-400 leading-snug">
                    Spice: <span className="font-semibold">{entry.spiceLabel}</span>
                    {entry.toppings.length > 0 &&
                      ` • +${entry.toppings.map((t) => t.name).join(', ')}`}
                    {entry.sides.length > 0 &&
                      ` • +${entry.sides.map((s) => s.name).join(', ')}`}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-body-small font-bold text-semantic-brand-primary">
                      R {(entry.unitPriceZAR * entry.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(entry.cartId, -1)}
                        className="w-6 h-6 rounded bg-semantic-bg-surface-subtle flex items-center justify-center cursor-pointer hover:opacity-80"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-body-small font-bold w-4 text-center">
                        {entry.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(entry.cartId, 1)}
                        className="w-6 h-6 rounded bg-semantic-brand-primary text-white flex items-center justify-center cursor-pointer hover:opacity-90"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="px-screen-pad py-4 border-t border-semantic-border-default bg-semantic-bg-surface space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-body-regular text-semantic-text-secondary dark:text-neutral-gray-400">
                Bag Subtotal
              </span>
              <span className="text-heading-h2 text-semantic-text-primary">
                R {subtotalZAR.toFixed(2)}
              </span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-6 rounded-lg bg-semantic-brand-primary text-white text-button-label shadow-md cursor-pointer hover:bg-semantic-brand-primary-hover hover:text-neutral-charcoal-900 active:scale-[0.98] transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
