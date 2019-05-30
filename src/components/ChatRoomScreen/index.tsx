import gql from 'graphql-tag';
import React from 'react';
import { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ChatNavbar from './ChatNavbar';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import { History } from 'history';
import { useGetChatQuery, useAddMessageMutation } from '../../graphql/types';
import * as fragments from '../../graphql/fragments';
import { writeMessage } from '../../services/cache.service';

 const Container = styled.div `
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

// eslint-disable-next-line
const getChatQuery = gql `
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...FullChat
    }
  }
  ${fragments.fullChat}
`;

// eslint-disable-next-line
const addMessageMutation = gql `
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${fragments.message}
`;

interface ChatRoomScreenParams {
  chatId: string
  history: History;
};

const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({ history, chatId }) => {
  const { data, loading } = useGetChatQuery({
    variables: { chatId }
  });

  const addMessage = useAddMessageMutation();

  const onSendMessage = useCallback((content: string) => {

    if (data === undefined) { return null; }
    const chat = data.chat;
    if (chat === null) return null;

    addMessage({
      variables: { chatId, content },
      optimisticResponse: {
        __typename: 'Mutation',
        addMessage: {
          __typename: 'Message',
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          isMine: true,
          chat: {
            __typename: 'Chat',
            id: chatId,
          },
          content,
        }
      },
      update: (client, { data: { addMessage } }) => {
        writeMessage(client, addMessage);
      },
    })
  }, [data, chatId, addMessage]);

  if (data === undefined) {
    return null;
  }
  const chat = data.chat;
  const loadingChat = loading;

  if (loadingChat) return null;
  if (chat === null) return null;

  // Chat was probably removed from cache by the subscription handler
  if (!chat) {
    return (
      <Redirect to="/chats" />
    );
  }

  return (
    <Container>
      <ChatNavbar chat={chat} history={history} />
      {chat.messages && (
        <MessagesList messages={chat.messages} />
      )}
      <MessageInput onSendMessage={onSendMessage}/>
    </Container>
  );
};

export default ChatRoomScreen;