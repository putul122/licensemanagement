import React from 'react'
import Header from '../../components/headerComponent/headerComponent.js'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import Dashboard from '../../containers/dashboard/dashboardContainer.js'

class DashboardRoute extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <Dashboard />
          </div>
        </div>
      </div>
    )
  }
}
export default DashboardRoute
