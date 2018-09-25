import React from 'react'
import styles from './landingHeaderComponent.scss'
// import SmartDisplayStars from '../../containers/displayStars/displayStarsContainer'

class LandingHeaderComponent extends React.Component {
  render () {
    return (
      <div>
        <header id='m_header' className=' m-header col-md-12' m-minimize-offset='200' m-minimize-mobile-offset='200' >
          <div className='pull-left col-md-1'>
            <a href='index.html'>
              <img alt='' src='/assets/Telkom.png' width='80px' className={styles.logo} />
            </a>
          </div>
          <div className='pull-left col-md-11' style={{'backgroundColor': '#2196f3'}}>
            <h1 className={styles.slogan}>Licence Management</h1>
          </div>
        </header>
      </div>
    )
  }
}
export default LandingHeaderComponent
