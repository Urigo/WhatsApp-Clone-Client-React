import React from 'react';
import { render } from '@testing-library/react';
import ChatsNavbar from './components/ChatsListScreen/ChatsNavbar';

test('renders learn react link', () => {
  const { getByText } = render(<ChatsNavbar />);
  const linkElement = getByText(/Whatsapp Clone/i);
  expect(linkElement).toBeInTheDocument();
});
