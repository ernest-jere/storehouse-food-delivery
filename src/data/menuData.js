import burger1 from '../assets/images/burger1.png';
import burger2 from '../assets/images/burger2.png';
import burger3 from '../assets/images/burger3.png';
import burger4 from '../assets/images/burger4.png';

export const CATEGORIES = ['All', 'Combos', 'Sliders', 'Classic', 'Chicken'];

export const MENU_ITEMS = [
  {
    id: 1,
    name: "Cheeseburger Wendy's",
    subtitle: 'Double Aged Cheddar & Brioche',
    category: 'Classic',
    rating: 4.9,
    prepTime: '26 mins',
    basePriceZAR: 115.00,
    description:
      'Flame-grilled pure beef patty layered with melted aged cheddar, crisp lettuce, vine-ripened tomato, pickles, and our signature smoky StoreHouse glaze on a toasted brioche bun.',
    image: burger4
  },
  {
    id: 2,
    name: 'Hamburger Veggie Burger',
    subtitle: 'Chargrilled Portobello & Avocado',
    category: 'Sliders',
    rating: 4.8,
    prepTime: '20 mins',
    basePriceZAR: 98.00,
    description:
      'Hearty plant-based patty topped with smashed avocado, roasted red peppers, wild rocket, and garlic herb aioli on a multigrain bun.',
    image: burger3
  },
  {
    id: 3,
    name: 'Hamburger Chicken Burger',
    subtitle: 'Crispy Buttermilk & Jalapeño Slaw',
    category: 'Chicken',
    rating: 4.6,
    prepTime: '22 mins',
    basePriceZAR: 108.00,
    description:
      'Golden buttermilk-fried chicken breast tossed in spicy honey glaze, finished with crunchy jalapeño slaw and tangy dill mayo.',
    image: burger2
  },
  {
    id: 4,
    name: 'Fried Chicken Combo',
    subtitle: 'Loaded Stack, Fries & Craft Soda',
    category: 'Combos',
    rating: 4.9,
    prepTime: '30 mins',
    basePriceZAR: 155.00,
    description:
      'Double crispy chicken burger served alongside seasoned skin-on rosemary fries, smoky BBQ dip, and an ice-cold craft beverage.',
    image: burger1
  }
];

export const TOPPINGS = [
  { id: 'tomato', name: 'Tomato', priceZAR: 8.00 },
  { id: 'onions', name: 'Crispy Onions', priceZAR: 10.00 },
  { id: 'pickles', name: 'Dill Pickles', priceZAR: 7.00 },
  { id: 'bacon', name: 'Smoked Bacon', priceZAR: 18.00 }
];

export const SIDE_OPTIONS = [
  { id: 'fries', name: 'Seasoned Fries', priceZAR: 25.00 },
  { id: 'coleslaw', name: 'Creamy Coleslaw', priceZAR: 18.00 },
  { id: 'salad', name: 'Garden Salad', priceZAR: 22.00 },
  { id: 'onion-rings', name: 'Onion Rings', priceZAR: 28.00 }
];
