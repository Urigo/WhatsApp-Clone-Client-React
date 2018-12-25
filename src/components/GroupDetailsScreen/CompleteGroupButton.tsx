import Button from '@material-ui/core/Button'
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt'
import { History } from 'history'
import * as React from 'react'
import styled from 'styled-components'
import { useAddGroup } from '../../graphql-hooks'
import { GetUsers } from '../../types'

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

interface CompleteGroupButtonProps {
  history: History;
  users: GetUsers.Users[];
  groupName: string;
}

export default ({ history, users, groupName }: CompleteGroupButtonProps) => {
  const addGroup = useAddGroup({
    variables: {
      recipientIds: users.map(user => user.id),
      groupName,
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
