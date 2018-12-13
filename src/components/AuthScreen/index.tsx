import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const name = 'AuthScreen'

const Style = styled.div `
`

export default () => {
  const [signingIn, setSigningIn] = useState(true)

  const signIn = () => {
    setSigningIn(true)
  }

  const signUp = () => {
    setSigningIn(false)
  }

  return (
    <Style className={`${name} Screen`}>
      <img src="assets/whatsapp-icon.png" />
      <h2>WhatsApp Clone</h2>
      {signingIn ? (
        <SignInForm handleSignUp={signUp} />
      ) : (
        <SignUpForm handleSignIn={signIn} />
      )}
    </Style>
  )
}
