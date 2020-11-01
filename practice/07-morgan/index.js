const express = require('express')
const app = express()
const logger = require('morgan')

app.use(logger('dev'))

app.listen(3000, () => {
  console.log('Server is learning')
})