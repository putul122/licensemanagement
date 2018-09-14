import React from 'react'
import Header from '../../components/headerComponent/headerComponent.js'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import ApplicationView from '../../containers/applicationview/applicationviewContainer.js'
// import SmartDisplayStars from '../../containers/displayStars/displayStarsContainer'

class ApplicationPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <ApplicationView />
          </div>
        </div>
      </div>
    )
  }
  // props: {}
}
export default ApplicationPageRoute
