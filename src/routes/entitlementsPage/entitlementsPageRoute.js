import React from 'react'
import Header from '../../containers/header/headerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import EntitlementsList from '../../containers/entitlements/entitlementsContainer'
// import SmartDisplayStars from '../../containers/displayStars/displayStarsContainer'

class EntitlementsPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <EntitlementsList {...this.props} />
          </div>
        </div>
      </div>
    )
  }
  // props: {}
}
export default EntitlementsPageRoute
