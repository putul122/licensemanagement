import React from 'react'
// import SmartDisplayStars from '../../containers/displayStars/displayStarsContainer'

class HeaderComponent extends React.Component {
  render () {
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
                      {/* <li className='m-nav__item m-topbar__notifications m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width m-dropdown--open' id='search-container' >
                        <a href='' className='m-nav__link m-dropdown__toggle' id='m_topbar_notification_icon'>
                            <span className='m-nav__link-icon m-topbar__usericon'>
                            <span className='m-nav__link-icon-wrapper'><i className='flaticon-music-2' /></span>
                            </span>
                        </a>
                        </li>
                        <li className='m-nav__item m-topbar__user-profile  m-dropdown  m-dropdown--medium m-dropdown--arrow  m-dropdown--align-right  m-dropdown--mobile-full-width m-dropdown--skin-light '>
                        <a href='' className='m-nav__link'>
                            <span className='m-topbar__userpic m--hide'>
                            <img src='assets/app/media/img/users/user4.jpg' className='m--img-rounded m--marginless m--img-centered' alt='' />
                            </span>
                            <span className='m-nav__link-icon m-topbar__usericon'>
                            <span className='m-nav__link-icon-wrapper'><i className='flaticon-user-ok' /></span>
                            </span>
                            <span className='m-topbar__username m--hide'>Nick</span>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
}
export default HeaderComponent
