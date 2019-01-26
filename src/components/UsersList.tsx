import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CheckCircle from '@material-ui/icons/CheckCircle'
import gql from 'graphql-tag'
import * as React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import * as fragments from '../graphql/fragments'
import { UsersListQuery, User } from '../graphql/types'

const Style = styled.div`
  .UsersList-users-list {
    padding: 0;
  }

  .UsersList-user-item {
    position: relative;
    padding: 7.5px 15px;
    display: flex;
    ${props => props.selectable && 'cursor: pointer;'}
  }

  .UsersList-profile-pic {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
  }

  .UsersList-name {
    padding-left: 15px;
    font-weight: bold;
  }

  .UsersList-checkmark {
    position: absolute;
    left: 50px;
    top: 35px;
    color: var(--secondary-bg);
    background-color: white;
    border-radius: 50%;
  }
`

const query = gql`
  query UsersListQuery {
    users {
      ...User
    }
  }
  ${fragments.user}
`

interface UsersListProps {
  selectable?: boolean
  onSelectionChange?: (users: User.Fragment[]) => void
  onUserPick?: (user: User.Fragment) => void
}

export default (props: UsersListProps) => {
  const { selectable, onSelectionChange, onUserPick } = {
    selectable: false,
    onSelectionChange: () => {},
    onUserPick: () => {},
    ...props,
  }

  const [selectedUsers, setSelectedUsers] = useState([])
  const {
    data: { users },
  } = useQuery<UsersListQuery.Query>(query)

  const onListItemClick = user => {
    if (!selectable) {
      return onUserPick(user)
    }

    if (selectedUsers.includes(user)) {
      const index = selectedUsers.indexOf(user)
      selectedUsers.splice(index, 1)
    } else {
      selectedUsers.push(user)
    }

    setSelectedUsers(selectedUsers)
    onSelectionChange(selectedUsers)
  }

  return (
    <Style className="UsersList" selectable={selectable}>
      <List className="UsersList-users-list">
        {users.map(user => (
          <ListItem
            className="UsersList-user-item"
            key={user.id}
            button
            onClick={onListItemClick.bind(null, user)}
          >
            <img
              className="UsersList-profile-pic"
              src={user.picture || '/assets/default-profile-pic.jpg'}
            />
            <div className="UsersList-name">{user.name}</div>

            {selectedUsers.includes(user) && <CheckCircle className="UsersList-checkmark" />}
          </ListItem>
        ))}
      </List>
    </Style>
  )
}
