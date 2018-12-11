import * as React from 'react'
import { Suspense } from 'react'
import styled from 'styled-components'
import { useGetMessages } from '../../graphql-hooks/messages-hooks'
import Navbar from '../Navbar'
import MessageBox from './MessageBox'
import MessagesList from './MessagesList'

const name = 'ChatScreen'

const Style = styled.div `
  height: calc(100% - 56px);

  .${name}-body {
    position: relative;
    background: url(/assets/chat-background.jpg);
    width: 100%;
    height: 100%;

    .MessagesList {
      position: absolute;
      height: calc(100% - 60px);
      top: 0;
    }

    .MessageBox {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`

export default () => {
  const { data } = useGetMessages()

  return (
    <Style className={name}>
      <Navbar>
        WhatsApp Clone
      </Navbar>
      <div className={`${name}-body`}>
        <Suspense fallback={null}>
          <MessagesList messages={data.chat.messages} />
        </Suspense>
        <MessageBox />
      </div>
    </Style>
  )
}
