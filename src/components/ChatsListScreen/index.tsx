import * as React from 'react'
import { Suspense } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../Navbar'
import AddChatButton from './AddChatButton'
import ChatsList from './ChatsList'
import ChatsNavbar from './ChatsNavbar'

const name = 'ChatsListScreen'

const Style = styled.div `
`

export default ({ history }: RouteComponentProps) => (
  <Style className={`${name} Screen`}>
    <Navbar>
      <ChatsNavbar history={history} />
    </Navbar>
    <Suspense fallback={null}>
      <ChatsList history={history} />
    </Suspense>
    <AddChatButton history={history} />
  </Style>
)
