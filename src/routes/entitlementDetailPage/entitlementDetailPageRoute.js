import React from 'react'
import Header from '../../components/headerComponent/headerComponent.js'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import EntitlementDetail from '../../containers/entitlementDetail/entitlementDetailContainer.js'

class EntitlementPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <EntitlementDetail {...this.props} />
          </div>
        </div>
      </div>
    )
  }
  // props: {}
}
export default EntitlementPageRoute
