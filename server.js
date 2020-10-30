// server.js

require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const { v4 } = require("uuid")

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.post("/comment", (req, res) => {
  const { body } = req
  const data = {
    ...body,
    timestamp: new Date(),
    id: v4(),
  }
  res.json(data)
})

app.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})
