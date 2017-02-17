import React from 'react'
import * as firebase from 'firebase'
import {replace} from 'react-router'

export default class Login extends React.Component {
  _handleAuth = (result) => {
    console.log('result', result)
  }

  _handleError = (error) => {
    console.error('error', error)
  }

  componentWillMount () {
    this.provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(this.provider)
      .then(this._handleAuth)
      .catch(this._handleError)
  }

  render () {
    return null
  }
}
