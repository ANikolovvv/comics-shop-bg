const Comics = require("../models/Comics");

exports.getAllComics = async () => {
  return await Comics.find({}).lean();
};
exports.getById = async (id) => {
  const comic = await Comics.findById(id);

  if (!comic) {
    throw new Error("Sory someting when wrong!");
  }
  return comic;
};
exports.deleteData = async (id) => {
  return await Comics.findByIdAndDelete(id);
};
exports.createData = async (order) => {
  let newOrder = await Comics.create(order);

  return newOrder;
};
exports.comicsAddLike = async (user, id) => {
  const comic = await Comics.findById(id).populate("userLiked");
  if (!comic) {
    throw new Error("Sory someting when wrong!");
  }
  comic.userLiked.push(user);
  comic.save();
  return comic;
};
