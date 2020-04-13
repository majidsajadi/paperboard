
const express = require('express')
const router = require('./router')
const server = express()

server.use('/', router)

module.exports = server