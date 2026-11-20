import React, { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle2 } from 'lucide-react';

export default function CheckoutModal({ cartItems, onBack, onConfirmPayment }) {
  const [selectedCard, setSelectedCard] = useState('mastercard');
  const [saveCard, setSaveCard] = useState(true);

  const subtotalZAR = cartItems.reduce(
    (sum, entry) => sum + entry.unitPriceZAR * entry.quantity,
    0
  );

  const deliveryFeeZAR = 25.00;
  const vatRate = 0.15; // 15% South African VAT
  const vatAmountZAR = subtotalZAR * vatRate;
  const finalTotalZAR = subtotalZAR + vatAmountZAR + deliveryFeeZAR;

  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-screen-pad pt-6 pb-8 space-y-6">
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Back to menu"
            className="w-10 h-10 rounded-full bg-semantic-bg-surface border border-semantic-border-default flex items-center justify-center text-semantic-text-primary cursor-pointer hover:opacity-80"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-heading-h2 text-semantic-text-primary">Order Summary</h1>
        </div>

        {/* Multi-Item Order Recap */}
        <div className="p-4 rounded-lg bg-semantic-bg-surface border border-semantic-border-default divide-y divide-semantic-border-default max-h-48 overflow-y-auto">
          {cartItems.map((entry) => (
            <div key={entry.cartId} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
              <div className="flex justify-between items-center gap-2">
                <h3 className="text-body-regular font-bold text-semantic-text-primary truncate">
                  {entry.quantity}x {entry.item.name}
                </h3>
                <span className="text-body-small font-bold text-semantic-brand-primary shrink-0">
                  R {(entry.unitPriceZAR * entry.quantity).toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-semantic-text-secondary text-semantic-text-secondary">
                Spice: <span className="font-semibold">{entry.spiceLabel}</span>
                {entry.toppings.length > 0 &&
                  ` • Toppings: ${entry.toppings.map((t) => t.name).join(', ')}`}
                {entry.sides.length > 0 &&
                  ` • Sides: ${entry.sides.map((s) => s.name).join(', ')}`}
              </p>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 px-1">
          <div className="flex justify-between text-body-regular text-semantic-text-secondary text-semantic-text-secondary">
            <span>Order ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
            <span>R {subtotalZAR.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-body-regular text-semantic-text-secondary text-semantic-text-secondary">
            <span>VAT (15%)</span>
            <span>R {vatAmountZAR.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-body-regular text-semantic-text-secondary text-semantic-text-secondary">
            <span>Delivery fees</span>
            <span>R {deliveryFeeZAR.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-heading-card text-semantic-text-primary pt-3 border-t border-semantic-border-default">
            <span>Total:</span>
            <span>R {finalTotalZAR.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-body-small font-semibold text-semantic-text-primary pt-1">
            <span>Estimated delivery time:</span>
            <span>15 - 30 mins</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h3 className="text-heading-card text-semantic-text-primary">Payment methods</h3>

          <button
            onClick={() => setSelectedCard('mastercard')}
            className={`w-full p-4 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
              selectedCard === 'mastercard'
                ? 'bg-neutral-charcoal-900 text-white border-neutral-charcoal-900 shadow-md'
                : 'bg-semantic-bg-surface border-semantic-border-default text-semantic-text-primary'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard size={22} className="text-semantic-status-rating" />
              <div className="text-left">
                <p className="text-body-regular font-semibold">Credit card</p>
                <p className="text-body-small opacity-75">5105 •••• •••• 0505</p>
              </div>
            </div>
            <CheckCircle2
              size={20}
              className={selectedCard === 'mastercard' ? 'text-white' : 'opacity-25'}
            />
          </button>

          <button
            onClick={() => setSelectedCard('visa')}
            className={`w-full p-4 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
              selectedCard === 'visa'
                ? 'bg-neutral-charcoal-900 text-white border-neutral-charcoal-900 shadow-md'
                : 'bg-semantic-bg-surface border-semantic-border-default text-semantic-text-primary'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard size={22} className="text-sky-400" />
              <div className="text-left">
                <p className="text-body-regular font-semibold">Debit card</p>
                <p className="text-body-small opacity-75">3566 •••• •••• 0505</p>
              </div>
            </div>
            <CheckCircle2
              size={20}
              className={selectedCard === 'visa' ? 'text-white' : 'opacity-25'}
            />
          </button>

          <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="w-4 h-4 accent-brand-crimson-600 rounded cursor-pointer"
            />
            <span className="text-body-small text-semantic-text-secondary text-semantic-text-secondary">
              Save card details for future payments
            </span>
          </label>
        </div>
      </div>

      {/* Bottom Total & Pay Now Button */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-semantic-border-default">
        <div>
          <p className="text-body-small text-semantic-text-secondary text-semantic-text-secondary">
            Total price
          </p>
          <p className="text-heading-h2 text-semantic-text-primary">
            <span className="text-semantic-brand-primary">R</span> {finalTotalZAR.toFixed(2)}
          </p>
        </div>

        <button
          onClick={onConfirmPayment}
          className="flex-1 py-4 px-6 rounded-lg bg-neutral-charcoal-900 text-white text-button-label shadow-lg cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
