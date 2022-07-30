const User = require("../models/User");

exports.getUserData = async (id) => {
  const userData = await User.findById(id).populate("orderHistory");

  if (!userData) {
    throw new Error("Sory someting when wrong!");
  }
  return userData;
};
