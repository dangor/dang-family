import React from 'react'
import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDkpSu8HJeeCuDlwWHNq8UZ2nd8x16VPUM",
  authDomain: "dang-family.firebaseapp.com",
  databaseURL: "https://dang-family.firebaseio.com",
  storageBucket: "dang-family.appspot.com",
  messagingSenderId: "984409480314"
}

export default class Firebase extends React.Component {
  componentWillMount () {
    firebase.initializeApp(config)
  }

  render () {
    return null
  }
}
