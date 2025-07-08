import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      image: String,
      price: String,
      name: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    pincode: String,
    city: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalStock: Number,
  orderDate: Date,
  updateOrderDate: Date,
  paymentId: String,
  payerId: String,
});

export const Order = mongoose.model("Order", OrderSchema);
