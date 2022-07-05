const mongoose = require("mongoose");

const comicsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String},
  imageUrl: { type: String, required: true },
  price: { type: Number, default: true },
  year: { type: Number, required: true },
  userLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  author: { type: String, required: true },
});

const Comics = mongoose.model("Comics", comicsSchema);

module.exports = Comics;
