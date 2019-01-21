import * as React from 'react'
import { Suspense } from 'react'
import Navbar from '../Navbar'
import ChatsList from './ChatsList'
import ChatsNavbar from './ChatsNavbar'

export default () => (
  <div className="ChatsListScreen Screen">
    <Navbar>
      <ChatsNavbar />
    </Navbar>
    <Suspense fallback={null}>
      <ChatsList />
    </Suspense>
  </div>
)
