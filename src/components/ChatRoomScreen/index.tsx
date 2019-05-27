import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import ChatNavbar from './ChatNavbar';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import { History } from 'history';
import {
  ChatsQuery,
  useGetChatQuery,
  useAddMessageMutation,
} from '../../graphql/types';
import * as queries from '../../graphql/queries';
import * as fragments from '../../graphql/fragments';

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

// eslint-disable-next-line
const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...FullChat
    }
  }
  ${fragments.fullChat}
`;

// eslint-disable-next-line
const addMessageMutation = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${fragments.message}
`;

interface ChatRoomScreenParams {
  chatId: string;
  history: History;
}

interface ChatsResult {
  chats: any[];
}

const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({
  history,
  chatId,
}) => {
  const { data, loading } = useGetChatQuery({
    variables: { chatId },
  });

  const [addMessage] = useAddMessageMutation();

  const onSendMessage = useCallback(
    (content: string) => {
      if (data === undefined) {
        return null;
      }
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
            content,
          },
        },
        update: (client, { data }) => {
          if (data && data.addMessage) {
            type FullChat = { [key: string]: any };
            let fullChat;
            const chatIdFromStore = defaultDataIdFromObject(chat);

            if (chatIdFromStore === null) {
              return;
            }
            try {
              fullChat = client.readFragment<FullChat>({
                id: chatIdFromStore,
                fragment: fragments.fullChat,
                fragmentName: 'FullChat',
              });
            } catch (e) {
              return;
            }

            if (fullChat === null || fullChat.messages === null) {
              return;
            }
            if (
              fullChat.messages.some(
                (currentMessage: any) =>
                  data.addMessage && currentMessage.id === data.addMessage.id
              )
            ) {
              return;
            }

            fullChat.messages.push(data.addMessage);
            fullChat.lastMessage = data.addMessage;

            client.writeFragment({
              id: chatIdFromStore,
              fragment: fragments.fullChat,
              fragmentName: 'FullChat',
              data: fullChat,
            });

            let clientChatsData: ChatsQuery | null;
            try {
              clientChatsData = client.readQuery({
                query: queries.chats,
              });
            } catch (e) {
              return;
            }

            if (!clientChatsData || !clientChatsData.chats) {
              return null;
            }
            const chats = clientChatsData.chats;

            const chatIndex = chats.findIndex(
              (currentChat: any) => currentChat.id === chatId
            );
            if (chatIndex === -1) return;
            const chatWhereAdded = chats[chatIndex];

            // The chat will appear at the top of the ChatsList component
            chats.splice(chatIndex, 1);
            chats.unshift(chatWhereAdded);

            client.writeQuery({
              query: queries.chats,
              data: { chats: chats },
            });
          }
        },
      });
    },
    [data, chatId, addMessage]
  );

  if (data === undefined) {
    return null;
  }
  const chat = data.chat;
  const loadingChat = loading;

  if (loadingChat) return null;
  if (chat === null) return null;

  return (
    <Container>
      <ChatNavbar chat={chat} history={history} />
      {chat?.messages && <MessagesList messages={chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

export default ChatRoomScreen;
