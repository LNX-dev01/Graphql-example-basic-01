import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
}, { timestamps: true });

export const EmployeeModel = model("Employee", employeeSchema);
