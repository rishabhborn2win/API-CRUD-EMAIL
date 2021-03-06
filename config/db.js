const mongoose = require("mongoose");
const config = require("config");
const db = "mongodb://localhost:27017/emailApp";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("mongoDB Connected");
  } catch (err) {
    console.log(err.message);

    // We wanna exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
