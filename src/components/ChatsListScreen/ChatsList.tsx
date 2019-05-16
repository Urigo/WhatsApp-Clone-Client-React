import React from 'react';
import { chats } from '../../db';
import moment from 'moment';
import { List, ListItem } from '@material-ui/core';

const ChatsList: React.FC = () => (
  <div>
    <List>
      {chats.map((chat) => (
        <ListItem key={chat.id} button>
          <img src={chat.picture} alt="Profile" />
          <div>{chat.name}</div>
          {chat.lastMessage && (
            <React.Fragment>
              <div>{chat.lastMessage.content}</div>
              <div>{moment(chat.lastMessage.createdAt).format('HH:mm')}</div>
            </React.Fragment>
          )}
        </ListItem>
      ))}
    </List>
  </div>
);

export default ChatsList;
