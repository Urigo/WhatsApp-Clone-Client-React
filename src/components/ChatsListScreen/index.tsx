import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as React from 'react'
import styled from 'styled-components';
import Navbar from '../Navbar'

const name = 'ChatsListScreen';

const Style = styled.div `
  .${name}-chats-list {
    padding: 0;
  }

  .${name}-chat-item {
    padding: 0 15px;
    display: flex;
  }

  .${name}-profile-pic {
    height: 50px;
    width: auto;
    border-radius: 50%;
  }

  .${name}-info {
    width: calc(100% - 60px);
    height: 100%;
    padding: 15px 0;
    margin-left: 10px;
    border-bottom: .5px solid silver;
    position: relative;
  }

  .${name}-name {
    margin-top: 5px;
  }

  .${name}-last-message {
    color: gray;
    font-size: 15px;
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .${name}-timestamp {
    position: absolute;
    color: gray;
    top: 20px;
    right: 0;
    font-size: 13px;
  }
`

export default () => (
  <Style className={`${name}`}>
    <Navbar>
      WhatsApp Clone
    </Navbar>
    <List className={`${name}-chats-list`}>
      <ListItem className={`${name}-chat-item`} button>
        <img className={`${name}-profile-pic`} src="https://randomuser.me/api/portraits/women/27.jpg" />
        <div className={`${name}-info`}>
          <div className={`${name}-name`}>Ting Tang</div>
          <div className={`${name}-last-message`}>Whatsapp ma man</div>
          <div className={`${name}-timestamp`}>00:00</div>
        </div>
      </ListItem>
      <ListItem className={`${name}-chat-item`} button>
        <img className={`${name}-profile-pic`} src="https://randomuser.me/api/portraits/women/27.jpg" />
        <div className={`${name}-info`}>
          <div className={`${name}-name`}>Ting Tang</div>
          <div className={`${name}-last-message`}>Whatsapp ma man</div>
          <div className={`${name}-timestamp`}>00:00</div>
        </div>
      </ListItem>
    </List>
  </Style>
)
