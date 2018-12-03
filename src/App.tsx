import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withAuth } from './services/auth.service';
import AuthScreen from './components/AuthScreen';
import ChatsListScreen from './components/ChatsListScreen';
import ChatScreen from './components/ChatScreen';
import NewChatScreen from './components/NewChatScreen';
import NewChatGroupScreen from './components/NewChatGroupScreen';

export default () => (
  <Switch>
    <Route exact path="/auth" component={AuthScreen} />
    <Route exact path="/chats" component={ChatsListScreen} />
    <Route exact path="/chats/:chatId" component={ChatScreen} />
    <Route exact path="/new-chat" component={NewChatScreen} />
    <Route exact path="/new-chat/group" component={NewChatGroupScreen} />
    <Route path="/" to="/chats" component={Redirect} />
  </Switch>
)
