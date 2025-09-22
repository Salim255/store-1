import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Use @Schema to define this class as a Mongoose schema
@Schema({ timestamps: true }) // Automatically adds createdAt & updatedAt fields
export class Product extends Document {
  @Prop({
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({ type: String, required: true })
  company: string;

  // Detailed description of the product
  @Prop({ required: true })
  description: string;

  // Array of image URLs
  @Prop({ type: [String], required: true })
  images: string[];

  // Base price of the product (before discount)
  @Prop({ required: true })
  price: number;

  // Is the product available in the store?
  @Prop({ default: true })
  isActive: boolean;

  // Soft delete (instead of removing the product from DB)
  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  category: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: false })
  shipping: boolean;

  @Prop({ default: 50 })
  shippingPrice: number;

  @Prop({ type: [String], required: true })
  colors: string[];

  /**
   * Embedded array of product reviews
   * Each review has: userId (who posted it), rating, comment, and timestamp
   */
  @Prop({
    type: [
      {
        userId: { type: Types.ObjectId, ref: 'User' },
        rating: Number,
        comment: String,
        createdAt: Date,
      },
    ],
    default: [],
  })
  reviews: {
    userId: Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  // Automatically calculated number of reviews
  @Prop({ default: 0 })
  totalReviews: number;

  // Automatically calculated average rating (e.g. 4.5)
  @Prop({ default: 0 })
  averageRating: number;
}

// Generate Mongoose schema from the class definition
export const ProductSchema = SchemaFactory.createForClass(Product);

// Add a text index for full-text search with weights
ProductSchema.index(
  {
    name: 'text',
    description: 'text',
    company: 'text',
    category: 'text',
    colors: 'text',
  },
  {
    // That weights object in the MongoDB text index is telling Mongo how important each field is.
    weights: {
      name: 5, // most important
      description: 2,
      company: 3,
      category: 2,
      colors: 1, // least important
    },
    default_language: 'english',
  },
);
