import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import {includes} from 'lodash'

class ButtonMenu extends React.Component {
  render () {
    return (
      <IconMenu
        iconButtonElement={<IconButton><ActionSettings /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {this.props.buttons.map(button => (
          <MenuItem
            key={button.key}
            primaryText={button.label}
            onClick={this.props.buttonToggle(button.key)}
            insetChildren
            checked={includes(this.props.tabletButtons, button.key)}
          />
        ))}
        {this.props.statuses.map(status => (
          <MenuItem
            key={status.key}
            primaryText={status.label}
            onClick={this.props.statusToggle(status.key)}
            insetChildren
            checked={includes(this.props.tabletStatuses, status.key)}
          />
        ))}
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
