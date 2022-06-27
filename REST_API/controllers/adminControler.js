const router = require("express").Router();
const api = require("../services/comicsServices");

router.get("/:id", async (req, res) => {
  try {
    let item = await api.getData(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(404).json({ message: `Item ${id} not found` });
  }
});

router.post("/", async (req, res) => {
  const item = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: (Math.random() * 10).toFixed(2),
    year: req.body.year,
    author: req.body.author,
  };

  try {
    console.log(req.body);
    let result = await api.createData(item);

    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(400).json({ message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("delete ssssssss");
  try {
    const result = await api.deleteData(id);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: `Item ${id} not found` });
  }
});

module.exports = router;
