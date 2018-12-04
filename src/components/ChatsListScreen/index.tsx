import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as React from 'react'
import styled from 'styled-components';
import Navbar from '../Navbar'

const StyledDiv = styled.div `
  > ._chats-list {
    padding: 0;

    > ._chat-item {
      padding: 0 15px;
      display: flex;

      > ._profile-pic {
        height: 50px;
        width: auto;
        border-radius: 50%;
      }

      > ._info {
        width: calc(100% - 60px);
        height: 100%;
        padding: 15px 0;
        margin-left: 10px;
        border-bottom: .5px solid silver;
        position: relative;

        > ._name {
          margin-top: 5px;
        }

        > ._last-message {
          color: gray;
          font-size: 15px;
          margin-top: 5px;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        > ._timestamp {
          position: absolute;
          color: gray;
          top: 20px;
          right: 0;
          font-size: 13px;
        }
      }
    }
  }
`

export default () => (
  <StyledDiv>
    <Navbar>
      WhatsApp Clone
    </Navbar>
    <List className="_chats-list">
      <ListItem className="_chat-item" button>
        <img className="_profile-pic" src="https://randomuser.me/api/portraits/women/27.jpg" />
        <div className="_info">
          <div className="_name">Ting Tang</div>
          <div className="_last-message">Whatsapp ma man</div>
          <div className="_timestamp">00:00</div>
        </div>
      </ListItem>
      <ListItem className="_chat-item" button>
        <img className="_profile-pic" src="https://randomuser.me/api/portraits/women/27.jpg" />
        <div className="_info">
          <div className="_name">Ting Tang</div>
          <div className="_last-message">Whatsapp ma man</div>
          <div className="_timestamp">00:00</div>
        </div>
      </ListItem>
    </List>
  </StyledDiv>
)
