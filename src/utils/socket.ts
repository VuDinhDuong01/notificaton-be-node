
let user: any = {}

export const addSocket = (socket: any, userId: string) => {
   user[userId] = {
    socket_id: socket?.id,
    socket: socket
  }
  console.log('list user disconnect:', user)
}

export const getSocket = () => {
  return user
}

export const removeSocket = (socket: any, userId: string) => {
  delete user[userId]
  socket.disconnect()
  console.log('list user disconnect:', user)
}