import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import {browserHistory} from 'react-router'

var config = {
  apiKey: "AIzaSyDm6oo3m3nRmO0LF1-g2poVg2peWb0LO4o",
  authDomain: "dang-house.firebaseapp.com",
  databaseURL: "https://dang-house.firebaseio.com",
  storageBucket: "dang-house.appspot.com",
  messagingSenderId: "487443983747"
}

export default class Firebase extends React.Component {
  _handleLogin = (user) => {
    browserHistory.replace('/home')
  }

  _handleLogout = () => {
    browserHistory.replace('/login')
  }

  componentWillMount () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this._handleLogin(user)
      } else {
        this._handleLogout()
      }
    })
  }

  render () {
    return null
  }
}
