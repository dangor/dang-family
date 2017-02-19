import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {concat, find, get} from 'lodash'
import {RaisedButton} from 'material-ui'
import * as firebase from 'firebase'
import './styles/TabletView.css'
import ButtonMenu from './ButtonMenu'

class TabletView extends React.Component {
  _addButton = (buttonKey) => () => {
    firebase.database().ref('tablets/' + this.props.params.key + '/props/buttons').set(
      concat(this.props.tabletButtons || [], buttonKey)
    )
  }

  render () {
    return (
      <div>
        <div className='heading'>
          <h2>{this.props.label}</h2>
          <ButtonMenu addButton={this._addButton} />
        </div>
        <div>
          {this.props.buttons.map(button => (
            <div
              key={button.key}
              className='buttonArea'
            >
              <RaisedButton
                primary
                label={button.label}
                fullWidth
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

TabletView.propTypes = {
  label: PropTypes.string,
  tabletButtons: PropTypes.array,
  buttons: PropTypes.array
}

export default connect(
  (state, props) => {
    const tablet = find(state.firebase.tablets, ({key}) => key === props.params.key) || {}
    const tabletButtons = get(tablet, 'props.buttons') || []
    const buttons = tabletButtons.map(tabletButton => find(state.firebase.buttons, ({key}) => key === tabletButton) || {}) || []
    return {
      label: tablet.label,
      tabletButtons,
      buttons
    }
  }
)(TabletView)
