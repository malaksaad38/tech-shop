import {model, models, Schema} from "mongoose";

// models/Order.ts
const OrderSchema = new Schema(
  {
    products: [
      {
        product: {type: Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required: true, default: 1},
        price: {type: Number, required: true},
      },
    ],
    totalAmount: {type: Number, required: true},
    customer: {type: Schema.Types.ObjectId, ref: "Customer"}, // ✅ reference actual customer
    customerInfo: {
      name: String,
      email: String,
      address: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },
  },
  {timestamps: true}
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;
