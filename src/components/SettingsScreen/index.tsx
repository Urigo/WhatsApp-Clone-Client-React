import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { useGetMe, useChangeUserInfo } from '../../graphql-hooks'
import { pickPicture, uploadProfilePicture } from '../../services/picture-service'
import Navbar from '../Navbar'
import SettingsNavbar from './SettingsNavbar'

const name = 'SettingsScreen'

const Style = styled.div `
  .${name}-picture {
    max-width: 300px;
    display: block;
    margin: auto;
    margin-top: 50px;

    img {
      object-fit: contain;
      border-radius: 50%;
      margin-bottom: -34px;
      width: 100%;
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

export default ({ history }: RouteComponentProps) => {
  const { data: { me } } = useGetMe()
  const changeUserInfo = useChangeUserInfo()

  const updateName = (e) => {
    changeUserInfo({
      variables: { name: e.target.value || '' }
    })
  }

  const updatePicture = async () => {
    const file = await pickPicture()
    const { url } = await uploadProfilePicture(file)

    changeUserInfo({
      variables: { picture: url }
    })
  }

  return (
    <Style className={`${name} Screen`}>
      <Navbar>
        <SettingsNavbar history={history} />
      </Navbar>
      <div className={`${name}-picture`}>
        <img src={me.picture || '/assets/default-profile-pic.jpg'} />
        <EditIcon onClick={updatePicture} />
      </div>
      <TextField
        className={`${name}-name-input`}
        label="Name"
        value={me.name}
        onChange={updateName}
        margin="normal"
        placeholder="Enter your name"
      />
    </Style>
  )
}
