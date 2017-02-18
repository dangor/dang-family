import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import Buttons from './Buttons'

export default class Admin extends React.Component {
  render () {
    return (
      <div>
        <h2>Admin</h2>
        <Tabs>
          <Tab label='Buttons'>
            <Buttons/>
          </Tab>
          <Tab label='Tablets'>
            Tablets
          </Tab>
          <Tab label='Lists'>
            Lists
          </Tab>
        </Tabs>
      </div>
    )
  }
}
