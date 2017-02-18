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

  _addTablet = () => {
    firebase.database().ref('tablets').push().set({label: trim(this.state.label)})
    this.setState({label: ''})
  }

  render () {
    return (
      <div>
        <DataList
          list={this.props.tablets}
          refPath='tablets'
          renderText={(data) => `${data.key}: ${data.label}`}
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
            onClick={this._addTablet}
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
