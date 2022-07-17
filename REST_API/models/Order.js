const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  title: { type: String, required: [true, "All fields are required"] },
  author: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  courier: { type: String, required: true ,enum:{values:['econt','speedy'],message:'Courier must be between Speedy or Econt!' }},
  number:{type:Number,required:true},
  payment: { type: String, required: true ,enum:['cash-delivery','credit-card','debit-card']},
  price: { type: Number, default: true },
  _ownerId: { type: mongoose.Types.ObjectId, ref: "User" },
});
///    const ctx = { title, author, email, address,courier,payment };
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
