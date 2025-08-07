import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  //Hey, this class will have an _id property of type string available at runtime.
  declare _id: Types.ObjectId;
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: Types.ObjectId;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        name: String,
        price: Number,
        amount: Number,
        image: String,
      },
    ],
    required: true,
  })
  items: {
    productId: Types.ObjectId;
    name: string;
    price: number;
    amount: number;
    image: string;
  }[];
  @Prop({ required: true })
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
  };

  @Prop({
    required: true,
    enum: ['credit_card', 'paypal'],
  })
  paymentMethod: string;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop()
  paidAt?: Date;

  @Prop()
  deliveredAt?: Date;

  @Prop({ required: true })
  itemsPrice: number;

  @Prop({ required: true })
  shippingPrice: number;

  @Prop({ required: true })
  totalPrice: number;
  @Prop({ required: true })
  taxPrice: number;
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

const orderSchema = SchemaFactory.createForClass(Order);

export const OrderSchema = orderSchema;
