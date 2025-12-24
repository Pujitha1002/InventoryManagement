export interface Product {
  name: string;
  category: string;
  price: number;
  quantity: number;
  selectedSize?: 'S' | 'M' | 'L';
}

