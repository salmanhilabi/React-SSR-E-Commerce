import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Products = new Schema({
  category: {
    type: String,
    required: true,
  },
  frontImg: {
    type: String,
    required: true,
  },
  otherImg: {
    type: Array,
    required: true,
  },
  stockQty: {
    type: Number,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  mainPrice: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("products", Products);
