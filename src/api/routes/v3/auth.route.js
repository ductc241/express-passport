const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../models/user.model");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        message: "Email and password is required",
      });
    }

    const userInfor = await User.findOne({ email });

    if (!userInfor) {
      return res.status(400).json({
        message: "Cant find user for your username",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, userInfor.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Password Incorrect",
      });
    }

    const jwtPayload = {
      id: userInfor._id,
      username: userInfor.email,
      role: userInfor.role,
    };

    const access_token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "20s",
    });
    const refresh_token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      // sameSite: "none",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      access_token,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInfor = new User({ email, password });

    await userInfor.save();

    res.status(200).json({
      message: "create user success",
      user: userInfor,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

router.get("/refresh-token", async (req, res) => {
  try {
    const cookies = req.cookies;
    const refresh_token = cookies.refresh_token;

    if (!cookies.refresh_token)
      return res.status(401).json({
        message: "Session Expired",
      });

    jwt.verify(refresh_token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "error",
        });
      }

      const jwtPayload = {
        id: decoded.id,
        username: decoded.email,
        role: decoded.role,
      };

      const access_token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: "20s",
      });
      res.json({access_token});
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

module.exports = router;
