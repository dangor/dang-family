import React from 'react'

export default class Sorry extends React.Component {
  _error = () => {
    if (this.props.error) {
      return (
        <div>
          <p>Error:</p>
          <pre style={{border: 'solid 1px grey'}}>
            {JSON.stringify(error)}
          </pre>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        <h1>Sorry, something went wrong</h1>
        {this._error()}
      </div>
    )
  }
}

Sorry.propTypes = {
  error: PropTypes.string
}
