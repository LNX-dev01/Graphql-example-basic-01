import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  roleType: { type: String, required: true },
  shiftType: { type: String, required: true },
}, { timestamps: true });

export const RoleModel = model("Role", roleSchema);



// import { Schema, model, Document } from "mongoose";

// export interface BookDocument extends Document {
//   title: string;
//   author: string;
// }

// const bookSchema = new Schema<BookDocument>({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
// });

// export const BookModel = model<BookDocument>("Book", bookSchema);
