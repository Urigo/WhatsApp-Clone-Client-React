import * as React from 'react';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';

interface NavbarProps {
  children: React.Children,
  showBackButton?: boolean,
  onBack?: () => void,
}

const StyledToolbar = styled(Toolbar) `
  font-size: 20px;

  > ._back-btn {

  }

  > ._body {

  }
`

const BackButton = (
  <ArrowBack />
);

const Navbar = ({ children, showBackButton, onBack }: NavbarProps) => (
  <StyledToolbar className="wc-primary-comp">
    {showBackButton && <ArrowBack className="_back-btn" onClick={onBack} />}
    <div className="_body">
      {children}
    </div>
  </StyledToolbar>
);

Navbar.defaultProps = {
  onBack: () => {},
};

export default Navbar;
