import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../Navbar'
import UsersList from '../UsersList'
import NewChatNavbar from './NewChatNavbar'
import NewGroupButton from './NewGroupButton'

const name = 'NewChatScreen'

const Style = styled.div `
  .UsersList {
    height: calc(100% - 56px);
  }
`

export default ({ history }: RouteComponentProps) => (
  <Style className={`${name} Screen`}>
    <Navbar>
      <NewChatNavbar history={history} />
    </Navbar>
    <NewGroupButton history={history} />
    <UsersList />
  </Style>
)
