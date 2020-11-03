require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")

const webtoken = require("jsonwebtoken")
const { assert } = require("console")

const app = express()
const port = process.env.AUTH_PORT

const MongoClient = require("mongodb").MongoClient
MongoClient.connect(process.env.DB_URL, (err, db) => {
  if (err) throw err
  console.log(`Connected to MongoDB at ${process.env.DB_URL}.`)

  db.close()
})

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

app.post("/auth", (req, res) => {})

function webtokenSignUser(user) {
  return webtoken.sign(user, config.authentication.webtokenSecret, {
    expiresIn: "30m",
  })
}

app.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})
