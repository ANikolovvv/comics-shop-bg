module.exports = {
  isAuth: () => (req, res, next) => {
    console.log('is owner is auth',req.user)
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: "Please log in" });
    }
  },
  isOwner: () => (req, res, next) => {
     console.log('is owner',req.user)
    if (!req.user) {
      res.status(401).json({ message: "Please log in" });
    } else if (req.user._id == res.locals.item._ownerId) {
      next();
    } else {
      res.status(403).json({ message: "You cannot modify this record" });
    }
  },
};
