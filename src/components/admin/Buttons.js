import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import {chain, filter, get, trim, some} from 'lodash'
import u from 'updeep'
import {TextField, RaisedButton} from 'material-ui'
import DataList from './DataList'
import moment from 'moment'

class Buttons extends React.Component {
  state = {
    label: ''
  }

  _addButton = () => {
    firebase.database().ref('buttons').push().set({label: trim(this.state.label)})
    this.setState({label: ''})
  }

  _removeButton = (key) => {
    const updates = chain(this.props.tablets)
      .filter(tablet => chain(tablet).get('props.buttons').some(button => button === key).value())
      .map(tablet => u({
        props: {
          buttons: buttons => filter(buttons, button => button !== key)
        }
      }, tablet))
      .keyBy('key')
      .mapKeys((value, key) => `/tablets/${key}`)
      .set('/buttons/' + key, null)
      .value()
    firebase.database().ref().update(updates)
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
          onRemove={this._removeButton}
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
  buttons: PropTypes.array,
  tablets: PropTypes.array
}

export default connect(
  state => ({
    buttons: state.firebase.buttons || [],
    tablets: state.firebase.tablets || []
  })
)(Buttons)
