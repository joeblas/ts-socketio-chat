import {Map} from 'immutable'
import React, {SyntheticEvent, useState, useEffect} from 'react'

import './MessageList.scss'

import {Message} from '../socket'

const MessageList = ({socket}) => {
  const [messages, setMessages] = useState(Map())

  useEffect(() => {
    const messageListener = (message: Message) => {
      setMessages(prevMessages => prevMessages.set(message.id, message))
    }

    const deleteMessageListener = (messageID: string) => {
      setMessages(prevMessages => prevMessages.delete(messageID))
    }

    socket.on('message', messageListener)
    socket.on('deleteMessage', deleteMessageListener)
    socket.emit('getMessages')

    return () => {
      socket.off('message', messageListener)
      socket.off('deleteMessage', deleteMessageListener)
    }
  }, [socket])

  return (
    <div className='message-list'>
      {messages
        .toSet()
        .sortBy((message: Message) => message.time)
        .map((message: Message) => (
          <div
            key={message.id}
            className='message-list--message-container'
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span className='message-list--message'>{message.value}</span>
            <span className='message-list--user'>{message.user.name}</span>
          </div>
        )).toArray()

      }
    </div>
  )
}

export default MessageList
