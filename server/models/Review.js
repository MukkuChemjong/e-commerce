import mongoose from "mongoose";

const ProductReviewSchema = new mongoose.Schema(
  {
    productId: "String",
    userId: "String",
    reviewMessage: "String",
    reviewValue: "Number",
    userName: "String",
  },
  {
    timestamps: true,
  }
);

export const ProductReview = mongoose.model("Review", ProductReviewSchema);
