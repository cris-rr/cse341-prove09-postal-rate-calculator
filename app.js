const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  // res.send('Hello World Postal Calculator!')
  res.write('Hello World Postal Calculator!')
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server up and listening at http://localhost:${PORT}`)
})