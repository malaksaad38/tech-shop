// models/Category.ts
import {model, models, Schema} from "mongoose";

// A simple helper to slugify the name
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // Replace spaces with -
    .replace(/[^\w\-]+/g, "")   // Remove all non-word chars
    .replace(/\-\-+/g, "-");    // Replace multiple - with single -

const CategorySchema = new Schema(
  {
    name: {type: String, required: true},
    value: {type: String, required: false},
  },
  {timestamps: true}
);

// Middleware to generate slug before saving
CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.value = slugify(this.name);
  }
  next();
});

// Optional: virtual to "populate" products inside category
CategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});

export default models.Category || model("Category", CategorySchema);
