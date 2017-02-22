import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import Buttons from './Buttons'
import Statuses from './Statuses'
import Tablets from './Tablets'

export default class Admin extends React.Component {
  render () {
    return (
      <div>
        <h2>Admin</h2>
        <Tabs>
          <Tab label='Buttons'>
            <Buttons />
          </Tab>
          <Tab label='Tablets'>
            <Tablets />
          </Tab>
          <Tab label='Statuses'>
            <Statuses />
          </Tab>
        </Tabs>
      </div>
    )
  }
}
