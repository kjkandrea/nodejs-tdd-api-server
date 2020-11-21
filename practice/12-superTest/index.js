const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000

const users = [
  {id: 1, name:'andrea'},
  {id: 2, name:'yusso'},
  {id: 3, name:'alice'}
]

app.use(morgan('dev'))

app.get('/users', (req, res) => {
  res.json(users)
})

module.exports = app