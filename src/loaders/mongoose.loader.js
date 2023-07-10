const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth-server", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("Successfully for MongoDB connected!!");
  } catch (err) {
    console.error(`Failed to connect to MongoDB - ${err.message}`);
    throw new Error(`Failed to connect to MongoDB`);
  }
};
