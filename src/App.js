import React, { Component } from 'react'
import Firebase from './components/firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Firebase />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}
