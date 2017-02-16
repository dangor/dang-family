import React from 'react'

export default class ViewRouter extends React.Component {
  render () {
    return (
      <div>
        Key: {this.props.params.key}
      </div>
    )
  }
}
