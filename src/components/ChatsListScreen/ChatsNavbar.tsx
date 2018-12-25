import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Popover from '@material-ui/core/Popover'
import MoreIcon from '@material-ui/icons/MoreVert'
import SignOutIcon from '@material-ui/icons/PowerSettingsNew'
import SettingsIcon from '@material-ui/icons/Settings'
import { History } from 'history'
import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { signOut } from '../../services/auth-service'

const name = 'ChatsNavbar'

const Style = styled.div `
  .${name}-title {
    float: left;
  }

  .${name}-options-btn {
    float: right;
    font-size: 1.2em;
    margin-right: -15px;
    color: var(--primary-text);
  }

  .${name}-options-item svg {
    margin-right: 10px;
  }
`

interface ChatsNavbarProps {
  history: History;
}

export default ({ history }: ChatsNavbarProps) => {
  const [popped, setPopped] = useState(false)

  const handleSignOut = () => {
    signOut()

    history.push('/sign-in')
  }

  return (
    <Style className={name}>
      <span className={`${name}-title`}>WhatsApp Clone</span>
      <Button className={`${name}-options-btn`} onClick={setPopped.bind(null, true)}>
        <MoreIcon />
      </Button>
      <Popover
        open={popped}
        onClose={setPopped.bind(null, false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Style>
          <List>
            <ListItem className={`${name}-options-item`} button><SettingsIcon />Settings</ListItem>
            <ListItem className={`${name}-options-item`} button onClick={handleSignOut}><SignOutIcon />Sign Out</ListItem>
          </List>
        </Style>
      </Popover>
    </Style>
  )
}
