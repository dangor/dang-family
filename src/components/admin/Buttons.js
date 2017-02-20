import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import {get, trim, some} from 'lodash'
import {TextField, RaisedButton} from 'material-ui'
import DataList from './DataList'
import moment from 'moment'

class Buttons extends React.Component {
  state = {
    label: ''
  }

  static mapStateToProps (state) {
    return {
      buttons: state.firebase.buttons || []
    }
  }

  _addButton = () => {
    firebase.database().ref('buttons').push().set({label: trim(this.state.label)})
    this.setState({label: ''})
  }

  _dateString = (data) => {
    const momentPushed = get(data, 'props.momentPushed')
    if (!momentPushed) {
      return '(Never pushed)'
    }

    return `(${moment(momentPushed).fromNow()})`
  }

  render () {
    return (
      <div>
        <DataList
          list={this.props.buttons}
          refPath='buttons'
          renderText={(data) => `${data.key}: ${data.label} ${this._dateString(data)}`}
        />
        <form action='#'>
          <TextField
            hintText='Label'
            value={this.state.label}
            onChange={(e) => this.setState({label: e.target.value})}
          />
          <RaisedButton
            type='submit'
            label='Add'
            onClick={this._addButton}
            disabled={!trim(this.state.label) || some(this.props.buttons, ({label}) => label === trim(this.state.label))}
          />
        </form>
      </div>
    )
  }
}

Buttons.propTypes = {
  buttons: PropTypes.array
}

export default connect(
  Buttons.mapStateToProps
)(Buttons)
