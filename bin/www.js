const app = require('../index')
const port = 3000
const syncDB = require('./sync.db')

syncDB().then(() => {
  console.log('Sync Database!')
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})
