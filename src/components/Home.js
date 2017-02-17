import React from 'react'
import * as firebase from 'firebase'

export default class Home extends React.Component {
  _handleAuth = (result) => {
    console.log('result', result)
  }

  _handleError = (error) => {
    console.error('error', error)
  }

  _signIn = () => {
    firebase.auth().signInWithPopup(this.provider)
      .then(this._handleAuth)
      .catch(this._handleError)
  }

  componentWillMount () {
    this.provider = new firebase.auth.GoogleAuthProvider()
  }

  render () {
    return (
      <div>
        <h2>Dang House</h2>
        <ul>
          <a onClick={this._signIn}>Log in</a>
        </ul>
      </div>
    )
  }
}
