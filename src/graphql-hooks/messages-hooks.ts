import { useQuery, useMutation } from 'react-apollo-hooks'
import { addMessageMutation } from '../graphql-documents/messages-documents'
import { AddMessage } from '../types'

export const useAddMessage = (options?) => {
  return useMutation<AddMessage.Mutation, AddMessage.Variables>(addMessageMutation, options)
}
