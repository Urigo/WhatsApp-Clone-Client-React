import React from 'react';
import ChatsList from './components/ChatsList';
import ChatsNavbar from './components/ChatsNavbar';

const App: React.FC = () => {
  return (
    <div>
      <ChatsNavbar />
      <ChatsList />
    </div>
  );
};

export default App;
