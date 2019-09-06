import React from 'react'
import io from 'socket.io-client'

import MessageList from './MessageList'
import NewMessage from './NewMessage'

const socket = io(location.origin)

export default () => (
  <div>
    <MessageList socket={socket} />
    <NewMessage socket={socket} />
  </div>
)
