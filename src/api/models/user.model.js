const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String },
  role: { type: String, default: "user" },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(err);
  }
});

module.exports = mongoose.model("User", userSchema);
