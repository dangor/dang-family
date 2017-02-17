import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import routes from './routes'
import './index.css'
import {createStore} from 'redux'
import reducers from './reducers'

let store = createStore(reducers)

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
)
