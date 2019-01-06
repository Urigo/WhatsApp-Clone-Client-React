import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import gql from 'graphql-tag'
import * as React from 'react'
import { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import * as fragments from '../../fragments'
import { pickPicture, uploadProfilePicture } from '../../services/picture-service'
import Navbar from '../Navbar'
import { SettingsFormQuery, SettingsFormMutation } from '../types'
import SettingsNavbar from './SettingsNavbar'

const name = 'SettingsForm'

const Style = styled.div `
  .${name}-picture {
    max-width: 300px;
    display: block;
    margin: auto;
    margin-top: 50px;

    img {
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: -34px;
      width: 300px;
      height: 300px;
    }

    svg {
      float: right;
      font-size: 30px;
      opacity: 0.5;
      border-left: black solid 1px;
      padding-left: 5px;
      cursor: pointer;
    }
  }

  .${name}-name-input {
    display: block;
    margin: auto;
    width: calc(100% - 50px);
    margin-top: 50px;

    > div {
      width: 100%;
    }
  }
`

const query = gql `
  query SettingsFormQuery {
    me {
      ...User
    }
  }
  ${fragments.user}
`

const mutation = gql `
  mutation SettingsFormMutation($name: String, $picture: String) {
    changeUserInfo(name: $name, picture: $picture) {
      ...User
    }
  }
  ${fragments.user}
`

export default ({ history }: RouteComponentProps) => {
  const { data: { me } } = useQuery<SettingsFormQuery.Query>(query)
  const changeUserInfo = useMutation<SettingsFormMutation.Mutation, SettingsFormMutation.Variables>(mutation)
  const [myName, setMyName] = useState(me.name)
  const [myPicture, setMyPicture] = useState(me.picture)

  const updateNameInput = ({ target }) => {
    setMyName(target.value)
  }

  const updateName = () => {
    changeUserInfo({
      variables: { name: myName }
    })
  }

  const updatePicture = async () => {
    const file = await pickPicture()

    if (!file) return

    const { url } = await uploadProfilePicture(file)

    setMyPicture(url)

    changeUserInfo({
      variables: { picture: url }
    })
  }

  return (
    <Style className={name}>
      <div className={`${name}-picture`}>
        <img src={myPicture || '/assets/default-profile-pic.jpg'} />
        <EditIcon onClick={updatePicture} />
      </div>
      <TextField
        className={`${name}-name-input`}
        label="Name"
        value={myName}
        onChange={updateNameInput}
        onBlur={updateName}
        margin="normal"
        placeholder="Enter your name"
      />
    </Style>
  )
}
