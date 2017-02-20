import React, { Component } from 'react'
import Firebase from './components/firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const muiTheme = getMuiTheme({
  button: {
    height: 56
  },
  raisedButton: {
    fontSize: 18,
    fontWeight: 'bolder'
  }
})

export default class App extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Firebase />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}
