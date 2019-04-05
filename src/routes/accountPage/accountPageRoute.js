import React from 'react'
import Header from '../../containers/header/headerContainer'
import Account from '../../containers/account/accountContainer.js'

class HomePageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <div className='m-content col-xl-12' >
            <Account {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
export default HomePageRoute
