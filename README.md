# 🍔 StoreHouse: End-to-End Food Delivery UX/UI & React App

[![Deployment Status](https://shields.io)](https://storehouse-food-delivery.vercel.app/)
[![Figma Prototype](https://shields.io)](https://www.figma.com/proto/jduPg8DbrCNQgYeFY03sn1/Food-Delivery-App?node-id=5-23&t=vguybGSR1v9E3DLM-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2)
[![Tailwind CSS v4](https://shields.io)](https://github.com/ernest-jere/storehouse-food-delivery/blob/main/src/index.css)

A mobile-first, full-stack frontend food delivery application built with **React**, **Tailwind CSS v4**, and **Vite**. Designed from the ground up to demonstrate a true **Design-to-Code pipeline**, this project translates high-fidelity Figma prototypes and multi-mode Figma Variables into production CSS custom properties using a custom Node.js compiler script.

**🔗 Live Production App:** [https://vercel.app](https://storehouse-food-delivery.vercel.app/)  
**🎨 Interactive Figma Prototype:** [View in Figma](https://www.figma.com/proto/jduPg8DbrCNQgYeFY03sn1/Food-Delivery-App?node-id=5-23&t=vguybGSR1v9E3DLM-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2)

---

## 🎨 Design-to-Code Token Architecture

Rather than hardcoding hex values or font sizes, StoreHouse uses a single-source-of-truth token workflow:

1. **Figma Local Variables & Text Styles:** Color primitives, semantic Light/Dark aliases (`bg/canvas`, `text/primary`, `brand/primary`), corner radii, spacing, and typography (`Lobster`, `Poppins`, `Roboto`) are defined in Figma and exported to [`tokens.json`](./tokens.json).
2. **Automated Node.js Compiler ([`parse-tokens.js`](./parse-tokens.js)):** Resolves nested Figma alias references (`{neutral.white}`), separates Light (`:root`) and Dark (`.dark-theme`) semantic scopes, and generates [`src/index.css`](./src/index.css) with native Tailwind CSS v4 `@theme` and `@utility` directives.

---

## 🚀 Key Application Features

- **Brand Splash & Interactive Menu Catalog:** Features a signature crimson splash screen, real-time keyword search, category filter pills (*All*, *Combos*, *Sliders*, *Classic*, *Chicken*), and a saved Favourites filter.
- **Dynamic Meal Customizer:** Includes an interactive **Spice Level slider** (*Mild*, *Medium*, *Extra Hot*), portion steppers, and toggleable **Toppings** and **Side Options** that recalculate unit prices in real time.
- **Multi-Item Slide-Over Order Bag:** Allows users to configure and bundle multiple customized burgers or combos, adjust item quantities, or remove items before checkout.
- **ZAR Checkout & Receipt Flow:** Calculates item subtotals, **15% South African VAT**, and delivery fees in **ZAR (`R`)**, complete with card selection and an animated order confirmation screen.
- **Light & Dark Theme Switching:** Instantly switches the entire interface between Light and Dark semantic variable collections.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19, Vite, JavaScript (ES Modules)
- **Styling & Design System:** Tailwind CSS v4 (`@theme` & `@utility` directives)
- **Design Token Tooling:** Figma Variables, W3C `tokens.json`, Node.js `fs` Compiler (`parse-tokens.js`)
- **Icons & Assets:** Lucide React, Vite Static Asset Bundling
- **Hosting & CI/CD:** GitHub & Vercel

---

## 📁 Project Structure

```text
storehouse-food-delivery/
├── src/
│   ├── assets/
│   │   └── images/              # Bundled gourmet burger & combo PNGs
│   ├── components/
│   │   ├── SplashScreen.jsx     # Crimson brand splash screen
│   │   ├── CatalogView.jsx      # Search, category pills, favourites & food grid
│   │   ├── ItemCustomizer.jsx   # Spice slider, portion stepper & add-on toggles
│   │   ├── CartDrawer.jsx       # Slide-over multi-item shopping bag
│   │   ├── CheckoutModal.jsx    # Itemized ZAR summary, 15% VAT & payment cards
│   │   └── OrderSuccess.jsx     # Order confirmation receipt view
│   ├── data/
│   │   └── menuData.js          # Menu catalog, toppings, sides & ZAR pricing
│   ├── App.jsx                  # Multi-screen state, cart & theme orchestrator
│   ├── main.jsx                 # React root entry point
│   └── index.css                # Auto-generated Tailwind v4 @theme stylesheet
├── parse-tokens.js              # Node.js Figma-to-Tailwind v4 compiler script
├── tokens.json                  # Exported Figma design variables schema
├── vite.config.js               # Vite + Tailwind CSS v4 plugin configuration
└── package.json                 # Token build, dev & deploy scripts
```

---

## 🏎️ Local Setup & Deployment

### 1. Clone & Install Dependencies
```bash
git clone https://github.com
cd storehouse-food-delivery
npm install
```

### 2. Compile Figma Design Tokens
```bash
npm run tokens
```

### 3. Start Local Development Server
```bash
npm run dev
```

### 4. Build & Deploy to Production
```bash
npm run deploy
```
