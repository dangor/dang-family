import React from 'react'

export default class Authenticated extends React.Component {
  componentWillMount () {
    // check auth
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
