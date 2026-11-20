import React from 'react';
import { Check } from 'lucide-react';

export default function OrderSuccess({ cartItems, onReturnHome }) {
  const totalItemsCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-screen-pad bg-semantic-bg-surface-subtle">
      <div className="w-full p-8 rounded-lg bg-semantic-bg-canvas border border-semantic-border-default shadow-xl text-center space-y-6">
        {/* Crimson Success Checkmark Badge */}
        <div className="w-20 h-20 rounded-full bg-semantic-brand-primary text-white flex items-center justify-center mx-auto shadow-lg">
          <Check size={40} strokeWidth={3} />
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h2 className="text-heading-h1 text-semantic-brand-primary">Success!</h2>
          <p className="text-body-regular text-semantic-text-secondary text-semantic-text-secondary leading-relaxed">
            Your payment was successful.
            <br />A receipt for this purchase has been sent to your email.
          </p>

          {cartItems.length > 0 && (
            <div className="pt-3 space-y-1">
              <p className="text-body-small font-bold text-semantic-text-primary">
                Preparing {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} for delivery:
              </p>
              <div className="text-[11px] text-semantic-text-secondary text-semantic-text-secondary space-y-0.5">
                {cartItems.map((entry) => (
                  <p key={entry.cartId}>
                    {entry.quantity}x {entry.item.name} ({entry.spiceLabel})
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Go Back Button */}
        <button
          onClick={onReturnHome}
          className="w-full py-4 px-6 rounded-lg bg-semantic-brand-primary text-white text-button-label shadow-md cursor-pointer hover:bg-semantic-brand-primary-hover hover:text-neutral-charcoal-900 active:scale-[0.98] transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}




