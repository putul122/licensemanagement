import React from 'react'
// import { Link } from 'react-router-dom'
import styles from './leftNavigation.scss'

class LeftNavigation extends React.Component {
	render () {
	return (
  <div>
    <button className='m-aside-left-close  m-aside-left-close--skin-light' id='m_aside_left_close_btn'><i className='la la-close' /></button>
    <div id='m_aside_left' className='m-grid__item	m-aside-left  m-aside-left--skin-light '>
      <div id='m_ver_menu' className='m-aside-menu  m-aside-menu--skin-light m-aside-menu--submenu-skin-light '>
        {/* <div className={styles.mainmenu}>
          <ul className='m-menu__nav  m-menu__nav--dropdown-submenu-arrow '>
            <div><li className='m-menu__item--submenu m-menu__item--submenu-fullheight'><a href='/dashboard' className='m-menu__link'><i className='m-menu__link-icon fa fa-home' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/dashboard'>Home</a></div></div>
            <div><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}}><a href='/suppliers' className='m-menu__link'><i className='m-menu__link-icon fa fa-address-book-o' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/suppliers'>Suppliers</a></div></div>
            <div style={{'padding': '15px'}}><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}} ><a href='/agreements' className='m-menu__link'><i className='m-menu__link-icon fa fa-file-archive-o' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/agreements'>Agreements</a></div></div>
            <div style={{'padding': '15px'}}><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}} ><a href='/entitlements' className='m-menu__link'><i className='m-menu__link-icon fa fa-object-group' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/entitlements'>Entitlements</a></div></div>
            <div style={{'padding': '15px'}}><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}} ><a href='/softwares' className='m-menu__link'><i className='m-menu__link-icon fa fa-snowflake-o' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/softwares'>Softwares</a></div></div>
            <div style={{'padding': '15px'}}><li className='m-menu__item--submenu m-menu__item--submenu-fullheight' style={{'textAlign': 'center'}} ><a href='/applications' className='m-menu__link'><i className='m-menu__link-icon  fa fa-tasks' style={{'fontSize': '35px'}} /></a></li><div className={styles.sidebarlink}><a href='/applications'>Applications</a></div></div>
          </ul>
        </div> */}
        <nav className={styles.mainmenu}>
          <div className='m-brand  m-brand--skin-light '>
            {/* <a href='/'>
              <img alt='' src='/assets/Telkom.png' width='100px' style={{marginTop: '13'}} />
            </a> */}
            <h1 className={styles.logotext}>LM</h1>
          </div>
          <ul>
            <li className={styles.navicon}>
              <a href='/dashboard'>
                <i className='fa fa-home fa-2x' />
                <span className={styles.navtext}>Home</span>
              </a>
            </li>
            <li className={styles.navicon}>
              <a href='/suppliers'>
                <i className='fa fa-address-book-o fa-2x' />
                <span className={styles.navtext}>Suppliers</span>
              </a>
            </li>
            <li className={styles.navicon}>
              <a href='/agreements'>
                <i className='fa fa-file-archive-o fa-2x' />
                <span className={styles.navtext}>Agreements</span>
              </a>
            </li>
            <li className={styles.navicon}>
              <a href='/entitlements'>
                <i className='fa fa-object-group fa-2x' />
                <span className={styles.navtext}>Entitlements</span>
              </a>
            </li>
            <li className={styles.navicon}>
              <a href='/softwares'>
                <i className='fa fa-snowflake-o fa-2x' />
                <span className={styles.navtext}>Softwares</span>
              </a>
            </li>
            <li className={styles.navicon}>
              <a href='/applications'>
                <i className='fa fa-tasks fa-2x' />
                <span className={styles.navtext}>Applications</span>
              </a>
            </li>
            <li className={styles.navicon}>
              <a href='/projects'>
                <i className='fa fa-file-powerpoint fa-2x' />
                <span className={styles.navtext}>Projects</span>
              </a>
            </li>
            <li className={styles.navicon}>
              <a href='/sheets'>
                <i className='fa fa-2x flaticon-interface-11' />
                <span className={styles.navtext}>Sheets</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
 )
	}
}
export default LeftNavigation
