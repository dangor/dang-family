import React from 'react'
import {AppBar, FlatButton, IconButton, IconMenu, MenuItem} from 'material-ui'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import {browserHistory} from 'react-router'

export default class Header extends React.Component {
  _renderNavMenu = () => {
    return (
      <IconMenu
        iconButtonElement={<IconButton><NavigationMenu/></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem
          primaryText="1st Floor Hallway"
          onClick={() => browserHistory.push('/view/firstFloorHallway')}
        />
      </IconMenu>
    )
  }

  render () {
    return (
      <AppBar
        title='Dang House'
        iconElementRight={
          <FlatButton
            label='logout'
            onClick={this._signOut}
          />
        }
        iconElementLeft={this._renderNavMenu()}
      />
    )
  }
}
