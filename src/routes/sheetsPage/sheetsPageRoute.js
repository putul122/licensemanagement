import React from 'react'
import Header from '../../containers/header/headerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import Sheets from '../../containers/sheets/sheetsContainer.js'
// import SmartDisplayStars from '../../containers/displayStars/displayStarsContainer'

class SoftwarePageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <Sheets {...this.props} />
          </div>
        </div>
      </div>
    )
  }
  // props: {}
}
export default SoftwarePageRoute
