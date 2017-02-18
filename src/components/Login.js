import React from 'react'
import * as firebase from 'firebase'
import {RaisedButton} from 'material-ui'
import {browserHistory} from 'react-router'

export default class Login extends React.Component {
  _signIn = () => {
    firebase.auth().signInWithPopup(this.provider)
      .then(() => browserHistory.replace('/home'))
  }

  componentWillMount () {
    this.provider = new firebase.auth.GoogleAuthProvider()
  }

  render () {
    return (
      <RaisedButton
        primary
        onClick={this._signIn}
        label='Sign in'
      />
    )
  }
}
