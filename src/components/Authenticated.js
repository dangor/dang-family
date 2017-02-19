import React from 'react'
import Header from './header'
import './styles/Authenticated.css'

export default class Authenticated extends React.Component {
  render () {
    return (
      <div className='root'>
        <Header />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
