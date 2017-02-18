import React from 'react'
import * as firebase from 'firebase'
import {RaisedButton} from 'material-ui'

export default class Login extends React.Component {
  _signIn = () => {
    firebase.auth().signInWithPopup(this.provider)
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
