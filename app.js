const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  // res.send('Hello World Postal Calculator!')
  res.write('Hello World Postal Calculator!')
  res.end()
})

app.listen(port, () => {
  console.log(`Server up and listening at http://localhost:${port}`)
})