import React, { Component } from 'react'
import './App.css'
import Firebase from './components/firebase'
import * as firebase from 'firebase'

export default class App extends Component {
  componentDidMount () {
    firebase.database()
  }

  render () {
    return (
      <div className="App">
        <h2>Dang Family</h2>
        <Firebase />
      </div>
    );
  }
}
