import React from 'react'
import styles from './handleAzureComponent.scss'

class HandleAzure extends React.Component {
	render () {
        return (
          <div>
            <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
              <div className='m-content col-xl-12' >
                <div className='row'>
                  <div className='col-sm-12 text-center pull-right'>
                    <div className={styles.loader} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
      }
}
export default HandleAzure
