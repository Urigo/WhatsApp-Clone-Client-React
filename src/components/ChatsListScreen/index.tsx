import * as React from 'react'
import { Suspense } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Navbar from '../Navbar'
import ChatsList from './ChatsList'
import AddChatButton from './AddChatButton'

const name = 'ChatsListScreen'

export default ({ history }: RouteComponentProps) => (
  <div className={`${name} Screen`}>
    <Navbar>
      WhatsApp Clone
    </Navbar>
    <Suspense fallback={null}>
      <ChatsList history={history} />
    </Suspense>
    <AddChatButton history={history} />
  </div>
)
