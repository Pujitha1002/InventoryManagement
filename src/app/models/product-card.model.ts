export interface SizeQuantity {
  size: string;
  quantity: number;
}

export interface ProductCard {
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
  lowStock: boolean;
  sizes: SizeQuantity[];
}