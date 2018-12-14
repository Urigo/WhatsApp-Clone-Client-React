import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import * as React from 'react'
import styled from 'styled-components'
import { useGetUsers } from '../graphql-hooks/users-hooks'

const name = 'UsersList'

const Style = styled.div `
  .${name}-users-list {
    padding: 0;
  }

  .${name}-user-item {
    padding: 7.5px 15px;
    display: flex;
  }

  .${name}-profile-pic {
    height: 50px;
    width: 50px;
    object-fit: contain;
    border-radius: 50%;
  }

  .${name}-name {
    padding-left: 15px;
    font-weight: bold;
  }
`

export default () => {
  const { data: { users } } = useGetUsers()

  return (
    <Style className={name}>
      <List className={`${name}-users-list`}>
        {users.map(user => (
          <ListItem className={`${name}-user-item`} key={user._id} button>
            <img className={`${name}-profile-pic`} src={user.picture || '/assets/default-profile-pic.jpg'} />
            <div className={`${name}-name`}>{user.name}</div>
          </ListItem>
        ))}
      </List>
    </Style>
  )
}
