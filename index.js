const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000

let users = [
  {id: 1, name:'andrea'},
  {id: 2, name:'yusso'},
  {id: 3, name:'alice'}
]

app.use(morgan('dev'))

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)

  if (Number.isNaN(limit)) return res.status(400).end()

  res.json(users.slice(0, limit))
})

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) return res.status(400).end()

  const user = users.filter((user) => user.id === id) [0]

  if (!user) return res.status(404).end()

  res.json(user)
})

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)

  users = users.filter((user) => user.id !== id)
  res.status(204).end()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app