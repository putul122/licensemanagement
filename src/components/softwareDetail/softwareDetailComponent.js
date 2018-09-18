import React from 'react'
import PropTypes from 'prop-types'
import styles from './softwareDetailComponent.scss'

export default function Softwareview (props) {
  let softwareName = ''
  let softwareInstances = ''
  let softwareCost = ''
  if (props.softwarebyId && props.softwarebyId !== '') {
    softwareName = props.softwarebyId.resources[0].name
    softwareInstances = props.softwarebyId.resources[0].instances
    softwareCost = props.softwarebyId.resources[0].cost
  }
    return (
      <div>
        <h2>{softwareName}</h2>
        <div className='row'>
          <div className='col-xl-4'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h1>Instances</h1>
                    </span>
                    <span className='m-widget12__text2'>
                      <h1>{softwareInstances}</h1>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-offset-1 col-xl-5'>
            <div className='m-portlet m-portlet--full-height'>
              <div className='m-portlet__body'>
                <div className='m-widget12'>
                  <div className='m-widget12__item'>
                    <span className='m-widget12__text1'>
                      <h1>Total Cost</h1>
                      <br />
                      <h2 className='pull-right'> R {softwareCost}</h2>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* The table structure ends */}
        <div className='row col-sm-12'>
          <div className='col-md-5 m-portlet'>
            <div className={styles.tabsprops}>
              <ul className='nav nav-tabs nav-fill' role='tablist'>
                <li className='nav-item'>
                  <a className='nav-link active show' data-toggle='tab' href='#m_tabs_3_1'>Properties</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' href='#m_tabs_3_2'>RelationShips</a>
                </li>
              </ul>
              <div className={styles.tabcontentborder}>
                <div className='tab-content'>
                  <div className='tab-pane active' id='m_tabs_3_1' role='tabpanel'>
                    <ul>
                      <li>
                        <div><span className={styles.labelbold}>Stage</span><span style={{'marginLeft': '120px'}}>Data</span></div>
                        {/* <div><p><a href=''>http://ivr.com</a></p></div> */}
                      </li><br />
                      <li>
                        <div><span className={styles.labelbold}>Application Owner</span><span style={{'marginLeft': '50px'}}>Data</span></div>
                        {/* <div><p>Business</p></div> */}
                      </li><br />
                      <li>
                        <div><span className={styles.labelbold}>Application Contact</span><span style={{'marginLeft': '50px'}}>null</span></div>
                        {/* <div><p>0.83</p></div> */}
                      </li><br />
                    </ul>
                  </div>
                  <div className='tab-pane' id='m_tabs_3_2' role='tabpanel'>
                    <div className='m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist'>
                      <div className='m-accordion__item'>
                        <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href='#m_accordion_2_item_1_body' aria-expanded='false'>
                          <span className='m-accordion__item-title'>IVR</span>
                          <span className='m-accordion__item-mode' />
                        </div>
                        <div className='m-accordion__item-body collapse' id='m_accordion_2_item_1_body' role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2' style={{}}>
                          <div className='m-accordion__item-content'>
                            <a href=''>Windows Platform</a><br />
                            <a href=''>Apache tomcat Web server</a><br />
                            <a href=''>Microsoft Access</a><br />
                          </div>
                        </div>
                      </div>
                      <div className='m-accordion__item'>
                        <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_2_head' data-toggle='collapse' href='#m_accordion_2_item_2_body' aria-expanded='false'>
                          <span className='m-accordion__item-title'>IVR target Application</span>
                          <span className='m-accordion__item-mode' />
                        </div>
                        <div className='m-accordion__item-body collapse' id='m_accordion_2_item_2_body' role='tabpanel' aria-labelledby='m_accordion_2_item_2_head' data-parent='#m_accordion_2' style={{}}>
                          <div className='m-accordion__item-content'>
                            <a href=''>Windows Platform</a><br />
                            <a href=''>Apache tomcat Web server</a><br />
                            <a href=''>Microsoft Access</a><br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <img alt='model' src='https://via.placeholder.com/900x545?text=Model%20Visualization' />
          </div>
        </div>
      </div>
      )
    }
 Softwareview.propTypes = {
  softwarebyId: PropTypes.any
 }
