const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema({
  from: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
  },
  to: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  subject: {
    type: String,
    required: true,
  },
  attachments: [
    {
      url: {
        type: String,
      },
    },
  ],
  body: {
    type: String,
    required: true,
  },
  replies: [
    {
      from: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        name: {
          type: String,
          required: true,
        },
      },
      attachments: [
        {
          url: {
            type: String,
          },
        },
      ],
      body: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Mail = mongoose.model("mail", MailSchema);
