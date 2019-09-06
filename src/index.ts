import express from 'express'
import Bundler from 'parcel-bundler'
import path from 'path'
import http from 'http'
import SocketIOServer from 'socket.io'

import initializeSocketIO from './socket'

const app = express()
const server = new http.Server(app)
const io = SocketIOServer(server)

const port = 8080 || process.env.PORT

initializeSocketIO(io)
const bundler = new Bundler(path.join(__dirname, '../src/client/index.html'))
app.use(bundler.middleware())

server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`)
})
