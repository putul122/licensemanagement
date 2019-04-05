// import React from 'react'
// // import { Link } from 'react-router-dom'
// import LandingHeader from '../../components/landingHeader/landingHeaderComponent.js'
// // import styles from './landingPageComponent.scss'

// class LandingPage extends React.Component {
// 	render () {
// 	return (
//   <div>
//     <LandingHeader />
//     <div className=''>
//       <div className='m-content col-xl-12'>
//         <div>
//           <img alt='' src='/assets/LMlandingpage.jpg' style={{'width': '100%'}} />
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// 	}
// }
// export default LandingPage
import React from 'react'
import Login from '../../containers/login/loginContainer'
import SignUp from '../../containers/signUp/signUpContainer'
import PropTypes from 'prop-types'

export default function Landing (props) {
    console.log(props)
    console.log(props.flipInX)
    localStorage.removeItem('isLoggedin')
    localStorage.removeItem('showToasterSuccess')
    localStorage.removeItem('userAccessToken')
    let handelClick = function (event) {
      if (props.flipInX === 'm-login--signin') {
        props.toggleFlipInX('m-login--signup')
      } else {
        // props.toggleFlipInX('m-login--signin')
      }
    }
    return (
      <div>
        {/* <Header {...this.props} /> */}
        <div className='m-grid m-grid--hor m-grid--root m-page'>
          {/* <LeftNavigation /> */}
          <div className={'m-login m-login--5 ' + props.flipInX} id='m_login' style={{'backgroundImage': 'url(./assets/app/media/img//bg/bg-3.jpg)'}}>
            <div className='m-login__wrapper-1 m-portlet-full-height'>
              <div className='m-login__wrapper-1-1'>
                <div className='m-login__contanier'>
                  <div className='m-login__content'>
                    <div className='m-login__logo'>
                      <a href=''>
                        <img src='/assets/Telkom.png' width='150px' height='100px' alt='ECO Conductor' />
                      </a>
                    </div>
                    <div className='m-login__title'>
                      <h3>JOIN OUR LM COMMUNITY GET FREE ACCOUNT</h3>
                    </div>
                    {/* <div className='m-login__desc'>
                      Amazing Stuff is Lorem Here.Grownng Team
                    </div> */}
                    <div className='m-login__form-action'>
                      <button onClick={handelClick} type='button' id='m_login_signup' className='btn btn-outline-info m-btn--pill'>Get An Account</button>
                    </div>
                  </div>
                </div>
                <div className='m-login__border' style={{'paddingTop': '0px'}}><div /></div>
              </div>
            </div>
            <div className='m-login__wrapper-2 m-portlet-full-height'>
              <div className='m-login__contanier'>
                <div className='m-login__signin animated flipInX'>
                  <Login {...props} />
                </div>
                <div className='m-login__signup animated flipInX'>
                  <SignUp {...props} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <FooterComponent /> */}
      </div>
    )
}
Landing.propTypes = {
  flipInX: PropTypes.any,
  toggleFlipInX: PropTypes.func
}
