import React from 'react';
import ChatsList from './components/ChatsList';
import ChatsNavbar from './components/ChatsNavbar';

function App() {
  return (
    <div>
      <ChatsNavbar />
      <ChatsList />
    </div>
  );
}

export default App;
