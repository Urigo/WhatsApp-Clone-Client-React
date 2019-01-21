import * as React from 'react'
import styled from 'styled-components'

const Style = styled.div`
  .ChatsNavbar-title {
    float: left;
  }
`

export default () => (
  <Style className="ChatsNavbar">
    <span className="ChatsNavbar-title">WhatsApp Clone</span>
  </Style>
)
