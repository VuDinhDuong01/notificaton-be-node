import express from 'express'
import { client, connectPostgres } from './utils/connect-db'
import { appRouter } from './routes'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
const app = express()
const httpServer = createServer(app)
const port = 4000

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
  
   // { content: '9a', receiver_notification: 12, sender_notification: 11 }
    const receiver_to = user[value?.receiver_notification]?.socket_id
    socket.to(receiver_to).emit('server-form-data', value)
    // lưu  notification to db
    const insertNotification = 'INSERT INTO notification(content,sender_id, receiver_id) VALUES ($1, $2, $3) RETURNING *'
    const valuesInsertNotification = [value?.content, value?.sender_notification, value?.receiver_notification]
    await client.query(insertNotification, valuesInsertNotification)
    // luu form to db
    const insertForm = 'INSERT INTO form(content,sender_notification, receiver_notification) VALUES ($1, $2, $3) RETURNING *'
    const valuesInsertForm = [value?.content, value?.sender_notification, value?.receiver_notification]
    await client.query(insertForm, valuesInsertForm)
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
