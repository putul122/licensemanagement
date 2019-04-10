import React from 'react'
// import styles from './headerComponent.scss'
import PropTypes from 'prop-types'
import ApplicationActivity from '../../containers/applicationActivity/applicationActivityContainer'
import * as signalR from '@aspnet/signalr'
import api from '../../constants'
// import { authContext } from '../../config/adal'
const notificationAlert = {
  background: '#ff006c',
  border: '1px solid #ff006c'
}
let userToken = localStorage.getItem('userAccessToken')
var connection = new signalR.HubConnectionBuilder()
          .withUrl(api.notificationURL, {
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
    console.log(props.setQuickslideFlag)
    let quickSlideClass = 'm-quick-sidebar--off'
    let isQuickSlideOpen = props.isQuickSlideOpen
    let isLoginSlideOpen = props.isLoginSlideOpen
    let isSearchSlideOpen = props.isSearchSlideOpen
    let loginSlideClass = 'm-dropdown--close'
    let searchSlideClass = 'm-dropdown--close'
    let notificationFlag = props.notificationFlag
    let notificationStyle = {}
    let searchTextBox
    console.log('searchTextBox', searchTextBox)
    if (props.notificationFlag) {
      notificationStyle = notificationAlert
    } else {
      notificationStyle = {}
    }
    connection.on('ReceiveMessage', (payload) => {
      console.log('ReceiveMessage ---------', payload)
      payload = JSON.parse(payload)
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
    if (isLoginSlideOpen) {
      loginSlideClass = 'm-dropdown--open'
    } else {
      loginSlideClass = ''
    }
    if (isSearchSlideOpen) {
      searchSlideClass = 'm-dropdown--open'
    } else {
      searchSlideClass = ''
    }
    let openLoginSlide = function (event) {
      event.preventDefault()
      loginSlideClass = 'm-dropdown--open'
      props.setLoginslideFlag(!props.isLoginSlideOpen)
    }
    let closeLoginSlide = function (event) {
      event.preventDefault()
      loginSlideClass = 'm-dropdown--close'
      props.setLoginslideFlag(false)
    }
    let openSearchSlide = function (event) {
      event.preventDefault()
      searchSlideClass = 'm-dropdown--open'
      props.setSearchSlideFlag(!props.isSearchSlideOpen)
    }
    // let closeSearchSlide = function (event) {
    //   event.preventDefault()
    //   searchSlideClass = 'm-dropdown--close'
    //   props.setSearchSlideFlag(false)
    // }
    let logOut = function (event) {
      event.preventDefault()
      localStorage.removeItem('isLoggedin')
      localStorage.removeItem('showToasterSuccess')
      localStorage.removeItem('userAccessToken')
      props.setLoginslideFlag(false)
      // props.history.push('/')
      window.location.href = window.location.origin
    }
    let handleGlobalSearch = function () {
      let searchValue = ''
      if (searchTextBox) {
        searchValue = searchTextBox.value
      }
      window.location.href = window.location.origin + '/searchAll?search=' + searchValue
    }
    let keyPressed = function (event) {
      if (event.key === 'Enter') {
        handleGlobalSearch()
      }
    }
    return (
      <div>
        <header id='m_header' className='m-grid__item    m-header ' >
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
                      <li className={'m-nav__item m-topbar__user-profile  m-dropdown  m-dropdown--medium m-dropdown--arrow  m-dropdown--align-right  m-dropdown--mobile-full-width m-dropdown--skin-light ' + searchSlideClass}>
                        <a href='' className='m-nav__link' onClick={openSearchSlide}>
                          <span className='m-nav__link-icon m-topbar__usericon' data-skin='light' data-toggle='m-tooltip' data-placement='bottom' data-original-title='Logout' style={{'fontSize': '10px', 'cursor': 'pointer'}}>
                            <span className='m-nav__link-icon-wrapper'><i className='flaticon-search' /></span>
                          </span>
                        </a>
                        <div className='m-dropdown__wrapper'>
                          <span className='m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust' />
                          <div className='m-dropdown__inner'>
                            <div className='m--align-right'>
                              <div className='m-card-user--skin-light' />
                            </div>
                            <div className='m-dropdown__body'>
                              <div className='m-dropdown__content'>
                                <ul className='m-nav m-nav--skin-light'>
                                  <li className='m-nav__item'>
                                    <div style={{'display': 'flex'}}>
                                      <div className='m-input-icon m-input-icon--left'>
                                        <input type='text' onKeyPress={keyPressed} className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} />
                                        <span className='m-input-icon__icon m-input-icon__icon--left'>
                                          <span>
                                            <i className='la la-search' />
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className='m-nav__item m-topbar__notifications m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width m-dropdown--open' id='search-container' >
                        {/* <p data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title={logout} style={{'fontSize': '0.7vw', 'cursor': 'pointer'}}>{'No Supplier'}</p> */}
                        <a href='javascript:void(0);' className='m-nav__link m-dropdown__toggle' onClick={openQuickSlide} id='m_topbar_notification_icon'>
                          <span className='m-nav__link-icon m-topbar__usericon' data-skin='light' data-toggle='m-tooltip' data-placement='bottom' data-original-title='Activity Feeds' style={{'fontSize': '10px', 'cursor': 'pointer'}}>
                            <span className='m-nav__link-icon-wrapper' style={notificationStyle}><i className='flaticon-music-2' /></span>
                          </span>
                        </a>
                      </li>
                      {/* <li className='m-nav__item m-topbar__user-profile  m-dropdown  m-dropdown--medium m-dropdown--arrow  m-dropdown--align-right  m-dropdown--mobile-full-width m-dropdown--skin-light '>
                        <a href='javascript:void(0);' onClick={(event) => { localStorage.removeItem('userAccessToken'); authContext.logOut() }} className={styles.button}>
                          <div className='' >LOGOUT</div>
                        </a>
                      </li> */}
                      <li className={'m-nav__item m-topbar__user-profile  m-dropdown  m-dropdown--medium m-dropdown--arrow  m-dropdown--align-right  m-dropdown--mobile-full-width m-dropdown--skin-light ' + loginSlideClass}>
                        <a href='' className='m-nav__link' onClick={openLoginSlide}>
                          <span className='m-topbar__userpic m--hide'>
                            <img src='assets/app/media/img/users/user4.jpg' className='m--img-rounded m--marginless m--img-centered' alt='' />
                          </span>
                          <span className='m-nav__link-icon m-topbar__usericon' data-skin='light' data-toggle='m-tooltip' data-placement='bottom' data-original-title='Logout' style={{'fontSize': '10px', 'cursor': 'pointer'}}>
                            <span className='m-nav__link-icon-wrapper'><i className='flaticon-user-ok' /></span>
                          </span>
                        </a>
                        <div className='m-dropdown__wrapper'>
                          <span className='m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust' />
                          <div className='m-dropdown__inner'>
                            <div className='m--align-right'>
                              <div className='m-card-user--skin-light'>
                                {/* <div className='m-card-user__pic'>
                                  <img src='assets/app/media/img/users/user4.jpg' className='m--img-rounded m--marginless' alt='' />
                                </div> */}
                                <div className=' '>
                                  {/* <span className='m-card-user__name m--font-weight-500'>Mark Andre</span> */}
                                  <a href='' onClick={closeLoginSlide} ><i className='la la-close' /></a>
                                </div>
                              </div>
                            </div>
                            <div className='m-dropdown__body'>
                              <div className='m-dropdown__content'>
                                <ul className='m-nav m-nav--skin-light'>
                                  <li className='m-nav__item'>
                                    {/* <a href='javascript:void(0);' onClick={(event) => { localStorage.removeItem('userAccessToken'); authContext.logOut() }} className='btn m-btn--pill    btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder'>Logout</a> */}
                                    <a href='javascript:void(0);' onClick={logOut} className='btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder'>Logout</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
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
  notificationFlag: PropTypes.any,
  isLoginSlideOpen: PropTypes.any,
  isSearchSlideOpen: PropTypes.any
}
