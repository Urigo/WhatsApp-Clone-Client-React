import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import * as React from 'react'
import { Suspense } from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import * as ReactDOM from 'react-dom'
import apolloClient from './apollo-client'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2c6157' },
    secondary: { main: '#6fd056' },
  },
  typography: {
    useNextVariants: true,
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={apolloClient}>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement,
)

registerServiceWorker()
