export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface StoreProduct {
  name: string;
  category: string;
  price: number;
  quantityPerSize: { [key in Size]: number }; // required for per-size quantities
}






