import express from 'express'
import {connectPostgres } from './utils/connect-db'
import { appRouter } from './routes'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
const app = express()
const httpServer = createServer(app)
const port = 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  }
})

let user: any = {}

io.on('connection', (socket) => {
  const auth = socket.handshake.auth?.infoUser
  if (Boolean(auth)) {
    user[auth] = {
      socket_id: socket.id
    }
  }

  socket.on('form-data', async (value) => {
    const receiver_to = user[value?.receiver_notification]?.socket_id
    if (receiver_to) {
      socket.to(receiver_to).emit('server-form-data', value)
    }
  })
  console.log('user connect:', user)
  socket.on('disconnect', () => {
    delete user[auth]
    socket.disconnect()
    console.log('list user disconnect:', user)
  })
})

appRouter(app)
connectPostgres()
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
