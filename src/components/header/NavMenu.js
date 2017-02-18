import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import {browserHistory} from 'react-router'

class NavMenu extends React.Component {
  render () {
    return (
      <IconMenu
        iconButtonElement={<IconButton><NavigationMenu color='white' /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Admin"
          onClick={() => browserHistory.push('/admin')}
        />
        {this.props.tablets.map(tablet => (
          <MenuItem
            key={tablet.key}
            primaryText={tablet.label}
            onClick={() => browserHistory.push('/view/' + tablet.key)}
          />
        ))}
      </IconMenu>
    )
  }
}

NavMenu.propTypes = {
  tablets: PropTypes.array
}

NavMenu.defaultProps = {
  tablets: []
}

export default connect(
  state => ({tablets: state.firebase.tablets})
)(NavMenu)
