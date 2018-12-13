import * as React from 'react'
import styled from 'styled-components'

const name = 'SignUpForm'

const Style = styled.div `
`

interface SignUpFormProps {
  handleSignIn: () => void;
}

export default ({ handleSignIn }: SignUpFormProps) => (
  <Style className={`${name} Screen`} />
)
