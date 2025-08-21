// models/Product.ts
import {model, models, Schema, Types} from "mongoose";

const ProductSchema = new Schema(
  {
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    image: {type: String, default: ""},
    special: {type: Boolean, default: false},
    percentage: {type: Number, default: 0},

    // Relationship: Each Product belongs to ONE Category
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true
    },
  },
  {timestamps: true}
);

export default models.Product || model("Product", ProductSchema);
