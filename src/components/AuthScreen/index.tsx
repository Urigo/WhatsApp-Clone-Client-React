import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import AnimatedSwitch from '../AnimatedSwitch'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const name = 'AuthScreen'

const Style = styled.div `
  background: radial-gradient(rgb(34,65,67), rgb(17,48,50)), url(/assets/chat-background.jpg) no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
  color: white;

  .${name}-intro {
    height: 265px;
  }

  .${name}-icon {
    width: 125px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    padding-top: 70px;
    display: block;
  }

  .${name}-title {
    width: 100%;
    text-align: center;
    color: white;
  }

  .${name}-text-field {
    width: 100%;
    position: relative;
  }

  .${name}-text-field > div::before {
    border-color: white !important;
  }

  .${name}-error {
    position: absolute;
    color: red;
    font-size: 15px;
    margin-top: -5px;
  }

  .${name}-alternative {
    position: absolute;
    bottom: 10px;
    left: 10px;

    a {
      color: var(--secondary-bg);
    }
  }

  .Screen {
    height: calc(100% - 265px);
  }

  form {
    padding: 20px;

    > div {
      padding-bottom: 35px;
    }
  }

  legend {
    font-weight: bold;
    color: white;
  }

  label {
    color: white !important;
  }

  input {
    color: white;

    &::placeholder {
      color: var(--primary-bg);
    }
  }

  button {
    width: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--secondary-bg) !important;

    &[disabled] {
      color: #38a81c;
    }

    &:not([disabled]) {
      color: white;
    }
  }
`

export default ({ history, location }: RouteComponentProps) => (
  <Style className={`${name} Screen`}>
    <div className={`${name}-intro`}>
      <img src="assets/whatsapp-icon.png" className={`${name}-icon`} />
      <h2 className={`${name}-title`}>WhatsApp Clone</h2>
    </div>
    <AnimatedSwitch>
      <Route exact path="/sign-in" component={SignInForm} />
      <Route exact path="/sign-up" component={SignUpForm} />
    </AnimatedSwitch>
  </Style>
)
