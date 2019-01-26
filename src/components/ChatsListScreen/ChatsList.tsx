import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import gql from 'graphql-tag'
import { History } from 'history'
import * as moment from 'moment'
import * as React from 'react'
import { useQuery } from 'react-apollo-hooks'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import * as fragments from '../../graphql/fragments'
import { ChatsListQuery } from '../../graphql/types'

const Style = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;

  .ChatsList-chats-list {
    padding: 0;
  }

  .ChatsList-chat-item {
    height: 76px;
    padding: 0 15px;
    display: flex;
  }

  .ChatsList-profile-pic {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
  }

  .ChatsList-info {
    width: calc(100% - 60px);
    height: calc(100% - 30px);
    padding: 15px 0;
    margin-left: 10px;
    border-bottom: 0.5px solid silver;
    position: relative;
  }

  .ChatsList-name {
    margin-top: 5px;
  }

  .ChatsList-last-message {
    color: gray;
    font-size: 15px;
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .ChatsList-timestamp {
    position: absolute;
    color: gray;
    top: 20px;
    right: 0;
    font-size: 13px;
  }
`

const query = gql`
  query ChatsListQuery {
    chats {
      ...Chat
    }
  }

  ${fragments.chat}
`

interface ChatsListProps {
  history: History
}

export default ({ history }: ChatsListProps) => {
  const {
    data: { chats },
  } = useQuery<ChatsListQuery.Query>(query)

  const navToChat = chatId => {
    history.push(`chats/${chatId}`)
  }

  return (
    <Style className="ChatsList">
      <List className="ChatsList-chats-list">
        {chats.map(chat => (
          <ListItem
            key={chat.id}
            className="ChatsList-chat-item"
            button
            onClick={navToChat.bind(null, chat.id)}
          >
            <img
              className="ChatsList-profile-pic"
              src={chat.picture || '/assets/default-profile-pic.jpg'}
            />
            <div className="ChatsList-info">
              <div className="ChatsList-name">{chat.name}</div>
              {chat.lastMessage && (
                <React.Fragment>
                  <div className="ChatsList-last-message">{chat.lastMessage.content}</div>
                  <div className="ChatsList-timestamp">
                    {moment(chat.lastMessage.createdAt).format('HH:mm')}
                  </div>
                </React.Fragment>
              )}
            </div>
          </ListItem>
        ))}
      </List>
    </Style>
  )
}
