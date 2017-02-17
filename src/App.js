import React, { Component } from 'react'
import './App.css'
import Firebase from './components/firebase'

export default class App extends Component {
  render () {
    return (
      <div className="App">
        <Firebase />
        {this.props.children}
      </div>
    );
  }
}
