import * as React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AnimatedSwitch, spring } from 'react-router-transition'
import styled from 'styled-components'
import AuthScreen from './components/AuthScreen'
import { withAuth } from './services/auth.service'
import ChatsListScreen from './components/ChatsListScreen'
import ChatScreen from './components/ChatScreen'
import NewChatScreen from './components/NewChatScreen'
import NewChatGroupScreen from './components/NewChatGroupScreen'

const StyledAnimatedSwitch = styled(AnimatedSwitch) `
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  > div {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
`

const glide = (val) => spring(val, {
  stiffness: 174,
  damping: 24,
})

const mapStyles = (styles) => ({
  transform: `translateX(${styles.offset}%)`,
})

const RedirectToChats = () => (
  <Redirect to="/chats" />
)

export default () => (
  <BrowserRouter>
    <StyledAnimatedSwitch
      atEnter={{ offset: 100 }}
      atLeave={{ offset: glide(-100) }}
      atActive={{ offset: glide(0) }}
      mapStyles={mapStyles}
    >
      <Route exact path="/auth" component={AuthScreen} />
      <Route exact path="/chats" component={withAuth(ChatsListScreen)} />
      <Route exact path="/chats/:chatId" component={withAuth(ChatScreen)} />
      <Route exact path="/new-chat" component={withAuth(NewChatScreen)} />
      <Route exact path="/new-chat/group" component={withAuth(NewChatGroupScreen)} />
      <Route path="/" component={RedirectToChats} />
    </StyledAnimatedSwitch>
  </BrowserRouter>
)
