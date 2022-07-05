require("dotenv").config();

const { isUser, isGuest } = require("../middlewares/isGuard");
const authServices = require("../services/authServices");
const router = require("express").Router();

router.get("/register", (req, res) => {
  console.log("register");
  console.log(process.env.SALT_ROUNDS, "salt");
});

router.post("/register", async (req, res) => {
  console.log("usertgrrt", req.body);
  try {
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
    console.log("Token hasbeen created");
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
