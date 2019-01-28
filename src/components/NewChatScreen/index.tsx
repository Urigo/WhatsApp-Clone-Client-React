import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import * as React from 'react'
import { Suspense } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import * as fragments from '../../graphql/fragments'
import { NewChatScreenMutation } from '../../graphql/types'
import Navbar from '../Navbar'
import UsersList from '../UsersList'
import NewChatNavbar from './NewChatNavbar'
import NewGroupButton from './NewGroupButton'

const Style = styled.div`
  .UsersList {
    height: calc(100% - 56px);
  }

  .NewChatScreen-users-list {
    height: calc(100% - 56px);
    overflow-y: overlay;
  }
`

const mutation = gql`
  mutation NewChatScreenMutation($userId: ID!) {
    addChat(userId: $userId) {
      ...Chat
    }
  }
  ${fragments.chat}
`

export default ({ history }: RouteComponentProps) => {
  const addChat = useMutation<NewChatScreenMutation.Mutation, NewChatScreenMutation.Variables>(
    mutation,
    {
      update: (client, { data: { addChat } }) => {
        client.writeFragment({
          id: defaultDataIdFromObject(addChat),
          fragment: fragments.chat,
          fragmentName: 'Chat',
          data: addChat,
        })
      },
    },
  )

  const onUserPick = user => {
    addChat({
      variables: {
        userId: user.id,
      },
    }).then(({ data: { addChat } }) => {
      history.push(`/chats/${addChat.id}`)
    })
  }

  return (
    <Style className="NewChatScreen Screen">
      <Navbar>
        <NewChatNavbar history={history} />
      </Navbar>
      <div className="NewChatScreen-users-list">
        <NewGroupButton history={history} />
        <Suspense fallback={null}>
          <UsersList onUserPick={onUserPick} />
        </Suspense>
      </div>
    </Style>
  )
}
