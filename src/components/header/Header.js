import React from 'react'
import {AppBar, FlatButton} from 'material-ui'
import NavMenu from './NavMenu'
import * as firebase from 'firebase'

export default class Header extends React.Component {
  _signOut = () => {
    firebase.auth().signOut()
  }

  render () {
    return (
      <AppBar
        title='Dang House'
        iconElementRight={
          <FlatButton
            label='logout'
            onClick={this._signOut}
          />
        }
        iconElementLeft={<NavMenu />}
      />
    )
  }
}
