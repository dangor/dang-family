import React from 'react'
import {AppBar} from 'material-ui'
import NavMenu from './NavMenu'

export default class Header extends React.Component {
  render () {
    return (
      <AppBar
        title='Dang House'
        iconElementLeft={<NavMenu />}
      />
    )
  }
}
