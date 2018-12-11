import * as React from 'react'
import { Suspense } from 'react'
import Navbar from '../Navbar'
import ChatsList from './ChatsList'

const name = 'ChatsListScreen'

export default () => (
  <div className={name}>
    <Navbar>
      WhatsApp Clone
    </Navbar>
    <Suspense fallback={null}>
      <ChatsList />
    </Suspense>
  </div>
)
