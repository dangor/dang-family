import React from 'react'
import {AppBar, IconButton} from 'material-ui'
import NavMenu from './NavMenu'
import DeviceSignalWifiOff from 'material-ui/svg-icons/device/signal-wifi-off'
import * as firebase from 'firebase'

export default class Header extends React.Component {
  state = {
    firebaseConnected: true
  }

  _rightIcon = () => {
    if (this.state.firebaseConnected) {
      return null
    } else {
      return <IconButton disabled><DeviceSignalWifiOff /></IconButton>
    }
  }

  componentDidMount () {
    // update state on firebase connection status change
    firebase.database().ref(".info/connected").on("value", snap => {
      this.setState({firebaseConnected: snap.val() === true})
    })
  }

  render () {
    return (
      <AppBar
        title='Dang House'
        iconElementLeft={<NavMenu />}
        iconElementRight={this._rightIcon()}
      />
    )
  }
}
