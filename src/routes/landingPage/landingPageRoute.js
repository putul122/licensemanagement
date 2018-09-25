import React from 'react'
import Landing from '../../components/landingPage/landingPageComponent.js'
import LandingHeader from '../../components/landingHeader/landingHeaderComponent.js'
class LandingPageRoute extends React.Component {
  render () {
    return (
      <div>
        <LandingHeader />
        <div className='m-content col-xl-12'>
          <Landing />
        </div>
      </div>
    )
  }
}
export default LandingPageRoute
