const express = require('express');
const app = express()

const logger = (req, res, next) => {
  console.log('I am logger')
  // next()
  // next가 호출되지않았기 때문에 logger2가 실행되지 않음.
}

const logger2 = (req, res, next) => {
  console.log('I am logger2')
  next()
}

app.use(logger)
app.use(logger2)

app.listen(3000, () => {
  console.log('Server is learning')
})