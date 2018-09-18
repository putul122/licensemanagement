import React from 'react'
import Header from '../../components/headerComponent/headerComponent.js'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import SupplierDetail from '../../containers/supplierDetail/supplierDetailContainer.js'

class SupplierDetailPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <SupplierDetail {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
export default SupplierDetailPageRoute
