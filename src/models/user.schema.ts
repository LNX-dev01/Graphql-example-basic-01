import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  bookId: Schema.Types.ObjectId;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bookId:{ type: Schema.Types.ObjectId, ref: "Book", required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
