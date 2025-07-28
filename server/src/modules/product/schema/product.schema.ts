import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Use @Schema to define this class as a Mongoose schema
@Schema({ timestamps: true }) // Automatically adds createdAt & updatedAt fields
export class Product extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  // Slug used for URLs like /products/super-shoes
  @Prop({ trim: true })
  slug: string;

  // Detailed description of the product
  @Prop()
  description: string;

  // Array of image URLs
  @Prop({ type: [String], default: [] })
  images: string[];

  /**
   * Product variants
   * Example: same product in different sizes or colors
   * Each variant has its own SKU, price, and quantity
   */
  @Prop({
    type: [
      {
        size: String,
        color: String,
        sku: String,
        price: Number,
        quantity: Number,
        isAvailable: Boolean,
      },
    ],
    default: [],
  })
  variants: {
    size?: string;
    color?: string;
    sku?: string;
    price: number;
    quantity: number;
    isAvailable: boolean;
  }[];

  // Base price of the product (before discount)
  @Prop({ required: true })
  basePrice: number;

  // Optional discount in percentage (e.g. 15%)
  @Prop({ default: 0 })
  discountPercent: number;

  // Is the product available in the store?
  @Prop({ default: true })
  isActive: boolean;

  // Soft delete (instead of removing the product from DB)
  @Prop({ default: false })
  isDeleted: boolean;

  // Tags for search/filter (e.g. "men", "shoes", "summer")
  @Prop({ type: [String], default: [] })
  tags: string[];

  // Reference to a Category collection (_id of category)
  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;

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
