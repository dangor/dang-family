import React, {PropTypes} from 'react'
import * as firebase from 'firebase'
import {Divider, List, ListItem, IconButton} from 'material-ui'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

const removeData = (refPath, key) => () => {
  firebase.database().ref(refPath + '/' + key).remove()
}

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
              <IconButton onClick={removeData(props.refPath, data.key)}>
                <NavigationClose />
              </IconButton>
            }
            disabled
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
  refPath: PropTypes.string
}
