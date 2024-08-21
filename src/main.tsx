import React from 'react'
import ReactDOM from 'react-dom/client'
import { Amplify } from 'aws-amplify';
import { Authenticator, View, Image } from '@aws-amplify/ui-react';
import config from './aws-exports.ts'

import App from './App.tsx'

import './index.css'
import { StyledAuthenticator } from './pages/authenticator-styles.tsx';
import PokemonLogo from './assets/img/pokemon-logo.png';

Amplify.configure(config)

const components = {
  Header() {
    return (
      <View className="pokemon-logo">
        <Image src={PokemonLogo} alt="Login Background" />
      </View>
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledAuthenticator>
      <Authenticator components={components}>
        {({ user }) => (
            <main>
              <App cognitoUser={user} />
            </main>
        )}
      </Authenticator>
    </StyledAuthenticator>
  </React.StrictMode >
)
