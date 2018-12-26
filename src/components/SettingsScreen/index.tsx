import * as React from 'react'
import { Suspense } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../Navbar'
import SettingsForm from './SettingsForm'
import SettingsNavbar from './SettingsNavbar'

const name = 'SettingsScreen'

const Style = styled.div `
`

export default ({ history }: RouteComponentProps) => (
  <Style className={`${name} Screen`}>
    <Navbar>
      <SettingsNavbar history={history} />
    </Navbar>
    <Suspense fallback={null}>
      <SettingsForm />
    </Suspense>
  </Style>
)
