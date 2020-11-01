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
  const limit = req.query.limit
  res.json(users.slice(0, limit))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app