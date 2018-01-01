import React from 'react'
import moment from 'moment'

/**
 * Reload the entire page to work around mem leak problems
 */
export default class AutoReloader extends React.Component {
  _checkTimeThenReload = () => {
    const now = moment()
    if (now.hour() === 3 && now.minute() === 0) { // 3:00 am
      window.location.reload()
    }
  }

  componentDidMount () {
    this.timer = setInterval(this._checkTimeThenReload, 60 * 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return null
  }
}
