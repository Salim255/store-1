export interface OrderItem {
  productId: subProduct;
  amount: number;
}

export interface subProduct {
  _id: string;
  name: string;
  description: string;
  images: string [];
  price: number;
}

export interface Order {
  _id: string;
  items: OrderItem [];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  taxPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
