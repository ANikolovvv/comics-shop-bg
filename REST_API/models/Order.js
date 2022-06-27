const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  title: { type: String, required: [true, "All fields are required"] },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: true },
  _ownerId: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
