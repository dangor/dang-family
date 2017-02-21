import React, {PropTypes} from 'react'
import {Divider, List, ListItem, IconButton} from 'material-ui'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

export default function DataList (props) {
  return (
    <List>
      {props.list.map(data => (
        <div key={data.key}>
          <Divider />
          <ListItem
            key={data.key}
            primaryText={props.renderText(data)}
            rightIconButton={
              <IconButton onClick={() => props.onRemove(data.key)}>
                <NavigationClose />
              </IconButton>
            }
            disabled={!props.onClick}
            onClick={() => props.onClick && props.onClick(data.key)}
          />
        </div>
      ))}
      <Divider />
    </List>
  )
}

DataList.propTypes = {
  list: PropTypes.array,
  renderText: PropTypes.func,
  onRemove: PropTypes.func,
  onClick: PropTypes.func
}
