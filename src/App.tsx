import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withAuth } from './services/auth.service';

export default () => (
  <Switch>
    <Route exact path='/auth' component={AuthScreen} />
    <Route exact path='/chats' component={ChatsListScreen} />
    <Route exact path='/chats/:chatId' component={ChatScreen} />
    <Route exact path='/new-chat' component={NewChatScreen} />
    <Route exact path='/new-chat/group' component={NewChatGroupScreen} />
    <Route path='/' to="/chats" component={Redirect} />
  </Switch>
)
