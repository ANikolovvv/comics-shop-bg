const router = require("express").Router();
const dataServices = require("../services/orderServices");
const comicServices = require("../services/comicsServices");

router.get("/", async (req, res) => {
  try {
    let data = await comicServices.getAllComics();
    req.setTimeout(1000);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
});

module.exports = router;
