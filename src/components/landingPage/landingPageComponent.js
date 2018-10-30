import React from 'react'
// import { Link } from 'react-router-dom'
import LandingHeader from '../../components/landingHeader/landingHeaderComponent.js'
// import styles from './landingPageComponent.scss'

class LandingPage extends React.Component {
	render () {
	return (
  <div>
    <LandingHeader />
    <div className=''>
      <div className='m-content col-xl-12'>
        <div>
          <img alt='' src='/assets/LMlandingpage.jpg' style={{'width': '100%'}} />
        </div>
      </div>
    </div>
  </div>
  )
	}
}
export default LandingPage
