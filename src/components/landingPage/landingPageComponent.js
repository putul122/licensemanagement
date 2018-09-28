import React from 'react'
// import { Link } from 'react-router-dom'
import LandingHeader from '../../components/landingHeader/landingHeaderComponent.js'
// import styles from './landingPageComponent.scss'

class LandingPage extends React.Component {
	render () {
	return (
  <div>
    <LandingHeader />
    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
      <div className='m-content col-xl-12'>
        <div>
          <div className='row'>
            <img alt='' src='/assets/LMlandingpage.jpg' style={{'width': '100%'}} />
            {/* <h1 className={styles.logotext}>LM</h1> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
	}
}
export default LandingPage
