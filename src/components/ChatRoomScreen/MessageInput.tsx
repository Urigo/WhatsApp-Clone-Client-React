import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  height: 50px;
  padding: 5px;
  width: calc(100% - 10px);
`;

const ActualInput = styled.input`
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
`;

const SendButton = styled(Button)`
  min-width: 50px !important;
  width: 50px !important;
  border-radius: 999px !important;
  background-color: var(--primary-bg) !important;
  margin: 0 5px !important;
  margin-right: 0 !important;
  color: white !important;
  padding-left: 20px !important;

  svg {
    margin-left: -3px;
  }
`;

interface MessageInputProps {
  onSendMessage(content: string): any;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const onKeyPress = (e: any) => {
    if (e.charCode === 13) {
      submitMessage();
    }
  };

  const onChange = ({ target }: any) => {
    setMessage(target.value);
  };

  const submitMessage = () => {
    if (!message) return;

    setMessage('');

    if (typeof onSendMessage === 'function') {
      onSendMessage(message);
    }
  };

  return (
    <Container>
      <ActualInput
        data-testid="message-input"
        type="text"
        placeholder="Type a message"
        value={message}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
      <SendButton
        data-testid="send-button"
        variant="contained"
        color="primary"
        onClick={submitMessage}>
        <SendIcon />
      </SendButton>
    </Container>
  );
};

export default MessageInput;
