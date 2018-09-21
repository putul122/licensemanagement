import React from 'react'
import PropTypes from 'prop-types'
import styles from './loginComponent.scss'

export default function Login (props) {
  // let FullNameBox
  let apiCalling = props.loginProcess
  let loggedInMessageResponse = function (message) {
    if (message) {
      return (<div className='m-alert m-alert--outline alert alert-danger alert-dismissible animated fadeIn' role='alert'>
        {/* <button type='button' className='close' data-dismiss='alert' aria-label='Close' /> */}
        <span>{message}</span>
      </div>
      )
    } else {
      return (<div />)
    }
  }
  let EmailBox
  let PasswordBox
  let loggedInresponse = props.loggedInresponse
  let messageBlock = loggedInMessageResponse('')
  // let disabledButton = ''
  let loadingClass = ''
  let handleSubmit = function (event) {
    messageBlock = loggedInMessageResponse('')
    console.log('bbbbbb', EmailBox.value)
    let payload = {
      'email': EmailBox.value,
      'password': PasswordBox.value,
      'client_id': props.client_id,
      'client_secret': props.client_secret
    }
    props.setLoginProcessStatus(true)
    props.loginUser(payload)
  }
  // let closeMessage = function () {
  //   messageBlock = ''
  //   console.log('close message block')
  // }
  if (apiCalling) {
    loadingClass = 'm-loader m-loader--right m-loader--light ' + styles.disabled
  } else {
    loadingClass = ''
  }

  if (loggedInresponse !== '') {
    if (loggedInresponse.error_code) {
      messageBlock = loggedInMessageResponse(loggedInresponse.error_message)
    } else {
      messageBlock = loggedInMessageResponse('')
    }
    // loggedInresponse = ''
    // props.setApiCallingStatus(false)
  }
  return (
    <div className='m-login__wrapper-2 m-portlet-full-height'>
      <div className='m-login__contanier'>
        <div className='m-login__head'>
          {/* <h3 className='m-login__title'>Login To Your Account</h3> */}
          <h2 className='m-login__title'>Login</h2>
        </div>
        <div className='m-login__form m-form'>
          {/* <div className='form-group'>
            <input type='text' ref={input => (FullNameBox = input)} className='form-control m-input' placeholder='Full name' />
          </div> */}
          {messageBlock}
          <div className='form-group m-form__group'>
            <input className='form-control' type='text' ref={input => (EmailBox = input)} placeholder='Email' />
          </div>
          <div className='form-group m-form__group'>
            <input className='form-control m-login__form-input--last' type='Password' ref={input => (PasswordBox = input)} placeholder='Password' />
          </div>
          <div className='row m-login__form-sub'>
            <div className='col m--align-left'>
              {/* <label className='m-checkbox m-checkbox--focus'>
                    <input type='checkbox' name='remember' /> Remember me
                    <span />
              </label> */}
            </div>
            {/* <div className='col m--align-right'>
              <a href='' id='m_login_forget_password' className='m-link'>Forgot Password ?</a>
            </div> */}
          </div>
          <div className='m-login__form-action'>
            <button onClick={handleSubmit} className={styles.buttonbg + ' ' + loadingClass} >Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  // isLoggedin: PropTypes.any,
  loginProcess: PropTypes.any,
  loginUser: PropTypes.func,
  client_id: PropTypes.any,
  client_secret: PropTypes.any,
  loggedInresponse: PropTypes.any,
  setLoginProcessStatus: PropTypes.func
}
