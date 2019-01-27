import Button from '@material-ui/core/Button'
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt'
import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { History } from 'history'
import * as React from 'react'
import { useMutation } from 'react-apollo-hooks'
import styled from 'styled-components'
import { time as uniqid } from 'uniqid'
import * as fragments from '../../graphql/fragments'
import * as queries from '../../graphql/queries'
import { Chats, User, CompleteGroupButtonMutation } from '../../graphql/types'
import { useMe } from '../../services/auth.service'

const Style = styled.div`
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

const mutation = gql`
  mutation CompleteGroupButtonMutation(
    $userIds: [ID!]!
    $groupName: String!
    $groupPicture: String
  ) {
    addGroup(userIds: $userIds, groupName: $groupName, groupPicture: $groupPicture) {
      ...Chat
    }
  }
  ${fragments.chat}
`

interface CompleteGroupButtonProps {
  history: History
  users: User.Fragment[]
  groupName: string
  groupPicture: string
}

export default ({ history, users, groupName, groupPicture }: CompleteGroupButtonProps) => {
  const me = useMe()

  const addGroup = useMutation<
    CompleteGroupButtonMutation.Mutation,
    CompleteGroupButtonMutation.Variables
  >(mutation, {
    optimisticResponse: {
      __typename: 'Mutation',
      addGroup: {
        __typename: 'Chat',
        id: uniqid(),
        name: groupName,
        picture: groupPicture,
        allTimeMembers: users,
        owner: me,
        isGroup: true,
        lastMessage: null,
      },
    },
    variables: {
      userIds: users.map(user => user.id),
      groupName,
      groupPicture,
    },
    update: (client, { data: { addGroup } }) => {
      client.writeFragment({
        id: defaultDataIdFromObject(addGroup),
        fragment: fragments.chat,
        fragmentName: 'Chat',
        data: addGroup,
      })

      let chats
      try {
        chats = client.readQuery<Chats.Query>({
          query: queries.chats,
        }).chats
      } catch (e) {}

      if (chats && !chats.some(chat => chat.id === addGroup.id)) {
        chats.unshift(addGroup)

        client.writeQuery({
          query: queries.chats,
          data: { chats },
        })
      }
    },
  })

  const onClick = () => {
    addGroup().then(({ data: { addGroup } }) => {
      history.push(`/chats/${addGroup.id}`)
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
