import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import gql from 'graphql-tag'
import * as React from 'react'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import styled from 'styled-components'
import { time as uniqid } from 'uniqid'
import * as fragments from '../../fragments'
import { MessageBoxQuery, MessageBoxMutation } from '../../types'

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

const query = gql `
  query MessageBoxQuery {
    me {
      ...User
    }
    ${fragments.user}
  }
`

const mutation = gql `
  mutation MessageBoxMutation($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${fragments.message}
`

interface MessageBoxProps {
  chatId: string;
}

export default ({ chatId }: MessageBoxProps) => {
  const [message, setMessage] = useState('')
  const { data: { me } } = useQuery<MessageBoxQuery.Query, MessageBoxQuery.Variables>(query)

  const addMessage = useMutation<MessageBoxMutation.Mutation, MessageBoxMutation.Variables>(mutation, {
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
        id: addMessage.id,
        fragment: fragments.message,
        data: addMessage,
      })
    },
  })

  const onKeyPress = (e) => {
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
    <Style className={name}>
      <input className={`${name}-input`} type="text" placeholder="Type a message" value={message} onKeyPress={onKeyPress} onChange={onChange} />
      <Button variant="contained" color="primary" className={`${name}-button`} onClick={submitMessage}>
        <SendIcon />
      </Button>
    </Style>
  )
}
