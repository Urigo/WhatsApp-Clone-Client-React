import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import * as React from 'react'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import styled from 'styled-components'
import { time as uniqid } from 'uniqid'
import * as fragments from '../../graphql/fragments'
import { MessageBoxMutation, FullChat, Message } from '../../graphql/types'
import { useMe } from '../../services/auth.service'

const Style = styled.div`
  display: flex;
  height: 50px;
  padding: 5px;
  width: calc(100% - 10px);

  .MessageBox-input {
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

  .MessageBox-button {
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

const mutation = gql`
  mutation MessageBoxMutation($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${fragments.message}
`

interface MessageBoxProps {
  chatId: string
}

export default ({ chatId }: MessageBoxProps) => {
  const [message, setMessage] = useState('')
  const me = useMe()

  const addMessage = useMutation<MessageBoxMutation.Mutation, MessageBoxMutation.Variables>(
    mutation,
    {
      variables: {
        chatId,
        content: message,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addMessage: {
          id: uniqid(),
          __typename: 'Message',
          chat: {
            id: chatId,
            __typename: 'Chat',
          },
          sender: {
            id: me.id,
            __typename: 'User',
            name: me.name,
          },
          content: message,
          createdAt: new Date(),
          type: 0,
          recipients: [],
          ownership: true,
        },
      },
      update: (client, { data: { addMessage } }) => {
        client.writeFragment({
          id: defaultDataIdFromObject(addMessage),
          fragment: fragments.message,
          data: addMessage,
        })

        let fullChat
        try {
          fullChat = client.readFragment<FullChat.Fragment>({
            id: defaultDataIdFromObject(addMessage.chat),
            fragment: fragments.fullChat,
            fragmentName: 'FullChat',
          })
        } catch (e) {}

        if (fullChat && !fullChat.messages.some(message => message.id === addMessage.id)) {
          fullChat.messages.push(addMessage)
          fullChat.lastMessage = addMessage

          client.writeFragment({
            id: defaultDataIdFromObject(addMessage.chat),
            fragment: fragments.fullChat,
            fragmentName: 'FullChat',
            data: fullChat,
          })
        }
      },
    },
  )

  const onKeyPress = e => {
    if (e.charCode === 13) {
      submitMessage()
    }
  }

  const onChange = ({ target }) => {
    setMessage(target.value)
  }

  const submitMessage = () => {
    if (!message) return

    addMessage()
    setMessage('')
  }

  return (
    <Style className="MessageBox">
      <input
        className="MessageBox-input"
        type="text"
        placeholder="Type a message"
        value={message}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
      <Button
        variant="contained"
        color="primary"
        className="MessageBox-button"
        onClick={submitMessage}
      >
        <SendIcon />
      </Button>
    </Style>
  )
}
