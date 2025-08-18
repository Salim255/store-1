import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/modules/product/schema/product.schema';

@Schema()
export class ShippingFields {
  @Prop({ required: true }) fullName: string;
  @Prop({ required: true }) address: string;
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) country: string;
  @Prop({ required: true }) postalCode: string;
  @Prop({ required: true }) phone: string;
}

@Schema()
export class OrderItems {
  @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
  productId: Types.ObjectId;
  name: string;
  price: number;
  @Prop({ required: true })
  amount: number;
  image: string;
}

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
    type: [OrderItems],
    required: true,
  })
  items: OrderItems[];

  @Prop({ type: ShippingFields, required: true })
  shippingAddress: ShippingFields;

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
