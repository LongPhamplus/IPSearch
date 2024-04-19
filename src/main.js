const {Client} = require('pg')
const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const { engine } = require('express-handlebars')
const { promises } = require('dns')
const { rejects } = require('assert')
const app = express()
const port = 3000
const route = require('./routes')
const { get } = require('http')



app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
// Serving static file
app.use(express.static(path.join(__dirname, '/public')))

// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'))


route(app)

app.listen(port, function() {
    console.log(`http://localhost:${port}`)
})