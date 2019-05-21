import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import styled from 'styled-components';

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

const MessageInput: React.FC = () => {
  return (
    <Container>
      <ActualInput type="text" placeholder="Type a message" />
      <SendButton variant="contained" color="primary">
        <SendIcon />
      </SendButton>
    </Container>
  );
};

export default MessageInput;
