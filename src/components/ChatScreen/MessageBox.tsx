import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import * as React from 'react'
import { useState } from 'react'
import { MutationUpdaterFn } from 'react-apollo-hooks'
import styled from 'styled-components'
import uniqid from 'uniqid'
import { getChatsQuery } from '../../graphql-hooks/chats-hooks'
import { useGetMe } from '../../graphql-hooks/users-hooks'
import { useAddMessage, getMessagesQuery } from '../../graphql-hooks/messages-hooks'
import { GetMessages, GetChats, AddMessage } from '../../types'

const name = 'MessageBox'

const Style = styled.div `
  display: flex;
  height: 50px;
  padding: 5px;
  width: calc(100% - 10px);

  .${name}-input {
    width: calc(100% - 50px);
    border: none;
    border-radius: 999px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 15px;
    outline: none;
    box-shadow: 0 1px silver;
    font-size: 18px;
    line-height: 45px;
  }

  .${name}-button {
    min-width: 50px;
    width: 50px;
    border-radius: 999px;
    background-color: var(--primary-bg);
    margin: 0 5px;
    margin-right: 0;
    color: white;
    padding-left: 20px;

    svg {
      margin-left: -3px;
    }
  }
`

interface MessageBoxProps {
  chatId: string;
}

export default ({ chatId }: MessageBoxProps) => {
  const { data: { me } } = useGetMe()
  const [message, setMessage] = useState('')

  const addMessage = useAddMessage({
    variables: {
      chatId,
      contents: message,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      addMessage: {
        _id: uniqid(),
        __typename: 'Message',
        chat: {
          _id: chatId,
          __typename: 'Chat',
        },
        from: {
          __typename: 'User',
          name: me.name,
        },
        contents: message,
        sentAt: new Date(),
        isMine: true,
      },
    },
    update: ((store, { data: { addMessage } }) => {
      {
        const { chat } = store.readQuery({
          query: getMessagesQuery,
          variables: { chatId },
        })

        chat.messages.push(addMessage)

        store.writeQuery({
          query: getMessagesQuery,
          variables: { chatId },
          data: { chat },
        })
      }

      {
        const { chats } = store.readQuery({
          query: getChatsQuery,
        })

        chats.find(chat => chat._id == chatId).messages.push(addMessage);

        store.writeQuery({
          query: getChatsQuery,
          data: { chats },
        })
      }
    }) as MutationUpdaterFn<AddMessage.Mutation>,
  })

  const onInputChange = ({ keyCode, target }) => {
    if (keyCode == 13) {
      submitMessage()
    }
    else {
      setMessage(target.value)
    }
  }

  const submitMessage = () => {
    if (!message) return

    addMessage()
  }

  return (
    <Style className={name}>
      <input className={`${name}-input`} type="text" placeholder="Type a message" value={message} onChange={onInputChange} />
      <Button className={`${name}-button`} onClick={submitMessage}>
        <SendIcon />
      </Button>
    </Style>
  )
}
