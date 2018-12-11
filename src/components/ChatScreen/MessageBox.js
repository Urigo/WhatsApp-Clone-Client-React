import * as React from 'react'
import styled from 'styled-components'

const name = 'MessageBox'

const Style = styled.div `
  display: flex;
  height: 50px;
  padding: 5px;

  .${name}-input {
    width: 100%;
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
    min-width: 45px;
    width: 45px;
    border-radius: 999px;
    background-color: var(--primary);
    margin-left: 5px;
    color: white;

    > mat-icon {
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

  const onInputKeyup = ({ keyCode }: KeyboardEvent) => {
    if (!message) return

    if (keyCode == 13) {
      submitMessage()
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
      <input className={`${name}-input`} type="text" placeholder="Type a message" onKeyUp={onInputKeyUp}>{message}</input>
      <button className={`${name}-button`} mat-button onClick={submitMessage} disabled={disabled}>
        <mat-icon aria-label="Icon-button with a send icon">send</mat-icon>
      </button>
    </Style>
  )
}
