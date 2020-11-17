const express = require("express")
const _ = require("lodash")
const router = express.Router()
const node_mailer = require("nodemailer")

const mailer = node_mailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PW,
  },
})

router.post("/", async (req, res) => {
  mailer.sendMail({
    from: red.body.mail,
    to: [process.env.CONTACT_ADDRESS],
    subject: req.body.subject || "[No subject]",
    html: req.body.message || "[No message]",
  }),
    function (err, info) {
      if (err) return res.status(500).send(err)
      res.json({ success: true })
    }
})

module.exports = router
