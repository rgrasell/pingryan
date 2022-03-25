import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './state/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Auth0Provider
            domain="dev-kwej9nfs.auth0.com"
            clientId="mj3xJhYvVtc1TrHN4vFHAIbp6KawfxYs"
            redirectUri={window.location.origin}
        >
            <App />
        </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your state to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
