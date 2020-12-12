require("dotenv").config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")

// MongoDB.
const mongoose = require("mongoose")

// Routes.
const routes = require("./routes")

const app = express()

mongoose
  .connect(`${DB_URL}`)
  .then(() => console.log(`Connected to MongoDB.`))
  .catch(err => console.error(`Error:\n${err}.`))

// Default response from '/'.
app.get("/", (req, res) => {
  res.send(`Express server at port ${PORT}.`)
})

app.use(cors())
app.use(body_parser.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/user/login", routes.login)
app.use("/api/user/register", routes.register)
app.use("/api/content", routes.blog)
app.use("/api/contact", routes.contact)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})
