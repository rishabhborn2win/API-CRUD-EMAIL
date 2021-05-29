const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/Users");
const Mail = require("../../models/Mails");
const { check, validationResult } = require("express-validator");

//route     POST api/mail/send
//desc:     Send a mail
//access:   private
router.post(
  "/send",
  [
    auth,
    [
      check("to", "to mail id field is req").isEmail(),
      check("subject", "subject is req").not().isEmpty(),
      check("body", "body is req").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { to, subject, body, attachments } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");

      let toEmail = await User.findOne({ email: to });

      if (!toEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Please enter valid recipent address!" }] });
      }

      const newMail = new Mail({
        from: user.email,
        to: to,
        subject,
        body,
        attachments,
      });

      await newMail.save();

      toEmail.emails.received.unshift({
        mail: newMail._id,
      });
      await toEmail.save();
      user.emails.sent.unshift({
        mail: newMail._id,
      });
      await user.save();
      res.json({
        msg: "e-mail send successfully!",
        id: newMail._id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("server error");
    }
  }
);

//route     PUT api/mail/reply/:mailid
//desc:     Reply to mail
//access:   private
router.put(
  "/reply/:mailid",
  auth,
  [check("body", "Body is required for reply").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
      const mailid = req.params.mailid;
      
      const {body} = req.body;
      try {
        let user = await User.findById(req.user.id).select("-password");
        let mail = await Mail.findById(mailid);
  
        if (!(user.email === mail.from || user.email === mail.to)) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Unauthorize To Reply to this thread!" }] });
        }

        let reply = {
            from:  user.email,
            body
        }

        mail.replies.push(reply);
        await mail.save();
        res.json({
          msg: "Replied",
          mail: mail,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send("server error");
      }
    }
);

//route     POST api/mail/delete/:mailid
//desc:     Delete the mail
//access:   private
router.delete(
    "/delete/:mailid",
    auth,
    async (req, res) => {
        const mailid = req.params.mailid;
        try {
          let user = await User.findById(req.user.id).select("-password");
          let mail = await Mail.findById(mailid);
    
         if(mail.from === user.email){
             await Mail.findByIdAndDelete(mailid);
             res.status(200).json({
                msg: "Mail Deleted Successfully"
            })
         }else{
            res.status(400).json({
                msg: "Unauthorize to delete"
            })
        }
        } catch (err) {
          console.error(err);
          res.status(500).send("server error");
        }
      }
);

//route     GET api/mail/mailid
//desc:     Load the mail
//access:   private
router.get("/:mailid", auth, async (req, res) => {
    const mailid = req.params.mailid
    try {
      const user = await User.findById(req.user.id).select('-password');
      const mail = await Mail.findById(mailid);
      if(user.email === mail.from || user.email === mail.to)
      res.json(mail);
    } catch (err) { 
      console.log(err.message);
      res.status(500).send("server error");
    }
  });

module.exports = router;
