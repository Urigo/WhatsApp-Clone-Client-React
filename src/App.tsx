import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import AuthScreen from './components/AuthScreen';
import ChatRoomScreen from './components/ChatRoomScreen';
import ChatsListScreen from './components/ChatsListScreen';
import AnimatedSwitch from './components/AnimatedSwitch';
import { useCacheService } from './services/cache.service';

const App: React.FC = () => {
  useCacheService();

  return (
    <BrowserRouter>
      <AnimatedSwitch>
        <Route exact path="/sign-(in|up)" component={AuthScreen} />
        <Route exact path="/chats" component={ChatsListScreen} />

        <Route
          exact
          path="/chats/:chatId"
          component={({
            match,
            history,
          }: RouteComponentProps<{ chatId: string }>) => (
            <ChatRoomScreen chatId={match.params.chatId} history={history} />
          )}
        />
      </AnimatedSwitch>
      <Route exact path="/" render={redirectToChats} />
    </BrowserRouter>
  );
};

const redirectToChats = () => <Redirect to="/chats" />;

export default App;
