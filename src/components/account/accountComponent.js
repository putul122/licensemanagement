import React from 'react'
import Login from '../../containers/login/loginContainer'
// import SignUp from '../../containers/signUp/signUpContainer'
// import styles from './landingComponent.scss'

class Account extends React.Component {
  render (props) {
  localStorage.removeItem('isLoggedin')
  localStorage.removeItem('userAccessToken')
      return (
        <div>
          {/* <Header {...this.props} /> */}
          <div className='m-grid m-grid--hor m-grid--root m-page'>
            {/* <LeftNavigation /> */}
            <div className='m-login m-login--signin  m-login--5' id='m_login' style={{'background-image': 'url(./assets/bg-3.jpg)', 'height': '858px'}} >
              {/* <SignUp {...this.props} /> */}
              <Login {...this.props} />
            </div>
          </div>
          {/* <FooterComponent /> */}
        </div>
      )
  }
  // props: {}
}
export default Account
