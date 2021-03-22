const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

// public directory for static files
app.use(express.static(__dirname + '/public'))

// views directory
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const message = `
    Postal Calculator!
    ------------------

    Use this Url to test the app:
    Local: http://localhost:5000/form.html
    Heroku: https://prove09-postal-rate-calculator.herokuapp.com/form.html
  `
  res.write(message)
  res.end()
})

app.get('/calculate', (req, res) => {
  const mailType = req.query.mailType
  const weight = req.query.weight

  const price = calculateRate(weight, mailType)

  const params = {
    mailType: mailType,
    weight: weight,
    price: price
  }
  // console.log(params)
  res.render('result', params)
})

function calculateRate(weight, mailType) {

  const rates = [{
      type: 'letterStamped',
      num: 1,
      rate: 0.55
    },
    {
      type: 'letterStamped',
      num: 2,
      rate: 0.75
    },
    {
      type: 'letterStamped',
      num: 3,
      rate: 0.95
    },
    {
      type: 'letterStamped',
      num: 3.5,
      rate: 1.15
    },
    {
      type: 'letterMetered',
      num: 1,
      rate: 0.51
    },
    {
      type: 'letterMetered',
      num: 2,
      rate: 0.71
    },
    {
      type: 'letterMetered',
      num: 3,
      rate: 0.91
    },
    {
      type: 'letterMetered',
      num: 3.5,
      rate: 1.11
    },
    {
      type: 'largeEnvelope',
      num: 1,
      rate: 1.00
    },
    {
      type: 'largeEnvelope',
      num: 2,
      rate: 1.20
    },
    {
      type: 'largeEnvelope',
      num: 3,
      rate: 1.40
    },
    {
      type: 'largeEnvelope',
      num: 4,
      rate: 1.60
    },
    {
      type: 'largeEnvelope',
      num: 5,
      rate: 1.80
    },
    {
      type: 'largeEnvelope',
      num: 6,
      rate: 2.00
    },
    {
      type: 'largeEnvelope',
      num: 7,
      rate: 2.20
    },
    {
      type: 'largeEnvelope',
      num: 8,
      rate: 2.40
    },
    {
      type: 'largeEnvelope',
      num: 9,
      rate: 2.60
    },
    {
      type: 'largeEnvelope',
      num: 10,
      rate: 2.80
    },
    {
      type: 'largeEnvelope',
      num: 11,
      rate: 3.00
    },
    {
      type: 'largeEnvelope',
      num: 12,
      rate: 3.20
    },
    {
      type: 'largeEnvelope',
      num: 13,
      rate: 3.40
    },
    {
      type: 'packageService',
      num: 1,
      rate: 4.00
    },
    {
      type: 'packageService',
      num: 2,
      rate: 4.00
    },
    {
      type: 'packageService',
      num: 3,
      rate: 4.00
    },
    {
      type: 'packageService',
      num: 4,
      rate: 4.00
    },
    {
      type: 'packageService',
      num: 5,
      rate: 4.80
    },
    {
      type: 'packageService',
      num: 6,
      rate: 4.80
    },
    {
      type: 'packageService',
      num: 7,
      rate: 4.80
    },
    {
      type: 'packageService',
      num: 8,
      rate: 4.80
    },
    {
      type: 'packageService',
      num: 9,
      rate: 5.50
    },
    {
      type: 'packageService',
      num: 10,
      rate: 5.50
    },
    {
      type: 'packageService',
      num: 11,
      rate: 5.50
    },
    {
      type: 'packageService',
      num: 12,
      rate: 5.50
    },
    {
      type: 'packageService',
      num: 13,
      rate: 6.25
    },
  ]

  weight = parseFloat(weight)
  let weightRound = 0.00
  let price = 0.00
  let ratesFiltered

  switch (mailType) {
    case 'Letters Stamped':
      weightRound = weight <= 3 ? Math.ceil(weight) : 3.5
      ratesFiltered = rates.filter(r => (r.type == 'letterStamped' && r.num == weightRound))
      price = ratesFiltered[0].rate
      break;
    case 'Letters Metered':
      weightRound = weight <= 3 ? Math.ceil(weight) : 3.5
      ratesFiltered = rates.filter(r => (r.type == 'letterMetered' && r.num == weightRound))
      price = ratesFiltered[0].rate
      break;
    case 'Large Envelopes Flats':
      weightRound = weight <= 13 ? Math.ceil(weight) : 13
      ratesFiltered = rates.filter(r => (r.type == 'largeEnvelope' && r.num == weightRound))
      price = ratesFiltered[0].rate
      break;
    case 'First-Class Package Service Retail':
      weightRound = weight <= 13 ? Math.ceil(weight) : 13
      ratesFiltered = rates.filter(r => (r.type == 'packageService' && r.num == weightRound))
      price = ratesFiltered[0].rate
      break;
    default:
      price = 0.00;
      break;
  }
  return price
}

app.listen(PORT, () => {
  console.log(`Server up and listening at http://localhost:${PORT}`)
})