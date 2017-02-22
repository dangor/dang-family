import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {chain, concat, find, get, includes} from 'lodash'
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

  _sortedButtons = () => {
    const pushedAndRepeats = chain(this.props.buttons)
      .filter(button => get(button, 'props.momentPushed'))
      .filter(button => get(button, 'props.repeat.num') && get(button, 'props.repeat.unit'))
      .sortBy(button => moment(get(button, 'props.momentPushed'))
        .add(get(button, 'props.repeat.num'), get(button, 'props.repeat.unit'))
        .diff(moment())
      )
      .value()
    const repeats = chain(this.props.buttons)
      .filter(button => !get(button, 'props.momentPushed'))
      .filter(button => get(button, 'props.repeat.num') && get(button, 'props.repeat.unit'))
      .value()
    const pushedNoRepeat = chain(this.props.buttons)
      .filter(button => get(button, 'props.momentPushed'))
      .filter(button => !get(button, 'props.repeat.num') || !get(button, 'props.repeat.unit'))
      .sortBy(button => moment(get(button, 'props.momentPushed')).diff(moment()))
      .value()
    const noRepeat = chain(this.props.buttons)
      .filter(button => !get(button, 'props.momentPushed'))
      .filter(button => !get(button, 'props.repeat.num') || !get(button, 'props.repeat.unit'))
      .value()

    return concat(pushedAndRepeats, repeats, pushedNoRepeat, noRepeat)
  }

  _repeatText = (button) => {
    const num = get(button, 'props.repeat.num')
    const unit = get(button, 'props.repeat.unit')
    if (num && unit) {
      return (
        <div className='alignCenter colorGrey small spaceTopSmall'>
          {`(every ${num} ${unit})`}
        </div>
      )
    }
  }

  _primaryOrSecondary = (button) => {
    const momentPushed = get(button, 'props.momentPushed')
    if (!momentPushed) {
      return {}
    }

    const num = get(button, 'props.repeat.num')
    const unit = get(button, 'props.repeat.unit')
    if (num && unit && moment(momentPushed).add(num, unit).isBefore(moment())) {
      return {secondary: true}
    }

    return {primary: true}
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
          {this._sortedButtons().map(button => (
            <div key={button.key} className='tabletButton'>
              <RaisedButton
                {...this._primaryOrSecondary(button)}
                fullWidth
                label={this._buttonLabel(button)}
                onClick={this._buttonPush(button.key)}
              />
              {this._repeatText(button)}
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
