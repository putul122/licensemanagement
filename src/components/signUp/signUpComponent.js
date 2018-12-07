import React from 'react'
import PropTypes from 'prop-types'
import styles from './signUpComponent.scss'

export default function SignUp (props) {
  console.log(props.client_secret)
  console.log(props.client_id)
  let apiCalling = props.createUserProcess
  let FullNameBox
  let EmailBox
  let PasswordBox
  let messageBlock = ''
  let loadingClass = ''
  let createUserResponse = props.createUserResponse
  let loggedInMessageResponse = function (message) {
    return (<div className='m-alert m-alert--outline alert alert-danger alert-dismissible animated fadeIn' role='alert'>
      {/* <button type='button' className='close' data-dismiss='alert' aria-label='Close' /> */}
      <span>{message}</span>
    </div>
    )
  }
  let handleInput = function (event) {
    event.preventDefault()
    if (typeof (EmailBox) !== 'undefined' && typeof (PasswordBox) !== 'undefined') {
      let name = FullNameBox.value
      let nameArray = name.split(' ', 2)
      // name.split(' ', 2)[0] + Math.random()
      // To set unique user id in your system when it is available
      // window.fcWidget.setExternalId(EmailBox.value)
      // // To set user name
      // // window.fcWidget.user.setFirstName(name)
      // // To set user email
      // window.fcWidget.user.setEmail(EmailBox.value)
      // // To set user properties
      // window.fcWidget.user.setProperties({
      //   plan: 'Estate',                 // meta property 1
      //   status: 'Active'                // meta property 2
      // })
      let payload = {
        'first_name': nameArray[0],
        'last_name': nameArray[1],
        'subscription': null,
        'email': EmailBox.value,
        'password': PasswordBox.value,
        'refresh_token': 'string',
        'client_id': props.client_id,
        'client_secret': props.client_secret
      }
      props.setCreateUserProcessStatus(true)
      props.createUser(payload)
    }
  }

  if (apiCalling) {
    loadingClass = 'm-loader m-loader--right m-loader--light ' + styles.disabled
  } else {
    loadingClass = ''
  }

  if (createUserResponse !== '') {
    if (createUserResponse.error_code) {
      messageBlock = loggedInMessageResponse(createUserResponse.error_message)
    } else {
      messageBlock = ''
    }
  }

  let handelClick = function (event) {
    props.toggleFlipInX('m-login--signin')
  }
    return (
      <div className=''>
        <div className=''>
          <div className=''>
            <div className=''>
              <div className='m-login__head'>
                <h3 className='m-login__title'>Sign Up</h3>
                <div className='m-login__desc'>Enter your details to create your account:</div>
              </div>
              <div className='m-login__form m-form'>
                {messageBlock}
                <div className='form-group m-form__group'>
                  <input className={'form-control'} type='text' ref={input => (FullNameBox = input)} placeholder='Fullname' name='fullname' />
                </div>
                <div className='form-group m-form__group'>
                  <input className={'form-control'} type='text' ref={input => (EmailBox = input)} placeholder='Email' name='email' autoComplete='off' />
                </div>
                <div className='form-group m-form__group'>
                  <input className={'form-control'} type='password' ref={input => (PasswordBox = input)} placeholder='Password' name='password' />
                </div>
                <div className='m-login__form-action'>
                  <button type='button' onClick={handleInput} id='m_login_signup' className={styles.buttonbg + ' ' + loadingClass}>Register</button>&nbsp;&nbsp;
                  <button id='m_login_signup_cancel' onClick={handelClick} className='btn btn-outline-info m-btn m-btn--pill lg-btn--custom'>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  SignUp.propTypes = {
    toggleFlipInX: PropTypes.func,
    client_id: PropTypes.any,
    client_secret: PropTypes.any,
    // createUser: PropTypes.func,
    createUserResponse: PropTypes.any,
    createUserProcess: PropTypes.any
    // setCreateUserProcessStatus: PropTypes.func
  }
