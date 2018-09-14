import React from 'react'
import Header from '../../components/headerComponent/headerComponent.js'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'

class HomePageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12' />
        </div>
      </div>
    )
  }
}
export default HomePageRoute
