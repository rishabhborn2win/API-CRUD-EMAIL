const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emails: {
    received: [
      {
        mail: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "mail",
        },
      },
    ],
    sent: [
      {
        mail: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "mail",
        },
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
