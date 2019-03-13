import React from 'react'
import Header from '../../containers/header/headerContainer'
import Search from '../../containers/search/searchContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'

class SearchPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12' >
            <Search {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
export default SearchPageRoute
