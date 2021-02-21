var express = require('express')
var app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/hello', (req, res) => {
    res.send('Hello, again!')
})