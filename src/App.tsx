import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withAuth } from './services/auth.service';
import AuthScreen from './components/AuthScreen';
import ChatsListScreen from './components/ChatsListScreen';
import ChatScreen from './components/ChatScreen';
import NewChatScreen from './components/NewChatScreen';
import NewChatGroupScreen from './components/NewChatGroupScreen';

const RedirectToChats = () => (
  <Redirect to="/chats" />
)

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/auth" component={AuthScreen} />
      <Route exact path="/chats" component={withAuth(ChatsListScreen)} />
      <Route exact path="/chats/:chatId" component={withAuth(ChatScreen)} />
      <Route exact path="/new-chat" component={withAuth(NewChatScreen)} />
      <Route exact path="/new-chat/group" component={withAuth(NewChatGroupScreen)} />
      <Route path="/" component={RedirectToChats} />
    </Switch>
  </BrowserRouter>
)
