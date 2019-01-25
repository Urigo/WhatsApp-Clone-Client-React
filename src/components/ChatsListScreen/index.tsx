import * as React from 'react'
import { Suspense } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Navbar from '../Navbar'
import ChatsList from './ChatsList'
import ChatsNavbar from './ChatsNavbar'

export default ({ history }: RouteComponentProps) => (
  <div className="ChatsListScreen Screen">
    <Navbar>
      <ChatsNavbar history={history} />
    </Navbar>
    <Suspense fallback={null}>
      <ChatsList />
    </Suspense>
  </div>
)
