import React from 'react'
import Header from '../../components/headerComponent/headerComponent.js'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import Suppliers from '../../containers/suppliers/suppliersContainer.js'

class SuppliersPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <h3>Suppliers</h3>
            <Suppliers />
          </div>
        </div>
      </div>
    )
  }
}
export default SuppliersPageRoute
