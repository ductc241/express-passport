const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("pages/login");
});

// login with local strategy + session
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/v2/user/profile",
    failureRedirect: "/api/v2/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logOut(() => {
    res.send("logout success");
  });
});

module.exports = router;
