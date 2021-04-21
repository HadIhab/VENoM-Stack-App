const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const chalk = require('chalk')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const api = require('./api')

app.set('port', (process.env.PORT || 8081))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use('/api', api)
app.use(express.static('static'))

app.use(morgan('dev'))

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  res.json(err)
})


mongoose.connect('mongodb://localhost:27017/businessdb', { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log(`${chalk.yellow('\n[Data base]: Successfully connected to MongoDB')}`)

  app.listen(app.get('port'), function () {
    console.log(`[Server]: API Server Listening on port ${chalk.white(app.get('port'))} !`)
  })
})