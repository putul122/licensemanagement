import React from 'react'
import styles from './headerComponent.scss'
import PropTypes from 'prop-types'
import ApplicationActivity from '../../containers/applicationActivity/applicationActivityContainer'
import * as signalR from '@aspnet/signalr'
import { authContext } from '../../config/adal'
let userToken = localStorage.getItem('userAccessToken')
var connection = new signalR.HubConnectionBuilder()
          .withUrl('https://notification-eco-dev.ecoconductor.com/notification', {
            accessTokenFactory: () => {
              return userToken
            }
          })
          .configureLogging(signalR.LogLevel.Information)
          .build()
connection.start().then(function () {
  console.log('Connection Started---- >', connection)
  connection.invoke('GetNotificationStatus').catch(err => console.error('Call GetNotificationStatus method---', err))
}).catch(err => console.error('connection error --------------', err))

export default function HeaderComponent (props) {
    console.log(props)
    let quickSlideClass = 'm-quick-sidebar--off'
    let isQuickSlideOpen = props.isQuickSlideOpen
    let notificationFlag = props.notificationFlag
    connection.on('ReceiveMessage', (payload) => {
      console.log('1111111111111111111111111111111111111110000000000000000000000000000000000')
      payload = JSON.parse(payload)
      console.log('ReceiveMessage -----------------------', payload)
      if (payload.notify) {
        props.setNotificationFlag(true)
      } else {
        props.setNotificationFlag(false)
      }
    })
    if (isQuickSlideOpen) {
      quickSlideClass = 'm-quick-sidebar--on'
      if (props.notificationFlag) {
        props.updateNotificationViewStatus && props.updateNotificationViewStatus()
      }
    } else {
      quickSlideClass = 'm-quick-sidebar--off'
    }
    let openQuickSlide = function (event) {
      event.preventDefault()
      quickSlideClass = 'm-quick-sidebar--on'
      props.setQuickslideFlag(true)
    }

    let closeQuickSlide = function (event) {
      event.preventDefault()
      quickSlideClass = 'm-quick-sidebar--off'
      props.setQuickslideFlag(false)
    }
    return (
      <div>
        <header id='m_header' className='m-grid__item    m-header ' m-minimize-offset='200' m-minimize-mobile-offset='200' >
          <div className='m-container m-container--fluid m-container--full-height'>
            <div className='m-stack m-stack--ver m-stack--desktop'>
              <div className='m-stack__item m-brand '>
                <div className='m-stack m-stack--ver m-stack--general'>
                  <div className='m-stack__item m-stack__item--middle m-brand__logo'>
                    {/* <a href='index.html' className=''>
                    </a> */}
                  </div>
                </div>
              </div>
              <div className='m-stack__item m-stack__item--fluid m-header-head' id='m_header_nav'>
                <div id='m_header_topbar' className='m-topbar  m-stack m-stack--ver m-stack--general'>
                  <div className='m-stack__item m-topbar__nav-wrapper'>
                    <ul className='m-topbar__nav m-nav m-nav--inline'>
                      <li className='m-nav__item m-topbar__notifications m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width m-dropdown--open' id='search-container' >
                        <a href='javascript:void(0);' className='m-nav__link m-dropdown__toggle' onClick={openQuickSlide} id='m_topbar_notification_icon'>
                          {props.notificationFlag && (<span className='m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger' />)}
                          <span className='m-nav__link-icon m-topbar__usericon'>
                            <span className='m-nav__link-icon-wrapper'><i className='flaticon-music-2' /></span>
                          </span>
                        </a>
                      </li>
                      <li className='m-nav__item m-topbar__user-profile  m-dropdown  m-dropdown--medium m-dropdown--arrow  m-dropdown--align-right  m-dropdown--mobile-full-width m-dropdown--skin-light '>
                        <a href='javascript:void(0);' onClick={(event) => { localStorage.removeItem('userAccessToken'); authContext.logOut() }} className={styles.button}>
                          <div className='' >LOGOUT</div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/*  <!-- begin::Quick Sidebar --> */}
        <div id='m_quick_sidebar' className={'m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light ' + quickSlideClass}>
          <div className='m-quick-sidebar__content'>
            <span id='m_quick_sidebar_close' className='m-quick-sidebar__close'><a href='' onClick={closeQuickSlide} ><i className='la la-close' /></a></span>
            <ul id='m_quick_sidebar_tabs' className='nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand' role='tablist'>
              <li className='nav-item m-tabs__item'>
                <a className='nav-link m-tabs__link active' data-toggle='tab' href='#m_quick_sidebar_tabs_messenger_notification' role='tab'>Activity Feeds</a>
              </li>
              {/* <li className='nav-item m-tabs__item'>
                <a className='nav-link m-tabs__link' 		data-toggle='tab' href='#m_quick_sidebar_tabs_settings' role='tab'>Settings</a>
              </li> */}
            </ul>
            <div className='tab-content'>
              <div className='tab-pane active show' id='m_quick_sidebar_tabs_messenger_notification' role='tabpanel'>
                <div className='m-accordion m-accordion--default m-accordion--solid m-accordion--section  m-accordion--toggle-arrow' id='m_accordion_7' role='tablist'>
                  <ApplicationActivity isMessageSlideOpen={isQuickSlideOpen} notificationReceived={notificationFlag} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end::Quick Sidebar -->		  */}
      </div>
    )
  }

HeaderComponent.propTypes = {
  setQuickslideFlag: PropTypes.func,
  updateNotificationViewStatus: PropTypes.func,
  isQuickSlideOpen: PropTypes.any,
  notificationFlag: PropTypes.any
}
