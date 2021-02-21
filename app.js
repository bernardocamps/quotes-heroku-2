var express = require('express')
var app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/hello', (req, res) => {
    res.send('Hello, again!')
})

var port = process.env.PORT || 8080;

app.listen(port);