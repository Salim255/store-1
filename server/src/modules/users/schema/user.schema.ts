import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema({ timestamps: true })
export class User extends Document {
  //Hey, this class will have an _id property of type string available at runtime.
  declare _id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  })
  email: string;

  @Prop({ required: [true, 'Please provide a password'], minlength: 8 })
  password: string;

  @Prop({
    required: [true, 'Please provide password confirm!'],
    minlength: 8,
    // This only works on SAVE and CREATE but not update
    validate: function (this: User, passwordConfirm: string) {
      return this.password === passwordConfirm;
    },
  })
  passwordConfirm?: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    enum: ['customer', 'admin', 'manager'],
    default: 'customer',
  })
  role: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

const userSchema = SchemaFactory.createForClass(User);

// Here we define pre middleware hook on save, so to perform tasks before saving document
userSchema.pre('save', async function (next): Promise<void> {
  // We want only to encrypt the password field if the password been updated or created
  if (!this.isModified('password')) return next();

  // Here we will use a very well-known and well-studied algorithm called bcrypt
  // First the algorithm will salt then hash the password to make it strong to protect it against brute force  attacks
  // Salts just means it's gonna add a random string to the password so that two equal password do not generate the same hash

  // 1) Hashing the password,  12(cost) here for salt and CPU intensive
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the password confirm
  this.passwordConfirm = undefined;

  next();
});

// Instance methods, will be available on all documents on a certain collection
userSchema.methods.correctPassword = async function (
  comingPassword: string,
  storedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(comingPassword, storedPassword);
};

export const UserSchema = userSchema;
