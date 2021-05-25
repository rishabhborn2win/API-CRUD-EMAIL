const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
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
    },
  ],
});

module.exports = Mail = mongoose.model("mail", MailSchema);
