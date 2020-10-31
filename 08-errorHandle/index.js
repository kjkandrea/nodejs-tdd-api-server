const express = require('express')
const app = express()

const commonMiddleware = (req, res, next) => {
  console.log('common middleware')

  next(new Error('error ouccered'))
}

const errorMiddleware = (err, req, res, next) => {
  console.error(err.message)
  // 에러를 처리하고
  next()
}

app.use(commonMiddleware)
app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('Server is learning')
})