import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import configureStore, { history } from './configureStore'
import { BookmarkManager } from './components';

const store = configureStore()

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={BookmarkManager} />
        <Route path="/bookmark" component={BookmarkManager} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)