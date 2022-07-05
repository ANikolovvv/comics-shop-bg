const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  orderHistory: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
});
const User = mongoose.model("User", userSchema);
module.exports = User;
