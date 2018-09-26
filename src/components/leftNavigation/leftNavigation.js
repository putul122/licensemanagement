import React from 'react'
// import { Link } from 'react-router-dom'
import styles from './leftNavigation.scss'

class LeftNavigation extends React.Component {
	render () {
	return (
  <div>
    <button className='m-aside-left-close  m-aside-left-close--skin-light' id='m_aside_left_close_btn'><i className='la la-close' /></button>
    <div id='m_aside_left' className='m-grid__item	m-aside-left  m-aside-left--skin-light '>
      <div className='m-brand  m-brand--skin-light '>
        {/* <a href='/'>
          <img alt='' src='/assets/Telkom.png' width='100px' style={{marginTop: '13'}} />
        </a> */}
        <h1 className={styles.logotext}>LM</h1>
      </div>
      <div id='m_ver_menu' className='m-aside-menu  m-aside-menu--skin-light m-aside-menu--submenu-skin-light '>
        <ul className='m-menu__nav  m-menu__nav--dropdown-submenu-arrow '>
          <div><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}} ><a href='/dashboard' className='m-menu__link'><i className='m-menu__link-icon fa fa-home' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/dashboard'>Home</a></div></div>
          <div style={{'padding': '15px'}}><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}}><a href='/suppliers' className='m-menu__link'><i className='m-menu__link-icon fa fa-address-book-o' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/suppliers'>Suppliers</a></div></div>
          <div style={{'padding': '15px'}}><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}} ><a href='/agreements' className='m-menu__link'><i className='m-menu__link-icon fa fa-file-archive-o' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/agreements'>Agreements</a></div></div>
          <div style={{'padding': '15px'}}><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}} ><a href='/entitlements' className='m-menu__link'><i className='m-menu__link-icon fa fa-object-group' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/entitlements'>Entitlements</a></div></div>
          <div style={{'padding': '15px'}}><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}} ><a href='/softwares' className='m-menu__link'><i className='m-menu__link-icon fa fa-snowflake-o' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/softwares'>Softwares</a></div></div>
          <div style={{'padding': '15px'}}><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}} ><a href='/applications' className='m-menu__link'><i className='m-menu__link-icon  fa fa-tasks' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/applications'>Applications</a></div></div>
        </ul>
      </div>
    </div>
  </div>
		)
	}
}
export default LeftNavigation
