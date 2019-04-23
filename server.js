// Declare variables
const express = require('express')
const cors = require('cors')
const server = express()
const postsRouter = require('./posts')

// Tell server to use middleware
server.use(express.json())
server.use(cors())
server.use('/api/posts', postsRouter)

// Export server
module.exports = server
