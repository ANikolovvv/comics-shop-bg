const router = require("express").Router();

const api = require("../services/orderServices");
const server = require("../services/comicsServices");
const userServices = require("../services/userServices");
const preload = require('../middlewares/preload');
const { isAuth } = require("../middlewares/isGuard");
const errorMapper=require('../util/errorMapper')

router.post(
  "/create",
  isAuth(),
  async (req, res) => {
      const item={
        title:req.body.title,
        author:req.body.author,
        email:req.body.email,
        address:req.body.address,
        courier:req.body.courier,
        number:req.body.number,
        payment:req.body.payment,
        price:(Math.random() * 10).toFixed(2) * req.body.number,
        _ownerId:req.user._id
      }

       console.log(req.body,'paaaaa')
    try {
   
      console.log(req.body);
      let result = await api.createData(item);
      
      res.status(201).json({result});
    } catch (err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });
    }
  }
);
router.get("/details/:id", preload(server), async (req, res) => {
  console.log('dataaaaaaaa')
  res.json(res.locals.item);
});


// router.get("/search", async (req, res) => {});
// router.post("/search", async (req, res) => {
//   console.log(req.body);
//   const query = req.body.search.trim();
//   //let have = query != "";
//   await api.searchData(query);
// });

module.exports = router;
