// models/Product.ts
import {model, models, Schema} from "mongoose";

const ProductSchema = new Schema(
  {
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    image: {type: String, required: false, default: ""},
    special: {type: Boolean, default: false},
    percentage: {type: Number, default: 0},
  },
  {timestamps: true}
);

export default models.Product || model("Product", ProductSchema);
