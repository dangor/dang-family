import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {concat, filter} from 'lodash'
import * as firebase from 'firebase'
import {browserHistory} from 'react-router'
import {updateFirebaseState} from '../../actions/firebaseActions'

const config = {
  apiKey: "AIzaSyDm6oo3m3nRmO0LF1-g2poVg2peWb0LO4o",
  authDomain: "dang-house.firebaseapp.com",
  databaseURL: "https://dang-house.firebaseio.com",
  storageBucket: "dang-house.appspot.com",
  messagingSenderId: "487443983747"
}

class Firebase extends React.Component {
  _handleLogout = () => {
    browserHistory.replace('/login')
  }

  componentWillMount () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this._handleLogout()
      }
    })

    const buttons = firebase.database().ref('buttons')
    buttons.on('child_added', data => {
      const button = {
        key: data.key,
        label: data.val().label
      }
      this.props.updateFirebaseState({buttons: buttons => concat(buttons || [], button)})
    })
    buttons.on('child_removed', data => {
      this.props.updateFirebaseState({buttons: buttons => filter(buttons, ({key}) => key !== data.key)})
    })
  }

  render () {
    return null
  }
}

Firebase.propTypes = {
  updateFirebaseState: PropTypes.func
}

export default connect(
  null,
  {updateFirebaseState}
)(Firebase)
