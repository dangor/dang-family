import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import {trim, some} from 'lodash'
import {TextField, RaisedButton} from 'material-ui'
import DataList from './DataList'

class Tablets extends React.Component {
  state = {
    label: ''
  }

  static mapStateToProps (state) {
    return {
      tablets: state.firebase.tablets || []
    }
  }

  _addTablet = (e) => {
    e.preventDefault()
    firebase.database().ref('tablets').push().set({label: trim(this.state.label)})
    this.setState({label: ''})
  }

  _removeTablet = (key) => {
    firebase.database().ref('tablets/' + key).remove()
  }

  render () {
    return (
      <div>
        <DataList
          list={this.props.tablets}
          refPath='tablets'
          renderText={(data) => `${data.key}: ${data.label}`}
          onRemove={this._removeTablet}
        />
        <form className='valignCenter' onSubmit={this._addTablet}>
          <TextField
            className='spaceRight'
            hintText='Label'
            value={this.state.label}
            onChange={(e) => this.setState({label: e.target.value})}
          />
          <RaisedButton
            type='submit'
            label='Add'
            disabled={!trim(this.state.label) || some(this.props.tablets, ({label}) => label === trim(this.state.label))}
          />
        </form>
      </div>
    )
  }
}

Tablets.propTypes = {
  tablets: PropTypes.array
}

export default connect(
  Tablets.mapStateToProps
)(Tablets)
