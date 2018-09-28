import React from 'react'
import LandingPage from '../../containers/landingPage/landingPageContainer.js'
class LandingPageRoute extends React.Component {
  render () {
    return (
      <LandingPage {...this.props} />
    )
  }
}
export default LandingPageRoute
