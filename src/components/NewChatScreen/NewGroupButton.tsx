import Button from '@material-ui/core/Button'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import { History } from 'history'
import * as React from 'react'
import styled from 'styled-components'

const name = 'NewGroupButton'

const Style = styled.div `
  display: flex;
  width: 100%;

  button {
    text-transform: none;
    font-size: inherit;
    width: 100%;
    justify-content: flex-start;

    svg {
      font-size: 30px;
      margin-top: 10px;
    }
  }

  .${name}-icon {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
    color: white;
    background-color: var(--secondary-bg);
  }

  .${name}-title {
    padding-left: 15px;
    font-weight: bold;
  }
`

interface NewGroupButtonProps {
  history: History;
}

export default ({ history }: NewGroupButtonProps) => {
  const navToGroup = () => {
    history.push('/new-chat/group')
  }

  return (
    <Style>
      <Button onClick={navToGroup}>
        <div className={`${name}-icon`}>
          <GroupAddIcon />
        </div>
        <div className={`${name}-title`}>New Group</div>
      </Button>
    </Style>
  )
}
