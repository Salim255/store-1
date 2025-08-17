export interface Order {
  _id: string;
  items: any[];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  taxPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
