import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    pincode: String,
    phone: String,
    city: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("Address", AddressSchema);
