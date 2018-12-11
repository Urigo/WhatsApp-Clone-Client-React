import * as React from 'react'
import { Suspense } from 'react'
import styled from 'styled-components'
import Navbar from '../Navbar'
import MessagesList from './MessagesList'
import MessageBox from './MessageBox'

const name = 'ChatScreen'

const Style = styled.div `
  .${name}-body {
    position: relative;
    background: url(/assets/chat-background.jpg);
    width: 100%;
    height: 100%;

    .MessagesList {
      position: absolute;
      height: calc(100% - 50px);
      top: 0;
    }

    .MessageBox {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`

export default () => (
  <Style className={name}>
    <Navbar>
      WhatsApp Clone
    </Navbar>
    <div className={`${name}-body`}>
      <Suspense fallback={null}>
        <MessagesList />
      </Suspense>
      <MessageBox />
    </div>
  </Style>
)
