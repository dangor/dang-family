import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import routes from './routes'
import './index.css'
import {createStore} from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
