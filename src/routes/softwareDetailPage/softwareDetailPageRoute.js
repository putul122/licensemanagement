import React from 'react'
import Header from '../../components/headerComponent/headerComponent.js'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import SoftwareView from '../../containers/softwareDetail/softwareDetailContainer.js'
// import SmartDisplayStars from '../../containers/displayStars/displayStarsContainer'

class SoftwarePageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <SoftwareView {...this.props} />
          </div>
        </div>
      </div>
    )
  }
  // props: {}
}
export default SoftwarePageRoute
