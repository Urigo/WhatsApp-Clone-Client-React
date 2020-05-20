import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Toolbar, Button } from '@material-ui/core';
import React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { History } from 'history';

const Container = styled(Toolbar)`
  display: flex;
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-size: 20px;
  line-height: 40px;
`;

const BackButton = styled(Button)`
  svg {
    color: var(--primary-text);
  }
`;

const Title = styled.div`
  flex: 1;
`;

interface ChildComponentProps {
  history: History;
}

const ChatCreationNavbar: React.FC<ChildComponentProps> = ({ history }) => {
  const navBack = useCallback(() => {
    history.replace('/chats');
  }, [history]);

  return (
    <Container>
      <BackButton data-testid="back-button" onClick={navBack}>
        <ArrowBackIcon />
      </BackButton>
      <Title>Create Chat</Title>
    </Container>
  );
};

export default ChatCreationNavbar;
