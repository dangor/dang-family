import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import _ from 'lodash'

class ButtonMenu extends React.Component {
  _orderedMenuItems = () => {
    const buttons = this.props.buttons.map(button => {
      const key = button.key
      const checked = _.includes(this.props.tabletButtons, button.key)
      return {
        key,
        checked,
        item: <MenuItem
          key={key}
          primaryText={button.label}
          onClick={this.props.buttonToggle(key)}
          insetChildren
          checked={checked}
        />
      }
    })
    const statuses = this.props.statuses.map(status => {
      const key = status.key
      const checked = _.includes(this.props.tabletStatuses, status.key)
      return {
        key,
        checked,
        item: <MenuItem
          key={key}
          primaryText={status.label}
          onClick={this.props.statusToggle(key)}
          insetChildren
          checked={checked}
        />
      }
    })
    return _
      .chain(buttons)
      .concat(statuses)
      .sortBy(['checked', 'key'])
      .reverse()
      .map('item')
      .value()
  }

  render () {
    return (
      <IconMenu
        iconButtonElement={<IconButton><ActionSettings /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {this._orderedMenuItems()}
      </IconMenu>
    )
  }
}

ButtonMenu.propTypes = {
  buttons: PropTypes.array,
  buttonToggle: PropTypes.func,
  tabletButtons: PropTypes.array,
  status: PropTypes.array,
  statusToggle: PropTypes.func,
  tabletStatuses: PropTypes.array
}

export default connect(
  state => ({
    buttons: state.firebase.buttons || [],
    statuses: state.firebase.statuses || []
  })
)(ButtonMenu)
