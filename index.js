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
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  if (Number.isNaN(limit)) return res.status(400)
  res.json(users.slice(0, limit))
})

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.filter((user) => user.id === id)[0]

  res.json(user)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app