import { type } from 'os';

export type InventoryItem = {
  description: string;
  price: number;
  soldForPrice: number | null;
};

const inventory = [
  { description: 'Tshirt', price: 100, soldForPrice: null },
  { description: 'Squash racket', price: 15, soldForPrice: null },
  { description: 'Badminton racket', price: 15, soldForPrice: null },
];

export default inventory;
