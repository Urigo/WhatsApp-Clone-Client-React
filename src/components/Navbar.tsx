import * as React from 'react'
import Popover from '@material-ui/core/Popover'
import Toolbar from '@material-ui/core/Toolbar'
import ArrowBack from '@material-ui/icons/ArrowBack'
import styled from 'styled-components'

const name = 'Navbar'

const Style = styled(Toolbar) `
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-size: 20px;
`

interface NavbarProps {
  children: any,
  showBackButton?: boolean,
  onBack?: () => void,
}

const Navbar = (props: NavbarProps) => {
  const { children, showBackButton, onBack } = {
    onBack: () => {},
    ...props,
  }

  return (
    <Style className={`${name} wc-primary-comp`}>
      {showBackButton && <ArrowBack className={`${name}-back-btn`} onClick={onBack} />}
      <div className={`${name}-body`}>
        {children}
      </div>
    </Style>
  )
}

export default Navbar
