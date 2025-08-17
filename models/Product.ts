// models/Product.ts
import {model, models, Schema} from "mongoose";

const ProductSchema = new Schema(
  {

    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    image: {type: String, required: false, default: ""},
  },
  {timestamps: true}
);

export default models.Product || model("Product", ProductSchema);
