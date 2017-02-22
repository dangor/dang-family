import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import {chain, filter, find, get, isEmpty, trim, some} from 'lodash'
import u from 'updeep'
import {Dialog, TextField, RaisedButton, SelectField, MenuItem} from 'material-ui'
import DataList from './DataList'
import './styles/Buttons.css'

class Buttons extends React.Component {
  state = {
    label: '',
    editKey: undefined,
    repeatNum: '',
    repeatUnit: undefined
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

  _propsString = (data) => {
    const repeat = get(data, 'props.repeat')
    if (!repeat) {
      return ''
    }

    return `(every ${repeat.num} ${repeat.unit})`
  }

  _renderNewButtonForm = () => {
    return (
      <form action='#' onSubmit={this._addButton} className='valignCenter'>
        <TextField
          className='spaceRight'
          floatingLabelText='New button'
          value={this.state.label}
          onChange={(e) => this.setState({label: e.target.value})}
        />
        <RaisedButton
          type='submit'
          label='Add'
          disabled={!trim(this.state.label) || some(this.props.buttons, ({label}) => label === trim(this.state.label))}
        />
      </form>
    )
  }

  _showEditDialog = (key) => {
    const button = find(this.props.buttons, button => button.key === key)
    if (button) {
      this.setState({
        editKey: key,
        repeatNum: get(button, 'props.repeat.num') || '',
        repeatUnit: get(button, 'props.repeat.unit')
      })
    }
  }

  _updateButton = () => {
    const key = this.state.editKey
    const button = find(this.props.buttons, button => button.key === key)
    if (!button) {
      return
    }

    firebase.database().ref('buttons/' + button.key + '/props/repeat').set({
      num: Number(trim(this.state.repeatNum)),
      unit: this.state.repeatUnit
    })
    this.setState({
      editKey: undefined,
      repeatNum: '',
      repeatUnit: undefined
    })
  }

  _renderEditDialog = () => {
    const key = this.state.editKey
    const button = find(this.props.buttons, button => button.key === key) || {}

    return (
      <Dialog
        open={!!key && !isEmpty(button)}
        onRequestClose={() => this.setState({editKey: undefined})}
        title={`Edit ${button.label}`}
      >
        Repeats every
        <form action='#' className='valignCenter' onSubmit={this._updateButton}>
          <TextField
            type='tel'
            pattern='[0-9]*'
            className='spaceRight'
            floatingLabelText='#, e.g. 12'
            value={this.state.repeatNum}
            onChange={e => {
              if (e.target.validity.valid) {
                this.setState({repeatNum: e.target.value})
              }
            }}
          />
          <SelectField
            className='spaceRight'
            floatingLabelText='Units, e.g. hours'
            value={this.state.repeatUnit}
            onChange={(e, i, value) => this.setState({repeatUnit: value})}
          >
            {['hours', 'days', 'weeks', 'months'].map((value, i) => (
              <MenuItem
                key={i}
                value={value}
                primaryText={value}
              />
            ))}
          </SelectField>
          <RaisedButton
            primary
            type='submit'
            label='update'
            disabled={Number(trim(this.state.repeatNum)) <= 0 || !this.state.repeatUnit}
          />
        </form>
      </Dialog>
    )
  }

  render () {
    return (
      <div>
        <DataList
          list={this.props.buttons}
          onRemove={this._removeButton}
          renderText={(data) => `${data.key}: ${data.label} ${this._propsString(data)}`}
          onClick={this._showEditDialog}
        />
        {this._renderNewButtonForm()}
        {this._renderEditDialog()}
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
