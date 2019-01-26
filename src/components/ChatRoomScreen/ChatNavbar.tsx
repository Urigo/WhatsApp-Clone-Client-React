import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Popover from '@material-ui/core/Popover'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreIcon from '@material-ui/icons/MoreVert'
import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { History } from 'history'
import * as React from 'react'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import styled from 'styled-components'
import * as fragments from '../../graphql/fragments'
import * as queries from '../../graphql/queries'
import { ChatNavbarMutation, ChatNavbarQuery, Chats } from '../../graphql/types'

const Style = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;

  margin-left: -20px;
  .ChatNavbar-title {
    line-height: 56px;
  }

  .ChatNavbar-back-button {
    color: var(--primary-text);
  }

  .ChatNavbar-picture {
    height: 40px;
    width: 40px;
    margin-top: 3px;
    margin-left: -22px;
    object-fit: cover;
    padding: 5px;
    border-radius: 50%;
  }

  .ChatNavbar-rest {
    flex: 1;
    justify-content: flex-end;
  }

  .ChatNavbar-options-btn {
    float: right;
    height: 100%;
    font-size: 1.2em;
    margin-right: -15px;
    color: var(--primary-text);
  }

  .ChatNavbar-options-item svg {
    margin-right: 10px;
    padding-left: 15px;
  }
`

const query = gql`
  query ChatNavbarQuery($chatId: ID!) {
    chat(chatId: $chatId) {
      ...Chat
    }
  }
  ${fragments.chat}
`

const mutation = gql`
  mutation ChatNavbarMutation($chatId: ID!) {
    removeChat(chatId: $chatId)
  }
`

interface ChatNavbarProps {
  chatId: string
  history: History
}

export default ({ chatId, history }: ChatNavbarProps) => {
  const {
    data: { chat },
  } = useQuery<ChatNavbarQuery.Query, ChatNavbarQuery.Variables>(query, {
    variables: { chatId },
  })
  const removeChat = useMutation<ChatNavbarMutation.Mutation, ChatNavbarMutation.Variables>(
    mutation,
    {
      variables: { chatId },
      update: (client, { data: { removeChat } }) => {
        client.writeFragment({
          id: defaultDataIdFromObject({
            __typename: 'Chat',
            id: removeChat,
          }),
          fragment: fragments.chat,
          fragmentName: 'Chat',
          data: null,
        })

        let chats
        try {
          chats = client.readQuery<Chats.Query>({
            query: queries.chats,
          }).chats
        } catch (e) {}

        if (chats && chats.some(chat => chat.id === removeChat)) {
          const index = chats.findIndex(chat => chat.id === removeChat)
          chats.splice(index, 1)

          client.writeQuery({
            query: queries.chats,
            data: { chats },
          })
        }
      },
    },
  )
  const [popped, setPopped] = useState(false)

  const navToChats = () => {
    history.push('/chats')
  }

  const handleRemoveChat = () => {
    setPopped(false)
    removeChat().then(navToChats)
  }

  return (
    <Style className={name}>
      <Button className="ChatNavbar-back-button" onClick={navToChats}>
        <ArrowBackIcon />
      </Button>
      <img
        className="ChatNavbar-picture"
        src={chat.picture || '/assets/default-profile-pic.jpg'}
      />
      <div className="ChatNavbar-title">{chat.name}</div>
      <div className="ChatNavbar-rest">
        <Button className="ChatNavbar-options-btn" onClick={setPopped.bind(null, true)}>
          <MoreIcon />
        </Button>
      </div>
      <Popover
        open={popped}
        onClose={setPopped.bind(null, false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Style style={{ marginLeft: '-15px' }}>
          <List>
            <ListItem className="ChatNavbar-options-item" button onClick={handleRemoveChat}>
              <DeleteIcon />
              Delete
            </ListItem>
          </List>
        </Style>
      </Popover>
    </Style>
  )
}
