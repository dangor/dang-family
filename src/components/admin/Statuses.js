import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import {chain, concat, filter, find, get, isEmpty, includes, join, map, trim, size, some} from 'lodash'
import u from 'updeep'
import {Dialog, TextField, FlatButton, RaisedButton} from 'material-ui'
import DataList from './DataList'

class Statuses extends React.Component {
  state = {
    label: '',
    editKey: undefined,
    stateText: '',
    states: []
  }

  _addStatus = () => {
    firebase.database().ref('statuses').push().set({label: trim(this.state.label)})
    this.setState({label: ''})
  }

  _removeStatus = (key) => {
    const updates = chain(this.props.tablets)
      .filter(tablet => chain(tablet).get('props.statuses').some(status => status === key).value())
      .map(tablet => u({
        props: {
          statuses: statuses => filter(statuses, status => status !== key)
        }
      }, tablet))
      .keyBy('key')
      .mapKeys((value, key) => `/tablets/${key}`)
      .set('/statuses/' + key, null)
      .value()
    firebase.database().ref().update(updates)
  }

  _propsString = (data) => {
    const states = get(data, 'props.states')
    if (!states) {
      return ''
    }

    return `(${join(states, ', ')})`
  }

  _renderNewStatusForm = () => {
    return (
      <form action='#' onSubmit={this._addStatus} className='valignCenter'>
        <TextField
          className='spaceRight'
          floatingLabelText='New status'
          value={this.state.label}
          onChange={(e) => this.setState({label: e.target.value})}
        />
        <RaisedButton
          type='submit'
          label='Add'
          disabled={!trim(this.state.label) || some(this.props.statuses, ({label}) => label === trim(this.state.label))}
        />
      </form>
    )
  }

  _showEditDialog = (key) => {
    const status = find(this.props.statuses, status => status.key === key)
    if (status) {
      this.setState({
        editKey: key,
        states: get(status, 'props.states') || [],
        stateText: ''
      })
    }
  }

  _updateStatus = () => {
    const key = this.state.editKey
    const status = find(this.props.statuses, status => status.key === key)
    if (!status) {
      return
    }

    firebase.database().ref('statuses/' + status.key + '/props/states').set(this.state.states)
    this.setState({
      editKey: undefined,
      states: [],
      stateText: ''
    })
  }

  _renderEditDialog = () => {
    const key = this.state.editKey
    const status = find(this.props.statuses, status => status.key === key) || {}

    return (
      <Dialog
        open={!!key && !isEmpty(status)}
        onRequestClose={() => this.setState({editKey: undefined})}
        title={`Edit ${status.label}`}
      >
        States
        <div className='valignCenter'>
          <TextField
            className='spaceRight'
            floatingLabelText='Label'
            value={this.state.stateText}
            onChange={e => this.setState({stateText: e.target.value})}
          />
          <FlatButton
            label='Add'
            onClick={() => this.setState({
              states: concat(this.state.states, this.state.stateText),
              stateText: ''
            })}
            disabled={this.state.stateText === '' || includes(this.state.states, this.state.stateText)}
          />
        </div>
        <DataList
          list={map(this.state.states, state => ({key: state}))}
          renderText={({key}) => key}
          onRemove={key => this.setState({states: filter(this.state.states, state => state !== key)})}
        />
        <RaisedButton
          primary
          type='submit'
          label='update'
          disabled={size(this.state.states) === 0}
          onClick={this._updateStatus}
        />
      </Dialog>
    )
  }

  render () {
    return (
      <div>
        <DataList
          list={this.props.statuses}
          onRemove={this._removeStatus}
          renderText={(data) => `${data.key}: ${data.label} ${this._propsString(data)}`}
          onClick={this._showEditDialog}
        />
        {this._renderNewStatusForm()}
        {this._renderEditDialog()}
      </div>
    )
  }
}

Statuses.propTypes = {
  statuses: PropTypes.array,
  tablets: PropTypes.array
}

export default connect(
  state => ({
    statuses: state.firebase.statuses || [],
    tablets: state.firebase.tablets || []
  })
)(Statuses)
