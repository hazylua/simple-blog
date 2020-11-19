const { ContactForm, validateForm } = require("../models/contact")
const express = require("express")
const _ = require("lodash")
const router = express.Router()

router.post("/", async (req, res) => {
  const { err } = validateForm(req.body)
  if (err) {
    return res.status(400).send(err.details[0].message)
  }
  try {
    let form = new ContactForm(
      _.pick(req.body, ["subject", "date", "mail", "message"])
    )

    await form.save()

    res.send(_.pick(form, ["_id", "author", "date"]))
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
