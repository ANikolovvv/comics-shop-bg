const router = require("express").Router();

const { isAuth, isOwner } = require("../middlewares/isGuard");
const api = require("../services/orderServices");
const preload = require("../middlewares/preload");

router.get("/:id", preload(api), async (req, res) => {
  //let item = await api.getData(req.params.id);
  res.json(res.locals.item);
});
router.put("/:id", preload(api), isOwner(), async (req, res) => {
  console.log("editvbb hhh put");
  try {
    const result = await api.updateData(res.locals.item, req.body);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Request error" });
  }
});
router.delete("/:id", isAuth(), isOwner(), async (req, res) => {
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
