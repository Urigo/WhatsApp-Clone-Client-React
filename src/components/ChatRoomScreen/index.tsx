import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import React from 'react';
import { useCallback } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import ChatNavbar from './ChatNavbar';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import { History } from 'history';
import * as queries from '../../graphql/queries';
import * as fragments from '../../graphql/fragments';

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...FullChat
    }
  }
  ${fragments.fullChat}
`;

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

export interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: number;
}

export interface ChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: Array<ChatQueryMessage>;
}

type OptionalChatQueryResult = ChatQueryResult | null;

interface ChatsResult {
  chats: any[];
}

const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({
  history,
  chatId,
}) => {
  const {
    data: { chat },
  } = useQuery<any>(getChatQuery, {
    variables: { chatId },
  });
  const addMessage = useMutation(addMessageMutation);

  const onSendMessage = useCallback(
    (content: string) => {
      addMessage({
        variables: { chatId, content },
        optimisticResponse: {
          __typename: 'Mutation',
          addMessage: {
            __typename: 'Message',
            id: Math.random()
              .toString(36)
              .substr(2, 9),
            createdAt: new Date(),
            content,
          },
        },
        update: (client, { data: { addMessage } }) => {
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

          if (fullChat === null) {
            return;
          }
          if (fullChat.messages.some((m: any) => m.id === addMessage.id))
            return;

          fullChat.messages.push(addMessage);
          fullChat.lastMessage = addMessage;

          client.writeFragment({
            id: chatIdFromStore,
            fragment: fragments.fullChat,
            fragmentName: 'FullChat',
            data: fullChat,
          });

          let data;
          try {
            data = client.readQuery<ChatsResult>({
              query: queries.chats,
            });
          } catch (e) {
            return;
          }

          if (!data || data === null) {
            return null;
          }
          if (!data.chats || data.chats === undefined) {
            return null;
          }
          const chats = data.chats;

          const chatIndex = chats.findIndex((c: any) => c.id === chatId);
          if (chatIndex === -1) return;
          const chatWhereAdded = chats[chatIndex];

          // The chat will appear at the top of the ChatsList component
          chats.splice(chatIndex, 1);
          chats.unshift(chatWhereAdded);

          client.writeQuery({
            query: queries.chats,
            data: { chats: chats },
          });
        },
      });
    },
    [chat, chatId, addMessage]
  );

  if (!chat) return null;

  return (
    <Container>
      <ChatNavbar chat={chat} history={history} />
      {chat.messages && <MessagesList messages={chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

export default ChatRoomScreen;
