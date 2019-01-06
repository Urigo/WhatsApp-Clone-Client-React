import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CheckCircle from '@material-ui/icons/CheckCircle'
import * as React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import * as fragments from '../fragments'
import { UsersListQuery, User } from '../types'

const name = 'UsersList'

const Style = styled.div `
  .${name}-users-list {
    padding: 0;
  }

  .${name}-user-item {
    position: relative;
    padding: 7.5px 15px;
    display: flex;
    ${props => props.selectable && 'cursor: pointer;'}
  }

  .${name}-profile-pic {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
  }

  .${name}-name {
    padding-left: 15px;
    font-weight: bold;
  }

  .${name}-checkmark {
    position: absolute;
    left: 50px;
    top: 35px;
    color: var(--primary-bg);
  }
`

const query = gql `
  query UsersListQuery {
    users {
      ...User
    }
  }
  ${fragments.user}
`

const subscription = gql `
  subscription UsersListSubscription {
    userInfoChanged {
      ...User
    }
  }
  ${fragments.user}
`

interface UsersListProps {
  selectable?: boolean;
  onSelectionChange?: (users: GetUsers.Users[]) => void;
  onUserPick?: (user: GetUsers.Users) => void;
}

export default (props: UsersListProps) => {
  const { selectable, onSelectionChange, onUserPick } = {
    selectable: false,
    onSelectionChange: () => {},
    onUserPick: () => {},
    ...props,
  }

  const [selectedUsers, setSelectedUsers] = useState([])
  const { data: { users } } = useQuery<UsersListQuery>(query)

  useSubscription(subscription, {
    onSubscriptionData: ({ client, subscriptionData: { userInfoChanged } }) => {
      client.writeFragment({
        id: userInfoChanged,
        fragment: fragments.user,
        data: userInfoChanged,
      })
    }
  })

  const onListItemClick = (user) => {
    if (!selectable) {
      return onUserPick(user)
    }

    if (selectedUsers.includes(user)) {
      const index = selectedUsers.indexOf(user)
      selectedUsers.splice(index, 1)
    }
    else {
      selectedUsers.push(user)
    }

    setSelectedUsers(selectedUsers)
    onSelectionChange(selectedUsers)
  }

  return (
    <Style className={name} selectable={selectable}>
      <List className={`${name}-users-list`}>
        {users && users.map(user => (
          <ListItem className={`${name}-user-item`} key={user.id} button onClick={onListItemClick.bind(null, user)}>
            <img className={`${name}-profile-pic`} src={user.picture || '/assets/default-profile-pic.jpg'} />
            <div className={`${name}-name`}>{user.name}</div>

            {selectedUsers.includes(user) && (
              <CheckCircle className={`${name}-checkmark`} />
            )}
          </ListItem>
        ))}
      </List>
    </Style>
  )
}
