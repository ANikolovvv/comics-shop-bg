const router = require("express").Router();

const api = require("../services/orderServices");
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
        year:req.body.year,
        image:req.body.image,
        price:(Math.random() * 10).toFixed(2),
        _ownerId:req.user._id
      }
       
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
router.get("/details/:id", preload(api), async (req, res) => {
  console.log('dataaaaaaaa')
  res.json(res.locals.item);
});
router.get("/rent/:id", async (req, res) => {
  await api.shareData(req.params.id, req.user._id);
  res.redirect(`/data/details/${req.params.id}`);
});

// router.get("/search", async (req, res) => {});
// router.post("/search", async (req, res) => {
//   console.log(req.body);
//   const query = req.body.search.trim();
//   //let have = query != "";
//   await api.searchData(query);
// });

module.exports = router;
