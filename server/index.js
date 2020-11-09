require("dotenv").config()

const express = require("express")
const cors = require("cors")

// MongoDB.
const mongoose = require("mongoose")

// Routes.
const routes = require("./routes")

const app = express()

mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log(`Connected to MongoDB.`))
  .catch(err => console.error(`Error:\n${err}.`))

// Default response from '/'.
app.get("/", (req, res) => {
  res.send(`Express server at port ${process.env.AUTH_PORT}.`)
})

app.use(cors())
app.use(express.json())
app.use("/api/users", routes.user)
app.use("/api/auth", routes.auth)

app.listen(process.env.AUTH_PORT, () => {
  console.log(`Server started on port ${process.env.AUTH_PORT}.`)
})
