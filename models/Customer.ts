import {model, models, Schema} from "mongoose";

const customerSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false}, // secure by default
    phone: {type: String},
    address: {type: String},
  },
  {timestamps: true}
);

// ❌ remove any pre-save hook if you are hashing in the route
// otherwise you’ll double-hash and bcrypt.compare() will always fail

const Customer = models.Customer || model("Customer", customerSchema);
export default Customer;
