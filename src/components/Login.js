import React from 'react'
import * as firebase from 'firebase'

export default class Login extends React.Component {
  _signIn = () => {
    firebase.auth().signInWithPopup(this.provider)
  }

  componentWillMount () {
    this.provider = new firebase.auth.GoogleAuthProvider()
  }

  render () {
    return (
      <button onClick={this._signIn}>
        Sign in
      </button>
    )
  }
}
