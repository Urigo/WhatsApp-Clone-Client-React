import Toolbar from '@material-ui/core/Toolbar'
import * as React from 'react'
import styled from 'styled-components'

const name = 'Navbar'

const Style = styled(Toolbar)`
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-size: 20px;
  line-height: 40px;

  .${name}-body {
    width: 100%;
  }
`

interface NavbarProps {
  children: any
}

export default ({ children }: NavbarProps) => (
  <Style className={`${name}`}>
    <div className={`${name}-body`}>{children}</div>
  </Style>
)
