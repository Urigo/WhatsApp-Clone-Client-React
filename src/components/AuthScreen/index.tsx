import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import AnimatedSwitch from '../AnimatedSwitch'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const name = 'AuthScreen'

const Style = styled.div `
`

export default ({ history, location }: RouteComponentProps) => (
  <Style className={`${name} Screen`}>
    <img src="assets/whatsapp-icon.png" />
    <h2>WhatsApp Clone</h2>
    <AnimatedSwitch>
      <Route exact path="/sign-in" component={SignInForm} />
      <Route exact path="/sign-up" component={SignUpForm} />
    </AnimatedSwitch>
  </Style>
)
