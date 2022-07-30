const router = require("express").Router();
const ownerApi = require("../services/userServices");
const { isAuth, isOwner } = require("../middlewares/isGuard");
const api = require("../services/orderServices");
const preload = require("../middlewares/preload");

router.get("/my-data/:id", async (req, res) => {
  try {
    let orders = await ownerApi.getUserData(req.params.id);
    let history = orders.orderHistory;

    res.json({ history: history });
  } catch (err) {
    res.status(400).json({ message: "Request error" });
  }
});
router.get("/:id", preload(api), async (req, res) => {
  res.json(res.locals.item);
});
router.put("/:id", preload(api), isOwner(), async (req, res) => {
  try {
    const result = await api.updateData(res.locals.item, req.body);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
router.delete("/:id", preload(api), isAuth(), isOwner(), async (req, res) => {
  const id = req.params.id;

  try {
    const result = await api.deleteData(id);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: `Item ${id} not found` });
  }
});

module.exports = router;
