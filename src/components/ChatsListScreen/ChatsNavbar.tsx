import React from 'react';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled(Toolbar)`
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-size: 20px;
  line-height: 40px;
`;

const ChatsNavbar: React.FC = () => <Container>Whatsapp Clone</Container>;

export default ChatsNavbar;
