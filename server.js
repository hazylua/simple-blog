// server.js

require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const { v4 } = require("uuid")
const path = require("path")
const fs = require("fs")

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

app.get("/comment", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/data/", "comments.json"))
})

app.post("/comment", (req, res) => {
  const { body } = req
  var data = {
    ...body,
    timestamp: new Date(),
    id: v4(),
  }
  fs.readFile(
    path.join(__dirname, "/src/data/", "comments.json"),
    (err, file) => {
      if (err) throw err
      comments = JSON.parse([file])
      comments.push(data)
      console.log(comments)
      fs.writeFile(
        path.join(__dirname, "/src/data/", "comments.json"),
        JSON.stringify(comments),
        err => {
          if (err) throw err
        }
      )
    }
  )
  res.sendFile(path.join(__dirname, "/src/data/", "comments.json"))
})

app.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})
