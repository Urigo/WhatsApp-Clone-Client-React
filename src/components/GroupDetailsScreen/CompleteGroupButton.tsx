import Button from '@material-ui/core/Button'
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt'
import gql from 'graphql-tag'
import { History } from 'history'
import * as React from 'react'
import { useMutation } from 'react-apollo-hooks'
import styled from 'styled-components'
import * as fragments from '../../fragments'
import { useSubscription } from '../../polyfills/react-apollo-hooks'
import { User, CompleteGroupButtonMutation, CompleteGroupButtonSubscription } from '../../types'

const name = 'CompleteGroupButton'

const Style = styled.div `
  position: fixed;
  right: 10px;
  bottom: 10px;

  button {
    min-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 999px;
    background-color: var(--secondary-bg);
    color: white;
  }
`

const mutation = gql `
  mutation CompleteGroupButtonMutation($recipientIds: [ID!]!, $groupName: String!) {
    addGroup(recipientIds: $recipientIds, groupName: $groupName) {
      ...Chat
      messages {
        ...Message
      }
    }
  }
  ${fragments.chat}
  ${fragments.message}
`

const subscription = gql `
  subscription CompleteGroupButtonSubscription {
    chatAdded {
      ...Chat
      messages(amount: 1) {
        ...Message
      }
    }
  }
  ${fragments.chat}
  ${fragments.message}
`

interface CompleteGroupButtonProps {
  history: History;
  users: User.Fragment[];
  groupName: string;
}

export default ({ history, users, groupName }: CompleteGroupButtonProps) => {
  const addGroup = useMutation<CompleteGroupButtonMutation.Mutation, CompleteGroupButtonMutation.Variables>(mutation, {
    variables: {
      recipientIds: users.map(user => user.id),
      groupName,
    }
  })

  useSubscription<CompleteGroupButtonSubscription.Subscription>(subscription, {
    onSubscriptionData: ({ client, subscriptionData: { chatAdded } }) => {
      client.writeFragment({
        id: chatAdded.id,
        fragment: fragments.chat,
        data: chatAdded,
      })
    }
  })

  const onClick = () => {
    addGroup().then(() => {
      history.push('/chats')
    })
  }

  return (
    <Style className={name}>
      <Button variant="contained" color="secondary" onClick={onClick}>
        <ArrowRightIcon />
      </Button>
    </Style>
  )
}
