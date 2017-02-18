import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import {trim, some} from 'lodash'
import {Divider, List, ListItem, IconButton, TextField, RaisedButton} from 'material-ui'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

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
  }

  _removeButton = (key) => () => {
    firebase.database().ref('buttons/' + key).remove()
  }

  render () {
    return (
      <div>
        <List>
          {this.props.buttons.map(button => (
            <div key={button.key}>
              <Divider />
              <ListItem
                key={button.key}
                primaryText={`${button.key}: ${button.label} (${button.momentPushed})`}
                rightIconButton={
                  <IconButton onClick={this._removeButton(button.key)}>
                    <NavigationClose />
                  </IconButton>
                }
                disabled
              />
            </div>
          ))}
          <Divider />
        </List>
        <TextField
          hintText='Label'
          value={this.state.label}
          onChange={(e) => this.setState({label: e.target.value})}
        />
        <RaisedButton
          label='Add'
          onClick={this._addButton}
          disabled={!trim(this.state.label) || some(this.props.buttons, ({label}) => label === trim(this.state.label))}
        />
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
