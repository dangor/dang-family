import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {chain, concat, find, get, includes, isEqual, map} from 'lodash'
import {RaisedButton} from 'material-ui'
import {
  Step,
  Stepper,
  StepButton,
  StepLabel
} from 'material-ui/Stepper'
import * as firebase from 'firebase'
import './styles/TabletView.css'
import ButtonMenu from './ButtonMenu'
import moment from 'moment'
import RadioChecked from 'material-ui/svg-icons/toggle/radio-button-checked'
import RadioUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked'
import {redA700, cyan500} from 'material-ui/styles/colors'

class TabletView extends React.Component {
  state = {
    ticker: 0,
    buttonPushed: undefined,
    sliderChanged: undefined
  }

  componentDidMount () {
    this.timer = setInterval(() => this.setState({ticker: this.ticker + 1}), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props.buttons, nextProps.buttons) || !isEqual(this.props.statuses, nextProps.statuses)) {
      this.setState({buttonPushed: undefined, sliderChanged: undefined})
    }
  }

  _buttonToggle = (key) => () => {
    const {tabletButtons} = this.props
    const update = includes(tabletButtons, key)
      ? tabletButtons.filter(tabletButton => tabletButton !== key)
      : concat(this.props.tabletButtons || [], key)
    firebase.database().ref('tablets/' + this.props.params.key + '/props/buttons').set(update)
  }

  _statusToggle = (key) => () => {
    const {tabletStatuses} = this.props
    const update = includes(tabletStatuses, key)
      ? tabletStatuses.filter(tabletStatus => tabletStatus !== key)
      : concat(this.props.tabletStatuses || [], key)
    firebase.database().ref('tablets/' + this.props.params.key + '/props/statuses').set(update)
  }

  _buttonPush = (key) => () => {
    this.setState({buttonPushed: key})
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

  _statusChange = (status, index) => {
    this.setState({statusChanged: status.key})
    firebase.database().ref('statuses/' + status.key + '/props/index').set(index)
  }

  render () {
    return (
      <div>
        <div className='heading'>
          <h2>{this.props.label}</h2>
          <ButtonMenu
            statusToggle={this._statusToggle}
            tabletStatuses={this.props.tabletStatuses}
            buttonToggle={this._buttonToggle}
            tabletButtons={this.props.tabletButtons}
          />
        </div>
        <div>
          {this.props.statuses.map((status, i) => {
            const index = get(status, 'props.index') || 0
            return (
              <div key={i} className='tabletButton'>
                <div className='alignCenter small spaceTopSmall' style={{color: cyan500}}>
                  {status.label}
                </div>
                <Stepper
                  linear={false}
                >
                  {map(get(status, 'props.states'), (state, i) => (
                    <Step
                      key={i}
                      disabled={this.state.statusChanged === status.key}
                    >
                      <StepButton
                        icon={index === i ? <RadioChecked color={redA700} /> : <RadioUnchecked color='grey' />}
                        onClick={() => this._statusChange(status, i)}
                      >
                        <StepLabel style={{fontSize: 24, textTransform: 'uppercase'}}>
                          {state}
                        </StepLabel>
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </div>
            )
          })}
          {this._sortedButtons().map(button => (
            <div key={button.key} className='tabletButton'>
              <RaisedButton
                {...this._primaryOrSecondary(button)}
                fullWidth
                label={this._buttonLabel(button)}
                onClick={this._buttonPush(button.key)}
                disabled={this.state.buttonPushed === button.key}
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
  tabletStatuses: PropTypes.array,
  buttons: PropTypes.array,
  statuses: PropTypes.array
}

export default connect(
  (state, props) => {
    const tablet = find(state.firebase.tablets, ({key}) => key === props.params.key) || {}
    const tabletButtons = get(tablet, 'props.buttons') || []
    const buttons = tabletButtons.map(tabletButton => find(state.firebase.buttons, ({key}) => key === tabletButton) || {}) || []
    const tabletStatuses = get(tablet, 'props.statuses') || []
    const statuses = tabletStatuses.map(tabletStatus => find(state.firebase.statuses, ({key}) => key === tabletStatus) || {}) || []
    return {
      label: tablet.label,
      tabletButtons,
      buttons,
      tabletStatuses,
      statuses
    }
  }
)(TabletView)
