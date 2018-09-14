import React, { Component } from 'react'

class AppWrapper extends Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
  // eslint-next-line
  props: { // eslint-disable-line
    children: any
  }
}

export default AppWrapper
