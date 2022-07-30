const router = require("express").Router();

const api = require("../services/orderServices");
const server = require("../services/comicsServices");
const userServices = require("../services/userServices");
const preload = require("../middlewares/preload");
const { isAuth } = require("../middlewares/isGuard");
const errorMapper = require("../util/errorMapper");
const { body, validationResult } = require("express-validator");

router.post(
  "/create",
  isAuth(),
  body("title")
    .isLength({ min: 3 })
    .withMessage("Name must be minimum 3 charactrs!"),
  body("author")
    .isLength({ min: 3 })
    .withMessage("Author must be minimum 3 charactrs!"),
  body("email").isEmail().withMessage("Email must be valid email!"),
  body("address")
    .isLength({ min: 10 })
    .withMessage("Address minimum 10 characters!"),

  async (req, res) => {
    let price = (Math.random() * 100 * req.body.number).toFixed(2);
    if (req.body.price) {
      price = req.body.price;
    }

    try {
      if (Number(req.body.number) === NaN) {
        throw new Error("Number is a string!");
      }
      let courier = req.body.courier.toLowerCase();

      const { errors } = validationResult(req);
      if (errors.length > 0) {
        let message = errors.map((x) => x.msg).join("\n");
        throw new Error(message);
      }

      const item = {
        title: req.body.title,
        author: req.body.author,
        email: req.body.email,
        address: req.body.address,
        courier: courier,
        number: req.body.number,
        payment: req.body.payment,
        price: price,
        _ownerId: req.user._id,
      };

      let result = await api.createData(item);

      res.status(201).json({ result });
    } catch (err) {
      console.log(err, "errrr");
      const message = errorMapper(err);
      res.status(400).json({ message });
    }
  }
);
router.get("/details/:id", preload(server), async (req, res) => {
  res.json(res.locals.item);
});

router.post("/search", async (req, res) => {
  const query = req.body.search.trim();

  try {
    const result = await api.searchData(query);

    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(404);
    res.json({ message: "Someting when wrong in search." });
  }
});
router.post("/like", isAuth(), async (req, res) => {
  try {
    let data = await server.comicsAddLike(req.body.user, req.body.comics);
    res.json(data);
    res.status(200);
  } catch (error) {
    res.status(404);
    res.json({ message: "Someting when wrong in like." });
  }
});
module.exports = router;
