import gql from 'graphql-tag'
import * as React from 'react'
import { Suspense } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import * as fragments from '../../fragments'
import { NewChatScreenMutation } from '../../types'
import Navbar from '../Navbar'
import UsersList from '../UsersList'
import NewChatNavbar from './NewChatNavbar'
import NewGroupButton from './NewGroupButton'

const name = 'NewChatScreen'

const Style = styled.div `
  .UsersList {
    height: calc(100% - 56px);
  }

  .${name}-users-list {
    height: calc(100% - 56px);
    overflow-y: overlay;
  }
`

const mutation = gql `
  mutation NewChatScreenMutation($recipientId: ID!) {
    addChat(recipientId: $recipientId) {
      ...Chat
      messages {
        ...Messages
      }
    }
  }
  ${fragments.chat}
  ${fragments.message}
`

export default ({ history }: RouteComponentProps) => {
  const addChat = useMutation<NewChatScreenMutation.Munation, NewChatScreenMutation.Variables>(mutation)

  const onUserPick = (user) => {
    addChat({
      variables: {
        recipientId: user.id
      }
    }).then(({ data: { addChat } }) => {
      history.push(`/chats/${addChat.id}`)
    })
  }

  return (
    <Style className={`${name} Screen`}>
      <Navbar>
        <NewChatNavbar history={history} />
      </Navbar>
      <div className={`${name}-users-list`}>
        <NewGroupButton history={history} />
        <Suspense fallback={null}>
          <UsersList onUserPick={onUserPick} />
        </Suspense>
      </div>
    </Style>
  )
}
