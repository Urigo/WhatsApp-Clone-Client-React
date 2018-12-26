import * as React from 'react'
import { Suspense } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../Navbar'
import UsersList from '../UsersList'
import { useAddChat } from '../../graphql-hooks'
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

export default ({ history }: RouteComponentProps) => {
  const addChat = useAddChat()

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
