import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {find} from 'lodash'

class TabletView extends React.Component {
  render () {
    return (
      <div>
        <h2>{this.props.label}</h2>
      </div>
    )
  }
}

TabletView.propTypes = {
  label: PropTypes.string,
  data: PropTypes.object
}

TabletView.defaultProps = {
  data: {}
}

export default connect(
  (state, props) => {
    const tablet = find(state.firebase.tablets, ({key}) => key === props.params.key) || {}
    return {
      label: tablet.label,
      data: tablet.props
    }
  }
)(TabletView)
