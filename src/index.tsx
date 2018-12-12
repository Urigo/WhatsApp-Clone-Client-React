import * as React from 'react'
import { Suspense } from 'react'
import * as ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo-hooks'
import App from './App'
import apolloClient from './apollo-client'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

ReactDOM.render(
  (
    <ApolloProvider client={apolloClient}>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </ApolloProvider>
  ),
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
