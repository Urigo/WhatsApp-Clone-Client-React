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
    }
  }
  ${fragments.chat}
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
    },
    update: (client, { data: { addGroup } }) => {
      client.writeFragment({
        id: addGroup.id,
        fragment: fragments.chat,
        data: addGroup,
      })
    }
  })

  const onClick = () => {
    addGroup().then(() => {
      history.push('/chats')
    })
  }

  return (
    <Style className="CompleteGroupButton">
      <Button variant="contained" color="secondary" onClick={onClick}>
        <ArrowRightIcon />
      </Button>
    </Style>
  )
}
