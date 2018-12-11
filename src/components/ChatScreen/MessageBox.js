import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const name = 'MessageBox'

const Style = styled.div `
  display: flex;
  height: 50px;
  padding: 5px;
  width: calc(100% - 10px);

  .${name}-input {
    width: calc(100% - 50px);
    border: none;
    border-radius: 999px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 15px;
    outline: none;
    box-shadow: 0 1px silver;
    font-size: 18px;
    line-height: 45px;
  }

  .${name}-button {
    min-width: 50px;
    width: 50px;
    border-radius: 999px;
    background-color: var(--primary-bg);
    margin: 0 5px;
    color: white;
    padding-left: 20px;

    svg {
      margin-left: -3px;
    }
  }
`

interface MessageBoxProps {
  onSubmitMessage: (message: string) => {};
  disabled?: boolean;
}

export default ({ disabled, onSubmitMessage }: MessageBoxProps) => {
  const [message, setMessage] = useState('')

  const onInputChange = ({ keyCode, target }: KeyboardEvent) => {
    if (keyCode == 13) {
      submitMessage()
    }
    else {
      setMessage(target.value)
    }
  }

  const submitMessage = () => {
    if (!message) return
    if (disabled) return

    onSubmitMessage(message)
    setMessage('')
  }

  return (
    <Style className={name}>
      <input className={`${name}-input`} type="text" placeholder="Type a message" value={message} onChange={onInputChange} />
      <Button className={`${name}-button`} onClick={submitMessage} disabled={disabled}>
        <SendIcon />
      </Button>
    </Style>
  )
}
