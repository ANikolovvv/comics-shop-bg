const express = require("express");
const port =  process.env.PORT || "3030"
const db = require("./config/datebase");
 const auth = require("./middlewares/isAuth");
const router = require("./config/routes");
const cors = require("./middlewares/cors");
const app = express();

startServer();

async function startServer() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(auth());
  app.use(router)

  db();
  app.listen(port, () => console.log(`Server  is running on port ${port} (:`));
}
