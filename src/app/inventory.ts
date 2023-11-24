import { type } from 'os';

export type InventoryItem = {
  description: string;
  price: number;
  soldForPrice: number | null;
};

function alphabetical(a: InventoryItem, b: InventoryItem) {
  if (a.description < b.description) {
    return -1;
  }
  if (a.description > b.description) {
    return 1;
  }
  return 0;
}

const inventory = [
  { description: 'Squash racket', price: 15, soldForPrice: null },
  { description: 'Badminton racket', price: 15, soldForPrice: null },
  { description: 'Nike AIR trainers', price: 25, soldForPrice: null },
  { description: 'Phone', price: 10, soldForPrice: null },
  { description: 'Watercolor paper pad', price: 5, soldForPrice: null },
  {
    description: 'Guitar pedal power pack and leads',
    price: 6,
    soldForPrice: null,
  },
  {
    description: 'Stussy sweatshirt (black/green stripe)',
    price: 10,
    soldForPrice: null,
  },
  {
    description: 'YMC sweatshirt (lilac)',
    price: 15,
    soldForPrice: null,
  },
  {
    description: 'Albam shirt (white/ blue stripe)',
    price: 15,
    soldForPrice: null,
  },
  {
    description: 'Albam cycle cap (navy)',
    price: 10,
    soldForPrice: null,
  },
  {
    description: 'Woolrich winter coat (navy)',
    price: 65,
    soldForPrice: null,
  },
  {
    description: 'Looper guitar pedal',
    price: 15,
    soldForPrice: null,
  },
  {
    description: 'Christmas decorations',
    price: 10,
    soldForPrice: null,
  },
  {
    description: 'Guitar tuner',
    price: 6,
    soldForPrice: null,
  },
  {
    description: 'Cashmer scarf (tartan)',
    price: 15,
    soldForPrice: null,
  },
  {
    description: 'Baseball Cap Kansas City Katz',
    price: 20,
    soldForPrice: null,
  },
  {
    description: '48 Laws of Power - book by Robert Greene',
    price: 4,
    soldForPrice: null,
  },
  {
    description: 'Logs',
    price: 15,
    soldForPrice: null,
  },
  {
    description: 'Folk shirt (pink/blue check)',
    price: 13,
    soldForPrice: null,
  },
  {
    description: 'Universal Works white collared tshirt',
    price: 10,
    soldForPrice: null,
  },
  {
    description: 'YMC Muti-stripe tshirt',
    price: 8,
    soldForPrice: null,
  },
  {
    description: 'Folk Grey sweatshirt',
    price: 15,
    soldForPrice: null,
  },
  {
    description: 'Folk green assembly pants (mark)',
    price: 10,
    soldForPrice: null,
  },
  {
    description: 'How to Bake - book by Paul Hollywood',
    price: 4,
    soldForPrice: null,
  },
  {
    description: 'Folk grey tshirt with squigle motif',
    price: 10,
    soldForPrice: null,
  },
  {
    description: 'Amazon Fire stick (with remote)',
    price: 8,
    soldForPrice: null,
  },
  {
    description: 'EU plug adapter 1',
    price: 1,
    soldForPrice: null,
  },
  {
    description: 'EU plug adapter 2',
    price: 1,
    soldForPrice: null,
  },
  {
    description: 'Cable box (white)',
    price: 4,
    soldForPrice: null,
  },
  {
    description: 'Cycle Bike helmet',
    price: 8,
    soldForPrice: null,
  },
  {
    description: 'Tool box',
    price: 15,
    soldForPrice: null,
  },
];

export default inventory.sort(alphabetical);
