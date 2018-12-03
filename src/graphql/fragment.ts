import gql from 'graphql-tag';
import {DocumentNode} from 'graphql';

export const fragments: {
  [key: string]: DocumentNode
} = {
  chatWithoutMessages: gql`
    fragment ChatWithoutMessages on Chat {
      id
      name
      picture
      allTimeMembers {
        id
      }
      unreadMessages
      isGroup
    }
  `,
  message: gql`
    fragment Message on Message {
      id
      chat {
        id
      }
      sender {
        id
        name
      }
      content
      createdAt
      type
      recipients {
        user {
          id
        }
        message {
          id
          chat {
            id
          }
        }
        chat {
          id
        }
        receivedAt
        readAt
      }
      ownership
    }
  `,
};
