import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

class ButtonMenu extends React.Component {
  render () {
    return (
      <IconMenu
        iconButtonElement={<IconButton><ContentAdd /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {this.props.buttons.map(button => (
          <MenuItem
            key={button.key}
            primaryText={button.label}
            onClick={this.props.addButton(button.key)}
          />
        ))}
      </IconMenu>
    )
  }
}

ButtonMenu.propTypes = {
  buttons: PropTypes.array,
  addButton: PropTypes.func
}

export default connect(
  state => ({buttons: state.firebase.buttons || []})
)(ButtonMenu)
