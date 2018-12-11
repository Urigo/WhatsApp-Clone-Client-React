import * as React, { Suspense } from 'react'
import Navbar from '../Navbar'
import ChatsList from './ChatsList'

const name = 'ChatsListScreen'

export default () => (
  <div className={name}>
    <Navbar>
      WhatsApp Clone
    </Navbar>
    <Suspense>
      <ChatsList />
    </Suspense>
  </div>
)
