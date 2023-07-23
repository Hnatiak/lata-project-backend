const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config()

const authRouter = require("./routes/api/auth")
const boxsRouter = require('./routes/api/boxs')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use('/api/boxs', boxsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Not Found - Даного ID не існує"} = err;
  res.status(status).json({ message })
})

module.exports = app