const Comic = require("../models/Comics");
const User = require("../models/User");
const Order = require("../models/Order");

exports.createData = async (order) => {
  let newOrder = await Order.create(order);
  let userdata = await User.findById(newOrder._ownerId);

  userdata.orderHistory.push(newOrder._id);
  userdata.save();
  return newOrder;
};

exports.shareData = async (id, user) => {
  let order = await Comic.findById(id);

  order.userLiked.push(user);
  order.save();
};
exports.getAll = async () => {
  return await Comic.find({}).lean();
};
exports.getById = async (id) => {
  return await Order.findById(id);
};

exports.updateData = async (existing, item) => {
  existing.title = item.title;
  existing.author = item.author;
  existing.email = item.email;
  existing.address = item.address;
  existing.courier = item.courier;
  existing.number = item.number;
  existing.payment = item.payment;
  existing.price = (Math.random() * 10 * item.number).toFixed(2);
  existing._ownerId = existing._ownerId;

  await existing.save();

  return existing;
};
exports.deleteData = async (id) => {
  return await Order.findByIdAndDelete(id);
};
exports.searchData = async (type) => {
  const regExp = new RegExp(`^${type}`, "i");
  const match = await Comic.find({ title: { $regex: regExp } }).lean();
  const author = await Comic.find({ author: { $regex: regExp } }).lean();
  if (match.length > 0) {
    return match;
  } else if (author.length > 0) {
    return author;
  } else {
    return author;
  }
};
