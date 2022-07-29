const mongoose = require("mongoose");
require('dotenv').config();


async function db() {

  try {
    await mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, dbName: "comics-shop"});
    console.log("DB is working :)");
  } catch (err) {
    console.log(err, "Error in Datebase !");
  }
}
module.exports = db;
