import React from 'react'
import * as firebase from 'firebase'
import Header from './Header'

export default class Authenticated extends React.Component {
  _signOut = () => {
    firebase.auth().signOut()
  }

  render () {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
