import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GetMessages, AddMessage } from '../types'

export const addMessageMutation = gql `
  mutation AddMessage($chatId: ID!, $contents: String!) {
    addMessage(chatId: $chatId, contents: $contents) {
      _id
      contents
      sentAt
      isMine
      from {
        name
      }
    }
  }
`

export const useAddMessage = (options?) => {
  return useMutation<AddMessage.Mutation, AddMessage.Variables>(addMessageMutation, options)
}

const getMessagesQuery = gql `
  query GetMessages($chatId: ID!) {
    chat(chatId: $chatId) {
      _id
      messages {
        _id
        sentAt
        contents
        isMine
        from {
          name
        }
      }
    }
  }
`

export const useGetMessages = (options?) => {
  return useQuery<GetMessages.Query, GetMessages.Variables>(getMessagesQuery, options)
}
