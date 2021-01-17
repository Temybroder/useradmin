const https = require('https')

const params = JSON.stringify({

  "currency": "NGN",

  "source": "balance",

  "transfers": [{

    "amount": 20000,

    "reason": "Life go better for you",

    "recipient": "RCP_t0ya41mp35flk40"

  },

  {
    "amount": 20000,

    "reason": "Easy does it",

    "recipient": "RCP_z7e30qo1xxo98ub"

  }]
})

const options = {

  hostname: 'api.paystack.co',

  port: 443,

  path: '/transfer/bulk',

  method: 'POST',

  headers: {

    Authorization: 'Bearer SECRET_KEY',

    'Content-Type': 'application/json'

  }}

const req = https.request(options, res => {

  let data = ''

  resp.on('data', (chunk) => {

    data += chunk

  });

  resp.on('end', () => {

    console.log(JSON.parse(data))

  })

}).on('error', error => {

  console.error(error)

})

req.write(params)

req.end()