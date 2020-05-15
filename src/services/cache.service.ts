import { DataProxy } from 'apollo-cache';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import * as fragments from '../graphql/fragments';
import * as queries from '../graphql/queries';
import {
  MessageFragment,
  useMessageAddedSubscription,
  ChatsQuery,
  ChatFragment,
  useChatAddedSubscription,
  useChatRemovedSubscription,
} from '../graphql/types';

type Client = Pick<
  DataProxy,
  'readFragment' | 'writeFragment' | 'readQuery' | 'writeQuery'
>;

export const useCacheService = () => {
  useMessageAddedSubscription({
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (data) {
        writeMessage(client, data.messageAdded);
      }
    },
  });

  useChatAddedSubscription({
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (data) {
        writeChat(client, data.chatAdded);
      }
    },
  });

  useChatRemovedSubscription({
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (data) {
        eraseChat(client, data.chatRemoved);
      }
    },
  });
};

export const writeMessage = (client: Client, message: MessageFragment) => {
  type FullChat = { [key: string]: any };
  let fullChat;

  const chatIdFromStore = defaultDataIdFromObject(message.chat);

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
  if (fullChat.messages.messages.some((m: any) => m.id === message.id)) return;

  fullChat.messages.messages.push(message);
  fullChat.lastMessage = message;

  client.writeFragment({
    id: chatIdFromStore,
    fragment: fragments.fullChat,
    fragmentName: 'FullChat',
    data: fullChat,
  });

  let data;
  try {
    data = client.readQuery<ChatsQuery>({
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

  const chatIndex = chats.findIndex((c: any) => {
    if (message === null || message.chat === null) return -1;
    return c.id === message?.chat?.id;
  });
  if (chatIndex === -1) return;
  const chatWhereAdded = chats[chatIndex];

  // The chat will appear at the top of the ChatsList component
  chats.splice(chatIndex, 1);
  chats.unshift(chatWhereAdded);

  client.writeQuery({
    query: queries.chats,
    data: { chats: chats },
  });
};

export const writeChat = (client: Client, chat: ChatFragment) => {
  const chatId = defaultDataIdFromObject(chat);
  if (chatId === null) {
    return;
  }

  client.writeFragment({
    id: chatId,
    fragment: fragments.chat,
    fragmentName: 'Chat',
    data: chat,
  });

  let data;
  try {
    data = client.readQuery<ChatsQuery>({
      query: queries.chats,
    });
  } catch (e) {
    return;
  }

  if (!data) return;

  const chats = data.chats;

  if (!chats) return;
  if (chats.some((c: any) => c.id === chat.id)) return;

  chats.unshift(chat);

  client.writeQuery({
    query: queries.chats,
    data: { chats },
  });
};

export const eraseChat = (client: Client, chatId: string) => {
  const chatType = {
    __typename: 'Chat',
    id: chatId,
  };

  const chatIdFromObject = defaultDataIdFromObject(chatType);
  if (chatIdFromObject === null) {
    return;
  }

  client.writeFragment({
    id: chatIdFromObject,
    fragment: fragments.fullChat,
    fragmentName: 'FullChat',
    data: null,
  });

  let data: ChatsQuery | null;
  try {
    data = client.readQuery<ChatsQuery>({
      query: queries.chats,
    });
  } catch (e) {
    return;
  }

  if (!data || !data.chats) return;

  const chats = data.chats;

  if (!chats) return;

  const chatIndex = chats.findIndex((c: any) => c.id === chatId);

  if (chatIndex === -1) return;

  // The chat will appear at the top of the ChatsList component
  chats.splice(chatIndex, 1);

  client.writeQuery({
    query: queries.chats,
    data: { chats: chats },
  });
};
