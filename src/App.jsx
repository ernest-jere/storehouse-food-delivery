import React, { useState } from 'react';
import { MENU_ITEMS } from './data/menuData';
import SplashScreen from './components/SplashScreen';
import CatalogView from './components/CatalogView';
import ItemCustomizer from './components/ItemCustomizer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccess from './components/OrderSuccess';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(MENU_ITEMS[0]);
  const [favorites, setFavorites] = useState([1]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setScreen('customizer');
  };

  // Add a customized item into the multi-item shopping cart
  const handleAddToCart = (configuredEntry) => {
    const signature = `${configuredEntry.item.id}-${configuredEntry.spiceLabel}-${configuredEntry.toppings
      .map((t) => t.id)
      .sort()
      .join(',')}-${configuredEntry.sides
      .map((s) => s.id)
      .sort()
      .join(',')}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((entry) => entry.cartId === signature);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + configuredEntry.quantity
        };
        return updated;
      }
      return [...prev, { ...configuredEntry, cartId: signature }];
    });

    setScreen('catalog');
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId, delta) => {
    setCartItems((prev) =>
      prev
        .map((entry) =>
          entry.cartId === cartId ? { ...entry, quantity: entry.quantity + delta } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartId) => {
    setCartItems((prev) => prev.filter((entry) => entry.cartId !== cartId));
  };

  const totalCartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div
      className={`min-h-screen flex justify-center items-start bg-neutral-900 py-6 sm:py-10 px-4 ${
        darkMode ? 'dark-theme' : ''
      }`}
    >
      {/* Mobile-First Viewport Frame with Top & Bottom Margin */}
      <div className="w-full max-w-md min-h-[85vh] rounded-2xl bg-semantic-bg-canvas text-semantic-text-primary shadow-2xl relative overflow-hidden transition-colors duration-200">
        {screen === 'splash' && (
          <SplashScreen onStart={() => setScreen('catalog')} />
        )}

        {screen === 'catalog' && (
          <CatalogView
            items={MENU_ITEMS}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectItem={handleSelectItem}
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode((prev) => !prev)}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {screen === 'customizer' && selectedItem && (
          <ItemCustomizer
            item={selectedItem}
            isFavorite={favorites.includes(selectedItem.id)}
            onToggleFavorite={() => toggleFavorite(selectedItem.id)}
            onBack={() => setScreen('catalog')}
            onAddToCart={handleAddToCart}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {screen === 'checkout' && (
          <CheckoutModal
            cartItems={cartItems}
            onBack={() => setScreen('catalog')}
            onConfirmPayment={() => setScreen('success')}
          />
        )}

        {screen === 'success' && (
          <OrderSuccess
            cartItems={cartItems}
            onReturnHome={() => {
              setCartItems([]);
              setScreen('catalog');
            }}
          />
        )}

        {/* Slide-Over Multi-Item Shopping Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setScreen('checkout');
          }}
        />
      </div>
    </div>
  );
}
