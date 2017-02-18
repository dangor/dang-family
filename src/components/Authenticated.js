import React from 'react'
import * as firebase from 'firebase'
import Header from './Header'
import './styles/Authenticated.css'

export default class Authenticated extends React.Component {
  _signOut = () => {
    firebase.auth().signOut()
  }

  render () {
    return (
      <div>
        <Header />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
