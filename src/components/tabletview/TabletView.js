import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {concat, find, get, includes} from 'lodash'
import {RaisedButton} from 'material-ui'
import * as firebase from 'firebase'
import './styles/TabletView.css'
import ButtonMenu from './ButtonMenu'
import moment from 'moment'

class TabletView extends React.Component {
  state = {
    ticker: 0
  }

  componentDidMount () {
    this.timer = setInterval(() => this.setState({ticker: this.ticker + 1}), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  _buttonToggle = (key) => () => {
    const {tabletButtons} = this.props
    const update = includes(tabletButtons, key)
      ? tabletButtons.filter(tabletButton => tabletButton !== key)
      : concat(this.props.tabletButtons || [], key)
    firebase.database().ref('tablets/' + this.props.params.key + '/props/buttons').set(update)
  }

  _buttonPush = (key) => () => {
    firebase.database().ref('buttons/' + key + '/props/momentPushed').set(moment().valueOf())
  }

  _buttonLabel = (button) => {
    const momentPushed = get(button, 'props.momentPushed')
    return button.label + ' - ' + (momentPushed ? moment(momentPushed).fromNow() : 'Never pushed')
  }

  render () {
    return (
      <div>
        <div className='heading'>
          <h2>{this.props.label}</h2>
          <ButtonMenu
            buttonToggle={this._buttonToggle}
            tabletButtons={this.props.tabletButtons}
          />
        </div>
        <div>
          {this.props.buttons.map(button => (
            <div
              key={button.key}
              className='buttonArea'
            >
              <RaisedButton
                primary
                label={this._buttonLabel(button)}
                fullWidth
                onClick={this._buttonPush(button.key)}
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
