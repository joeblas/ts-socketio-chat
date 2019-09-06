import {Server, Socket} from 'socket.io'
import uuid from 'uuid/v4'

const messageExpirationTimeMS = 10 * 1000

export interface User {
  id: string
  name: string
}

const defaultUser: User = {
  id: 'anon',
  name: 'Anonymous'
}

export interface Message {
  user: User
  id: string
  time: Date
  value: string
}

const sendMessage = (socket: Socket | Server) =>
  (message: Message) => socket.emit('message', message)

export default (io: Server) => {
  const messages: Set<Message> = new Set()

  io.on('connection', socket => {
    socket.on('getMessages', () => {
      messages.forEach(sendMessage(socket))
    })

    socket.on('message', (value: string) => {
      const message: Message = {
        id: uuid(),
        time: new Date(),
        user: defaultUser,
        value
      }

      messages.add(message)

      sendMessage(io)(message)

      setTimeout(
        () => {
          messages.delete(message)
          io.emit('deleteMessage', message.id)
        },
        messageExpirationTimeMS
      )
    })
  })
}
