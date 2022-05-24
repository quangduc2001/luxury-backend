import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      strim: true,
      maxLength: 255,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      maxLength: 3000,
      required: true,
    },

    images: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      maxLength: 32,
      required: true,
    },
    discount: {
      type: Number,
      maxLength: 32,
    },
    quantity: {
      type: Number,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("Product", productSchema);
