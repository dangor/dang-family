import React from 'react'
import * as firebase from 'firebase'

export default class Home extends React.Component {
  _signOut = () => {
    firebase.auth().signOut()
  }

  render () {
    return (
      <div>
        <h2>Dang House</h2>
        <ul>
          <li><a onClick={this._signOut}>Log out</a></li>
        </ul>
      </div>
    )
  }
}
