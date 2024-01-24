const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDb connecter");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDb;
