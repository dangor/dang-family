import React from 'react'
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDm6oo3m3nRmO0LF1-g2poVg2peWb0LO4o",
  authDomain: "dang-house.firebaseapp.com",
  databaseURL: "https://dang-house.firebaseio.com",
  storageBucket: "dang-house.appspot.com",
  messagingSenderId: "487443983747"
}

export default class Firebase extends React.Component {
  componentWillMount () {
    firebase.initializeApp(config)
  }

  render () {
    return null
  }
}
