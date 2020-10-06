const express = require('express')
const expressFileUpload = require('express-fileupload')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')

const { fileUpload, getImage } = require('./controllers/upload.controller')

require('dotenv').config()

const server = express()

// Settings
const pathPublic = path.join(__dirname, 'public')
server.use(express.static(pathPublic))

server.set('PORT', process.env.PORT)
server.use(cors())
server.use(morgan('dev'))
server.use(helmet())
server.use(express.json())

// Routes
const pathHtml = path.join(__dirname, 'public/index.html')
server.get('/', (req, res) => res.sendFile(pathHtml))

server.use(expressFileUpload())
server.get('/upload/:image', getImage)
server.post('/upload', fileUpload)

// Start server
server.listen(server.get('PORT'), () => console.log(`Server on port ${server.get('PORT')}`))
