import express from 'express'
import { connectPostgres } from './utils/connect-db'
import { appRouter } from './routes'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { addSocket, removeSocket } from './utils/socket'
import { verifyJWT } from './utils/jwt'
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

//middleware socket
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const verifyToken = await verifyJWT(token) as any;
    console.log("verifyToken:",verifyToken);
    (socket as any).user_id = verifyToken.user_id;
    next();
  } catch (error:any) {
    console.log("error socket", error)
    next(error);
  }
})

io.on('connection', (socket) => {
  const user_id = (socket as any).user_id
  if (Boolean(user_id)) {
    addSocket(socket, user_id)
  }
   socket.use((packet, next) => {
    console.log("packet:", packet);

    // Kiểm tra token hoặc xử lý gói tin
    // if () {
    //   next();  // Nếu hợp lệ, tiếp tục với sự kiện
    // } else {
    //   socket.emit("error", "Unauthorized: Invalid or expired token");
    // }
  });
  socket.on('disconnect', () => {
    removeSocket(socket, user_id)
  })
})

appRouter(app)
connectPostgres()
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
