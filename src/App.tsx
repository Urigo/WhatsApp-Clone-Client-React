import * as React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import AnimatedSwitch from './components/AnimatedSwitch'
import AuthScreen from './components/AuthScreen'
import ChatsListScreen from './components/ChatsListScreen'
import { withAuth } from './services/auth.service'

const RedirectToChats = () => (
  <Redirect to="/chats" />
)

export default () => (
  <BrowserRouter>
    <AnimatedSwitch>
      <Route exact path="/sign-(in|up)" component={AuthScreen} />
      <Route exact path="/chats" component={withAuth(ChatsListScreen)} />
      <Route component={RedirectToChats} />
    </AnimatedSwitch>
  </BrowserRouter>
)
