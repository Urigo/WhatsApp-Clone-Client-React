import React from 'react';
import ChatsNavbar from './ChatsNavbar';
import ChatsList from './ChatsList';

const ChatsListScreen: React.FC = () => (
  <div>
    <ChatsNavbar />
    <ChatsList />
  </div>
);

export default ChatsListScreen;
