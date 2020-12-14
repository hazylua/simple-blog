require("dotenv").config()

const PORT = 5000
const uri = process.env.DB_URL

const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")

// Routes.
const routes = require("./routes")

// MongoDB.
const mongoose = require("mongoose")

const app = express()

mongoose
  .connect(`${uri}`, { useNewUrlParser: true })
  .then(() => console.log(`Connected to MongoDB.`))
  .catch(err => console.error(`Error:\n${err}.`))

app.use(cors())
app.use(body_parser.urlencoded({ extended: true }))
app.use(express.json())

// Default response from '/'.
app.get("/", (req, res) => {
  res.send(`Express server at port ${PORT}.`)
})

// User services - route prefix: /api/user/
app.use("/user/login", routes.login)
app.use("/user/register", routes.register)

// Blog services - route prefix: /api/blog/
app.use("/blog/content", routes.blog)
app.use("/blog/contact", routes.contact)

app.listen(PORT, () => {
  console.log(`Server started.`)
})
