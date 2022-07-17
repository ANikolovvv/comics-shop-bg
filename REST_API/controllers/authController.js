require("dotenv").config();

const { isUser, isGuest } = require("../middlewares/isGuard");
const authServices = require("../services/authServices");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

router.get("/register", (req, res) => {
  console.log("register");
  console.log(process.env.SALT_ROUNDS, "salt");
});

router.post("/register",
body("email").isLength({ min: 8 }).withMessage("Minimum 8 letters"),
body("password")
.isLength({ min: 4 })
.withMessage("Password length must be at least 4"),
 async (req, res) => {
  console.log("usertgrrt", req.body);
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      let message = errors.map((x) => x.msg).join("\n");
      throw new Error(message);
    }
      if(req.body.password!==req.body.rePass){
        throw new Error('Password dont match!')
      }
    const { email, password } = req.body;
    const result = await authServices.register(email, password);
    console.log("Token hasbeen created", result);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
   
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body, "login");
  try {
    const { email, password } = req.body;
    let result = await authServices.login(email, password);
    console.log("Token hasbeen created",result._id);
    req.like=result._id
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/logout", (req, res) => {
  console.log("logout");
   
  authServices.logout(req.user.token);
  res.json({ ok: true, status: 200, statusText: "ok", data: null });
  res.status(204).end();
});
module.exports = router;
