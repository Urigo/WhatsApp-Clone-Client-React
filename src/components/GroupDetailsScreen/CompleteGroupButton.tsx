import Button from '@material-ui/core/Button'
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt'
import { History } from 'history'
import * as React from 'react'
import styled from 'styled-components'

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
}

export default ({ history }: CompleteGroupButtonProps) => {
  const onClick = () => {
    history.push('/chats')
  }

  return (
    <Style className={name}>
      <Button variant="contained" color="secondary" onClick={onClick}>
        <ArrowRightIcon />
      </Button>
    </Style>
  )
}
