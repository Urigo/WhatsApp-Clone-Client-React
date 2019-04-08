import React from 'react';
import styled from 'styled-components';
import UsersList from '../UsersList';
import ChatCreationNavbar from './ChatCreationNavbar';
import { History } from 'history';

// eslint-disable-next-line
const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`;

// eslint-disable-next-line
const StyledUsersList = styled(UsersList)`
  height: calc(100% - 56px);
`;

interface ChildComponentProps {
  history: History;
}

const ChatCreationScreen: React.FC<ChildComponentProps> = ({ history }) => (
  <div>
    <ChatCreationNavbar history={history} />
    <UsersList />
  </div>
);

export default ChatCreationScreen;
