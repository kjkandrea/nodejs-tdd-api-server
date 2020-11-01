const fs = require('fs')

const data = fs.readFileSync('./data.txt', 'utf-8')
const syncData = fs.readFile('./data.txt', 'utf-8', (err, data) => {
  console.log(data + ' sync')
})

console.log(data + ' async')